'use client'
import React, { Component } from "react";
import { getAuthorizationCode, getAccessToken as getServiceAccessToken, getRefreshToken } from '@/utils/server';
import config from '@/config.json';
import "core-js/features/url-search-params";
// @ts-ignore  
import { decode } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

interface LoginProps {
    dispatch: React.Dispatch<any>;
}

interface LoginState {
    idToken: string;
    accessToken: string;
    expiresIn: number;
    tokenType: string;
    email: string;
    returnUrl: string;
    code: string;
  }
  
  class Login extends Component<LoginProps, LoginState> {
    errorState: { error: string };

    constructor(props) {
        console.log('Login');
        super(props);
        this.state = {
            code: '',
            idToken: '',
            accessToken: '',
            expiresIn: 0,
            tokenType: '',
            email: '',
            returnUrl:'/',
        }
        this.errorState = {
            error: ''
        }
    }

    setError = (error) => {
        console.log(error);
        this.errorState.error = error;
    }

    handleLogin = async () => {
        if (sessionStorage.getItem("renewal") === "inprogress"){
            return;
        }
        sessionStorage.removeItem('userinfo');
        sessionStorage.removeItem('token');
        sessionStorage.setItem('returnUrl', window.location.href);
        sessionStorage.setItem('sessionId', uuid());
        
        try {
          getAuthorizationCode(
            config?.authorizationEndpoint,
            config?.redirectUri,
            config?.clientId,
          );
        } catch (e) {
          console.error(e);
          sessionStorage.setItem('IsUserLoggedIn', 'false');
        }
    }

    checkLoggedinUser = (skip: boolean) => {
        const IsUserLoggedIn = sessionStorage.getItem("IsUserLoggedIn");
        // let mode = this.props.appConfig?.enableAuth ?? true;
        // if (mode==false){
        //     return true;
        // }
        // if (IsUserLoggedIn === 'inprogress'){
        //     return true;
        // }
        var retvalue = false;
        const loggedInUser = sessionStorage.getItem("userinfo");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            if (foundUser) {
                if (this.validateToken(foundUser)) {
                    if (skip === undefined) {
                        this.setUserLoggedIn();
                    }
                    return true;
                }
            }
        }
        else {
            if (window.location.search === "" || (!window.location.search.includes("code"))) {
                this.handleLogin();
            }
        }
        return retvalue;
    }

    validateToken = (foundUser) => {
        const storedToken = JSON.parse(sessionStorage.getItem("token")!);
        if (storedToken) {
            if (storedToken.error === undefined) {
                var currentDate = new Date().getTime();
                var timediff = (currentDate / 1000) - parseInt(foundUser.iat);
                var token_timeout = ((parseInt(foundUser.exp) - parseInt(foundUser.iat)) - 300);
                // console.log('validateToken time difference - '+ timediff.toString());
                // console.log('validateToken token timeout - '+ token_timeout.toString());
                if (timediff <= token_timeout) {
                    sessionStorage.setItem("ROCP_idToken", storedToken.id_token);
                    this.getUserInfo(storedToken, false);
                    return true;
                }
                else if ((timediff > (token_timeout + 1) )) {
                    console.log('renewing access token');
                    this.renewAccessToken(storedToken, foundUser);
                    return true;
                }
            }
        }
        this.handleLogin();
        return true;
    }

    getAccessToken = async (code?: string|null, reload = true) => {
        sessionStorage.removeItem('token');
        getServiceAccessToken(code).then((token) => {
          if (token !== null) {
            if (token['error'] === undefined) {
              if (token['id_token']) {
                this.setSessionToken(JSON.stringify(token));
                this.getUserInfo(token, reload);
                this.props.dispatch({
                  field: 'isUserLoggedIn',
                  value: true,
                });
              }
            } else {
              sessionStorage.removeItem('token');
            }
          } else {
            console.error('code is empty');
          }
        },(error) => {
            console.error('error from token end point', error)
            this.setError(error);
            sessionStorage.setItem("IsUserLoggedIn", "false");
        });
    }
 
    setSessionToken = (token_str: string) =>{
        if (token_str !== ''){
            sessionStorage.setItem('token', token_str);
            let token_obj = JSON.parse(token_str !== null?token_str:'');    
            sessionStorage.setItem("ROCP_idToken", token_obj.id_token);
        }
    };

    renewAccessToken = (token, user) => {
        if (token !== undefined) {
          sessionStorage.setItem("IsUserLoggedIn", "inprogress");
          getRefreshToken(token.refresh_token).then((renewalToken) => {
            if (renewalToken) {
              this.setSessionToken(JSON.stringify(renewalToken));
              this.getUserInfo(renewalToken);
            }
          }, (error) => {
            this.setError(error);
            // trigger the whole authentication flow if unable to refresh token
            this.handleLogin();
          });
      }
    };
    
    setLoginAlert = () => {
        alert("It looks like your session has expired. Click OK to refresh the application.");
        sessionStorage.clear();
    }
    
    setUserLoggedIn = () => {
        sessionStorage.setItem("IsUserLoggedIn", "true");
    }

    getUserInfo = async (token: any, reload = true ) => {
        if (token){
            var idToken = token.id_token;
            if (idToken !== null &&  idToken !== undefined){
                try {
                    var tokenobj = decode(idToken);
                    sessionStorage.setItem('userinfo', JSON.stringify(tokenobj));
                    sessionStorage.setItem("user", tokenobj.email.replace("@nvidia.com", ""));
                    sessionStorage.setItem("email", tokenobj.email);
                    sessionStorage.setItem("name", tokenobj.name);                 
                    sessionStorage.setItem("sub", tokenobj.sub);            
                    sessionStorage.setItem("idp_name", tokenobj.idp_name);       
                    sessionStorage.setItem("email_verified", tokenobj.email_verified); 
                    sessionStorage.setItem("idp_id", tokenobj.idp_id);
                    sessionStorage.setItem("issuer", tokenobj.iss);       
                    sessionStorage.setItem("external_id", tokenobj.external_id);    
                    sessionStorage.setItem("preferred_username", tokenobj.preferred_username);
                    sessionStorage.setItem("updated_at", tokenobj.updated_at);
                    sessionStorage.setItem("expire_at", tokenobj.exp);          
                    sessionStorage.setItem("issued_at", tokenobj.iat);
                    localStorage.setItem("name", tokenobj.name);
                    sessionStorage.removeItem("renewal");
                    this.setUserLoggedIn();

                    const { returnUrl } = this.state;
                    if (reload && returnUrl){
                        // console.log('login reload after success',  {url: this.state.returnUrl})
                        window.location.assign(returnUrl);
                        // window.location.reload()
                    }
                    else{
                        window.parent.postMessage("success");
                    }

                }
                catch(error){
                    console.error('parsing token using jwt', error)
                }
                                                  
            }
        }
    }    

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.href.split(/(\?|#)/)[2]);
        const isiuserLoggedIn =  this.checkLoggedinUser(false)
        if (!isiuserLoggedIn) {
            if (window.location.pathname !== '/auth'){
                if (window.location.search !== '') {
                    var searchParams = new URLSearchParams(window.location.search);
                    var code = searchParams.get('code');
                    this.setState({
                        code: searchParams.get('code') || '',
                        // returnUrl: sessionStorage.getItem(searchParams.get('state'))
                        returnUrl: searchParams.get('state') || ''
                    });
                    this.getAccessToken(code);
                }
            }
        } else{
            if (sessionStorage.getItem("renewal") !== "inprogress"){
                if (urlParams.has("state") && urlParams.get("state") === "renewal" ) {
                    sessionStorage.setItem("renewal", "inprogress");
                    this.getAccessToken(urlParams.get("code"), false);
                }
            }
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export const validateToken = () => {
    const tokenJson = sessionStorage.getItem("token") || "{}";
    const storedToken = JSON.parse(tokenJson);
    const loggedInUser = sessionStorage.getItem("userinfo");
    const foundUser = loggedInUser && JSON.parse(loggedInUser);
    if (storedToken && foundUser) {
        if (storedToken.error === undefined) {
            var currentDate = new Date().getTime();
            var timediff = (currentDate / 1000) - parseInt(foundUser.iat);
            var token_timeout = ((parseInt(foundUser.exp) - parseInt(foundUser.iat)) - 300);
            if (timediff <= token_timeout) {
                // console.log('token valid')
                return true;
            }
            else if ((timediff > (token_timeout + 1) )) {
                console.log('token expired')
                return false;
            }
        }
    }
}

export default Login;
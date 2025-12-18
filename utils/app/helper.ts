import { Constants } from '@/utils/app/const';

export const getInitials = (fullName = '') => {
    if(!fullName){
        return "";
    }
    const initials = fullName.split(' ').map(name => name[0]).join('').toUpperCase();
    return initials;
}


// source_system is defined in Feedback db repo as a row entity
// selections: slack, teams, web, scout, avc, nautobot
export const getSourceSystem = (botName = ''): string => {
    if(!botName){
        return 'web';
    }

    switch (botName){
        case Constants.PlatformAgentSelection.AVC:{
            return "avc"
        }
        case Constants.PlatformAgentSelection.NAUTOBOT:{
            return "nautobot"
        }
        case Constants.PlatformAgentSelection.SCOUT:{
            return "scout"
        }
        // catch all
        default :{
            return 'web'
        }
    }
}

export const getIdTokenFromSession = () => {
    return sessionStorage.getItem('ROCP_idToken') && sessionStorage.getItem('ROCP_idToken')?.replace(/['"]+/g, '')
}

type IdTokenParsed = {
    email?: string;
    name?: string;
    sub?: string;
    idp_name?: string;
    email_verified?: string;
    idp_id?: string;
    iss?: string; // issuer
    external_id?: string;
    preferred_username?: string;
    updated_at?: string;
    exp?: string; // expiration
    iat?: string; // issued at
  };

  
export const setUserInfoToSession = (idTokenData: IdTokenParsed | undefined) => {
    if(idTokenData?.email) {
        sessionStorage.setItem('userinfo', JSON.stringify(idTokenData));
        sessionStorage.setItem("user", idTokenData?.email?.replace("@nvidia.com", ""));
        sessionStorage.setItem("email", idTokenData?.email);
        sessionStorage.setItem("name", idTokenData?.name || "");                 
        sessionStorage.setItem("sub", idTokenData?.sub || "");            
        sessionStorage.setItem("idp_name", idTokenData?.idp_name || "");       
        sessionStorage.setItem("email_verified", idTokenData?.email_verified || ""); 
        sessionStorage.setItem("idp_id", idTokenData?.idp_id || "");
        sessionStorage.setItem("issuer", idTokenData?.iss || "");       
        sessionStorage.setItem("external_id", idTokenData?.external_id || "");    
        sessionStorage.setItem("preferred_username", idTokenData?.preferred_username || "");
        sessionStorage.setItem("updated_at", idTokenData?.updated_at|| "");
        sessionStorage.setItem("expire_at", idTokenData?.exp || "");          
        sessionStorage.setItem("issued_at", idTokenData?.iat || "");
        localStorage.setItem("name", idTokenData?.name || "");
        sessionStorage.setItem("IsUserLoggedIn", "true");
    }   
}
// todo enable config based on bot, should be cleaned up later, same needs to be done in utils/server/index.ts
import { ChatBody } from '@/types/chat';
import config from '../../config.json';
import { Constants } from '@/utils/app/const';
import { decode } from 'jsonwebtoken';
import { Extension } from 'typescript';

const createChatCompletionRequest = ({
  model,
  prompt,
  sessionId,
  queryId,
  userName,
  system,
  attachment = ''
}: ChatBody) => {
  const payload =  {
    sessionId,
    userName,
    UserId: userName,
    Query: prompt,
    QueryId: queryId,
    SessionId: sessionId,
    System: system,
    Model: model,
    ...(attachment ? { Attachments: [{
      Name: attachment?.name,
      Extension: attachment?.extension,
      Type: attachment?.type,
      Content: attachment?.content.replace(/^data:image\/[a-z]+;base64,/, '')
    }] } : {}),
    Parameters: {
      NvidiaID: userName,
      Source: system,
      SourceType: 'private',
      Tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      TzLabel: 'Pacific Daylight Time',
      TzOffset: -25200,
      IsStream: true,
    },
  };

  return payload
};


export const chatCompletionRequest = async (request: ChatBody) => {
  let headers = new Headers();
  const { authToken, system } = request;
  headers.append('Authorization', `Bearer ${authToken ? authToken : ''}`);
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify(createChatCompletionRequest(request));
  const chatEndpoint = Constants?.API_END_POINTS?.WEBCLIENT_URL
  const url = config?.BASE_URL + chatEndpoint

  const res = await fetchPlus(url , {
    method: 'POST',
    headers,
    body,
    redirect: 'follow',
  })

  try {

    if (res.status !== 200) {
      const response = await res.json();
      if(res.status === 401) {
        throw new Error(Constants.UNAUTHORIZED_ERROR_MESSAGE);
      }
      if(res.status === 403) {
        throw new Error(`${Constants.FORBIDDEN_ERROR_MESSAGE} : ${(response?.error || response?.detail)}`);
      }
      throw new Error(response?.error || response?.detail);
    }
  
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
  
    const responseStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of res.body as any) {
            let text = decoder.decode(chunk);
            try {
              const parsedData = JSON.parse(text);
              if (parsedData.response) {
                controller.enqueue(encoder.encode(parsedData.response));
              }
            } catch (e) {
              controller.enqueue(encoder.encode(text.replaceAll('\n\n', '\n')));
            }
          }
          controller.close();
        } catch (e) {
          console.log('Error parsing response', e);
          let text = await new Response(res?.body).text();
          controller.enqueue(`Eror parsing response - ${text}`);
          controller.error(e);
          controller.close();
        }
      },
    });
    return responseStream;

  }

  catch (error) {
    throw new Error(error?.message || Constants?.ERROR_MESSAGE);
  }
  
};

export const irqaRequest = async ({
  system,
  authToken,
  queryId,
  userName
}: {
  system: string,
  authToken: string | undefined | null,
  queryId: string,
  userName: string,
}) => {
  let headers = new Headers();
  headers.append('Authorization', `Bearer ${authToken ? authToken : ''}`);
  headers.append('Content-Type', 'application/json');
  const irqaEndpoint = Constants?.API_END_POINTS?.IRQA_URL
  let url = config?.BASE_URL + irqaEndpoint
  url = `${url}?query_id=${queryId}&username=${userName}&system=${system}&reason=`;
  return await fetchPlus(url, {
    method: 'GET',
    headers
  });
};

export const botConfigRequest = async ({
  botName = 'nvbot',
  authToken = ''
} : {
  botName: string,
  authToken?: string | undefined | null,
}) => {

  let headers = new Headers();
  headers.append('Authorization', `Bearer ${authToken ? authToken : ''}`);
  headers.append('Content-Type', 'application/json');
  const url = config?.BASE_URL + Constants?.API_END_POINTS?.BOT_CONFIG
  return await fetchPlus(url + `?system=${botName}`, { 
    method: "GET",  
    headers: { 
      'Authorization': `Bearer ${authToken ? authToken : ''}`
    }, 
  })
};


const createFeedbackRequest = ({
  userName,
  sourceSystem,
  feedback,
  feedbackText,
  feedbackDetails,
  cacheID,
}: {
  feedback: string;
  feedbackText: string;
  feedbackDetails: [];
  sourceSystem: string;
  userName: string;
  cacheID: string;
}) => {
  return {
    SourceSystem: sourceSystem,
    Username: userName,
    Feedback: feedback,
    FeedbackText: feedbackText,
    FeedbackDetails: feedbackDetails,
    CacheID: cacheID,
  };
};

export const chatFeebackRequest = async ({
  feedback,
  feedbackText,
  feedbackDetails,
  authToken,
  sourceSystem,
  userName,
  cacheID,
}: {
  feedback: string;
  feedbackText: string;
  feedbackDetails: [];
  authToken: string;
  sourceSystem: string;
  userName: string;
  cacheID: string;
}) => {
  let headers = new Headers();
  headers.append('Authorization', `Bearer ${authToken ? authToken : ''}`);
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify(
    createFeedbackRequest({
      userName,
      sourceSystem,
      feedback,
      feedbackText,
      feedbackDetails,
      cacheID,
    }),
  );
  return await fetchPlus(config?.BASE_URL + Constants?.API_END_POINTS?.FEEDBACK_URL, {
    method: 'POST',
    headers,
    body,
    redirect: 'follow',
  });

};

export const saveConversation = async ({SourceSystem, RivaResponse, authToken, userName}: {
  SourceSystem: string; 
  RivaResponse: any, 
  authToken: string;
  userName: string
}) => {
  let headers = new Headers();
  headers.append('Authorization', `Bearer ${authToken ? authToken : ''}`);
  headers.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    SourceSystem, 
    RivaResponse
  });
  const saveConverationEndPoint = Constants?.API_END_POINTS?.SAVE_CONVERSATION
  const url = config?.BASE_URL + saveConverationEndPoint
  return await fetchPlus(url , {
    method: 'POST',
    headers,
    body,
    redirect: 'follow',
  });

  
};

const b64url = (array: Uint8Array): string => {
  const b64 = btoa(String.fromCharCode.apply(null, Array.from(array)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const getAccessToken = async (code?: string|null): Promise<any|null> => {
  sessionStorage.removeItem('token');
  const redirectUri = config?.redirectUri;
  if (code !== undefined || code !== null) {
    sessionStorage.setItem('IsUserLoggedIn', 'inprogress');
    const code_verifier = sessionStorage.getItem('CV');
    const param = new URLSearchParams({
      "code": code!,
      "grant_type": 'authorization_code',
      "code_verifier": code_verifier!,
      "redirect_uri": redirectUri,
    });

    const headerstr = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    
    return fetch(config?.tokenEndpoint, {
      headers: headerstr,
      method: 'POST',
      body: param.toString(),
    }).then(
      (res) => res.json(),
      (error) => {
        console.error('error from token end point', error);
        sessionStorage.setItem('IsUserLoggedIn', 'false');
      },
    );
  }
  return null;
};

export const getRefreshToken = async (refresh_token: string): Promise<string | null> => {
  const query = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
  });
  return fetch(config?.tokenEndpoint, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: query.toString(),
  }).then((res) => {
    return res.json()
  });
};

export const setSessionToken = (token_str: string) =>{
  if (token_str !== ''){
      sessionStorage.setItem('token', token_str);
      let token_obj = JSON.parse(token_str !== null?token_str:'');    
      sessionStorage.setItem("ROCP_idToken", token_obj.id_token);
  }
};

export const getUserInfo = async (token: any, reload = true ) => {
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
              sessionStorage.setItem("IsUserLoggedIn", "true");
          }
          catch(error){
              console.error('parsing token using jwt', error)
          }
                                            
      }
  }
}  

export const renewAccessToken = async (token) => {
  if (token !== undefined) {
    sessionStorage.setItem("IsUserLoggedIn", "inprogress");
    try {
      const renewalToken = await getRefreshToken(token.refresh_token);
      if (renewalToken) {
        setSessionToken(JSON.stringify(renewalToken));
        getUserInfo(renewalToken, false);
        return true; // Successfully renewed the token
      } else {
        // This block is hit if getRefreshToken somehow resolves to a falsy value without throwing
        console.log('No renewal token received');
        return false; // Token renewal failed
      }
    } catch (error) {
      // Error handling
      console.log('error fetching new access token', error);
      return false; // Error case
    }
  } else {
    console.log('Token is undefined');
    return false; // Token was undefined to begin with
  }
}

export const generateCodeChallenge = async (): Promise<string> => {
    // Generate a 32-octet random sequence
    const rand = window.crypto.getRandomValues(new Uint8Array(32));

    // The PKCE code verifier is the base64url encoding of the random octets
    const codeVerifier = b64url(rand);
    sessionStorage.setItem("CV", codeVerifier);

    // Calculate the SHA-256 hash of the code verifier
    const data = new TextEncoder().encode(codeVerifier);
    const sha256 = await window.crypto.subtle.digest("SHA-256", data);
    // The PKCE code challenge is the base64url encoding of the hash
    return b64url(new Uint8Array(sha256));
};

export const validateToken = () => {
  const storedToken = JSON.parse(sessionStorage.getItem('token')!);
  const loggedInUser = sessionStorage.getItem('userinfo');
  const foundUser = loggedInUser && JSON.parse(loggedInUser);
  if (storedToken && foundUser) {
    if (storedToken.error === undefined) {
      var currentDate = new Date().getTime();
      var timediff = currentDate / 1000 - parseInt(foundUser.iat);
      var token_timeout =
        parseInt(foundUser.exp) - parseInt(foundUser.iat) - 300;
      if (timediff <= token_timeout) {
        return true;
      } else if (timediff > token_timeout + 1) {
        console.log('token expired');
        return false;
      }
    }
  }
};

export const getAuthorizationCode = async (authUrl: string, redirectUri?: string, clientId?: string) => {
  const code_challenge = await generateCodeChallenge();
  const qParams = new URLSearchParams({
    redirect_uri: redirectUri ?? "",
    scope: 'openid profile email',
    client_id: clientId ?? "",
    response_type: 'code',
    nonce: 'test',
    // state: 'returnUrl',
    state: window.location.href,
    code_challenge: code_challenge,
    code_challenge_method: 'S256',
  });
  const url = `${authUrl}?${qParams}`;
  console.log('login redirecting to auth', {from: window.location.href, to: url, state: window.location.origin})
  window.location.assign(url);
};


const delay = (t: any) => {
  return new Promise(resolve => setTimeout(resolve, t));
}


export const fetchPlus = (url: string, options: any, retries: number = Constants.MAX_RETRIES, fullResponse:boolean = false): Promise<any> => {
  return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res
        }
        else if (retries >= 0) {
          if(res.status === 403 || res.status === 320 || res.status === 401){
              return res;
          }
          let delay_time = 2000;
          return delay(delay_time).then(function() {
              return fetchPlus(url, options, retries - 1, fullResponse);
          });
        }
        else{
          return new Promise((resolve, reject) => {
              resolve({
                  "error": "retries failed",
                  "url": url
              });
          });
        }
      })
      .catch(error => {
          console.error(error.message);
          if (retries > 0) {
              return delay(2000).then(function() {
                  return fetchPlus(url, options, retries - 1);
              });
          }
          return new Promise((resolve, reject) => {
              resolve({
                  "error": error.message,
                  "url": url
              });
        });
      })
}
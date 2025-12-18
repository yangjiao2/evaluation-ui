import NextAuth from "next-auth";
import axios from "axios";
import config from '../../../config.json';


const options = {
    providers: [{
        id: "nvlogin",
        name: "nvlogin",
        type: "oauth",
        version: "2.0",
        wellKnown: config.wellKnown,
        authorization: {
            params: {
                scope: "openid email profile",
                response_type: "code",
                // code_challenge: codeChallenge,
                // code_challenge_method: 'S256',
                redirect_uri: config?.redirectUri,
            }
        },
        token: {
            params: {
                grant_type: "authorization_code",
            }
        },
        idToken: true,
        httpOptions: {
            timeout: 30000,
        },
        profile: (profile, id_token) => {
            return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                id_token: id_token.id_token,
            }
        },
        client: {
            authorization_signed_response_alg: "ES256",
            id_token_signed_response_alg: "ES256",
            token_endpoint_auth_method: 'none'
        },
        clientId: config.clientId,
        checks: ['pkce', 'state', 'nonce'],
    }, ],
    debug: true,
    // callbackUrl: config.redirectUri,
    trustHost: true,
    callbacks: {
        async jwt({ token, account }) {
            console.log('callbacks, jwt expiry', token?.access_token_expiry)
            if (account) {
                token.id_token = account.id_token;
                token.access_token = account.access_token;
                token.access_token_expiry = Date.now() + 3600 * 1000;
                token.refresh_token = account.refresh_token;
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.access_token_expiry) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.access_token_expiry = token.access_token_expiry;
            session.idToken = token.id_token 
            session.error = token.error
            // console.log('getting session', {session})
            return session
        },
    },
};

export default (req, res) => {
    // setNextAuthUrl(req);
    // Logging the full URL (requires reconstructing from req object)
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const fullUrl = `${protocol}://${host}${req.url}`;
    console.log(`next auth - URL: ${fullUrl}`);
    
    // Logging query parameters directly from the req.query object
    // console.log('next auth - query params', JSON.stringify(req?.query));
    NextAuth(req, res, options);
};

async function refreshAccessToken(tokenObject) {
    try {
        // Get a new set of tokens with a refreshToken
        console.log('using refresh token to get new tokens')
        const params = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: tokenObject.refresh_token,
        });

        let api_url = config.tokenEndpoint;

        const response = await axios.post(api_url, params.toString(), {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });

        const data = await response.data;

        return {
            ...tokenObject,
            id_token: data?.id_token,
            access_token: data.access_token,
            access_token_expiry: Date.now() + 3600 * 1000,
            refresh_token: data.refresh_token,
        };

    } catch (error) {
        console.error('error - using refresh token to get new tokens', JSON.stringify(error))
        return {
            ...tokenObject,
            error: "RefreshAccessTokenError",
        }
    }
}

import { chatCompletionRequest } from '@/utils/server';
import { ChatBody, Message } from '@/types/chat';
import { Constants } from '@/utils/app/const';

export const config = {
  runtime: 'edge',
};
const handler = async (req: Request): Promise<Response> => {
  const { model, prompt, system = 'nvhelp', userName, queryId = '',  sessionId = '', attachment = null, dlCheck = false} = (await req.json()) as ChatBody;
  try {
    // Extract the Authorization header from the request
    const authHeader = req.headers.get('Authorization') || '';
    // Assuming the token is sent in the format "Bearer <TOKEN>", extract the token part
    const authToken = authHeader.split(' ')[1];

    const stream = await chatCompletionRequest({model, prompt, authToken, system, queryId, userName, sessionId, attachment, dlCheck});
    return new Response(stream);
  } catch (error) {
    console.error(error);
    if (error?.message === Constants.UNAUTHORIZED_ERROR_MESSAGE) {
      return new Response(Constants.ERROR_MESSAGE, { status: 401 });
    }
    if (error?.message.includes(Constants.FORBIDDEN_ERROR_MESSAGE)) {
      if(dlCheck) {
        return new Response(JSON.stringify({ error: error?.message?.replace(`${Constants.FORBIDDEN_ERROR_MESSAGE} :`, '') }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      else {
        return new Response(Constants.ERROR_MESSAGE, { status: 403 });
      }
      
    }
    return error?.message === 'network error' ? new Response(Constants.NETWORK_ERROR_MESSAGE) : new Response(Constants.ERROR_MESSAGE);
  }
};

export default handler;

import { chatFeebackRequest } from '@/utils/server';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { feedback, feedbackText, feedbackDetails, sourceSystem, userName, cacheID, } = await req.json();
    // Extract the Authorization header from the request
    const authHeader = req.headers.get('Authorization') || '';
    // Assuming the token is sent in the format "Bearer <TOKEN>", extract the token part
    const authToken = authHeader.split(' ')[1];

    return await chatFeebackRequest({feedback, feedbackText, feedbackDetails, authToken, sourceSystem, userName, cacheID});
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }

};

export default handler

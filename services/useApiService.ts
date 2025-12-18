import { useCallback, useEffect, useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getEndpoint } from '@/utils/app/api';
import { getIdTokenFromSession } from '@/utils/app/helper';


const useApiService = () => {
  const fetchService = useFetch();

  // const getModels = useCallback(
  //   (): Promise<[]>  => {
  //     return fetchService.get(`/api/models`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //   },
  //   [fetchService],
  // );

  // const getModelDetails = useCallback(
  //   (name: string) => {
  //     return fetchService.post(`/api/modeldetails`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: {name: name }, 
  //     });
  //   },
  //   [fetchService],
  // );

  const getBotConfig = useCallback(
    ({ botName, authToken }: { botName: string; authToken?: string }): Promise<{}> => {
      if (!authToken) {
        return Promise.reject(new Error("Auth token is required and not available."));
      }
      return fetchService.post(`/api/botconfig`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          botName,
          authToken
        }
      });
    },
    [fetchService],
  );

  return {
    getModels: [],
    getModelDetails: [],
    getBotConfig
  };
};

export const useFetchBotConfig = ({botName, dispatch, selectedModel}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBotConfig = async () => {
      try {
        const botConfigEndpoint = getEndpoint({ service: 'botconfig' });
        const botConfigBody = {
          botName
        };
        const authToken = sessionStorage.getItem('ROCP_idToken') ? `Bearer ${sessionStorage.getItem('ROCP_idToken')}` : ''
        if(!authToken) {
          dispatch({
            field: 'appConfig',
            value: {
              loading: true
            }
          });
          return 
        }
        const response = await fetch(`${window.location.origin}\\${botConfigEndpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          },
          body: JSON.stringify(botConfigBody),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bot config');
        }

        else {
          const config = await response.json();

          if (config.supportedModels.length === 1 && selectedModel !== config.supportedModels[0]?.id) {
            dispatch({
              field: 'selectedModel',
              value: config.supportedModels[0]?.id
            });
          }

          dispatch({
            field: 'appConfig',
            value: {
              ...config,
              loading: false
            }
          });
          setIsLoading(false);
        }
 
      } catch (error) {
        console.error('Error fetching bot config:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    getBotConfig();
  }, [botName, dispatch, selectedModel]);

  return { isLoading, error };
};

export const fetchBotConfig = async ({ botName, dispatch, selectedModel }) => {
  try {
    const botConfigEndpoint = getEndpoint({ service: 'botconfig' });
    const botConfigBody = {
      botName,
    };
    const authToken = sessionStorage.getItem('ROCP_idToken') ? `Bearer ${sessionStorage.getItem('ROCP_idToken')}` : '';
    if (!authToken) {
      dispatch({
        field: 'appConfig',
        value: {
          loading: true
        }
      });
      return { isLoading: true, error: null };
    }
    const response = await fetch(`${window.location.origin}\\${botConfigEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
      },
      body: JSON.stringify(botConfigBody),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bot config');
    }

    const config = await response.json();

    if (config.supportedModels.length === 1 && selectedModel !== config.supportedModels[0]?.id) {
      dispatch({
        field: 'selectedModel',
        value: config.supportedModels[0]?.id
      });
    }

    dispatch({
      field: 'appConfig',
      value: {
        ...config,
        loading: false
      }
    });

    return { isLoading: false, error: null };
  } catch (error) {
    console.error('Error fetching bot config:', error);
    return { isLoading: false, error: error.toString() };
  }
};



export default useApiService;


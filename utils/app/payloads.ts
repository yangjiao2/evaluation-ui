import { useEffect, useState } from 'react';


export interface EvaluationFormData {
  Project: string;
  RunType: string;
  System: string;
  Model?: string;
  UserId: string;
  Env: string;
  PlatformConfig: any; // You can further type this if you want
  Parameters?: { [key: string]: any };
  Customization?: any; // Optional, based on your code
}

export function useEvaluationPayloads(
  staticPayloads: Record<string, any>,
  get: (url: string, options?: any) => Promise<any>,
  configType: string = "APIBasedConfig"
) {
  const [payloads, setPayloads] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPayloads = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = 'https://devbot-api.nvidia.com/evaluation/evaluations_payloads';
        const response = await get(url, {
          headers: {
            accept: 'application/json',
          },
        });
        if (response && typeof response === 'object') {
          setPayloads(response[configType]);
        } else {
          setPayloads(staticPayloads); // fallback
        }
      } catch (err: any) {
        setPayloads(staticPayloads); // fallback
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayloads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("useEvaluationPayloads", payloads)

  return { payloads, loading, error };
} 
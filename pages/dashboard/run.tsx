// Run.tsx
import {useRouter} from 'next/router';
import React, {useEffect, useMemo, useState} from 'react';
import config from "@/config.json";
import {useFetchWithParams} from '@/hooks/helper/useFetchWithParams';
import ExcelDataViewer from '@/components/Plugins/ExcelDataViewer'; // Import the new component
import {Badge} from "@/components/Tremor/Badge";
import {Button} from "@/components/Tremor/Button";
import Tag from '@/components/Tag';
import {formatMetrics} from '../api/metrics';
import { Tooltip } from '@/components/Tremor/Tooltip';

const Run = () => {
  const router = useRouter();
  const {id} = router.query;
  const [metadata, setMetadata] = useState<Object>({});

  const [status, setStatus] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const fetchHistoryDetailParams = useMemo(() => ({
    url: config.SERVICE_URL + '/evaluation_history_details',
    queryParams: {
      history_id: String(id),
    },
    headers: {
      accept: 'application/json',
    },
  }), [id]);

  

  const {
    data: historyDetailsData,
    error: historyDetailError,
    loading: historyDetailLoading
  } = useFetchWithParams(fetchHistoryDetailParams);

  const historyDetail = historyDetailsData ? historyDetailsData[0] : null;

  useEffect(() => {
    if (historyDetail) {
      const metadata = JSON.parse(historyDetail["metadata_value"]);
      setStatus(metadata.status.toUpperCase());
      setFileUrl(metadata.output_file);
    }
  }, [historyDetail]);

  useEffect(() => {
    const raw = sessionStorage.getItem(`id=${id}`);
    if (raw) setMetadata(JSON.parse(raw));
    console.log("raw", raw)
  }, []);

  const copyMetricsToClipboard = async () => {
    if (historyDetail && historyDetail["metrics"]) {
      try {
        const formattedMetrics = formatMetrics(historyDetail["metrics"]);
        await navigator.clipboard.writeText(formattedMetrics);
        alert('✅ Metrics copied to clipboard! \n' + formattedMetrics);
      } catch (error) {
        console.error('Failed to copy metrics:', error);
        alert('Failed to copy metrics to clipboard');
      }
    }
  };


  return (
    <div
      className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            <div className="flex items-center space-x-4">
              {id && <p className="m-0">ID: {id}</p>}
              {status && (
                 <Tooltip side="top" showArrow={false} content={status == "ERROR" ? "Encountered parsing error (minor), please check evaluation details" : (status == "FAILED" ? "Please contact Jessica Jiao" : "")}>
                   
                <Badge
                  variant={
                    status === "SUCCEEDED"
                      ? "success"
                      : status === "FAILED"
                        ? "error"
                        : "neutral"
                  }
                >
                  {status}
                </Badge>
                </Tooltip>
              )}
              {metadata && [(metadata as any).tag1, (metadata as any).tag2].map((tag, index) => (
               <Tag key={index} text={tag} />
              ))}
            </div>
          </h2>
          <div className="flex items-center space-x-2">
            {historyDetail && historyDetail["metrics"] && (
              <Button variant="secondary"
                      onClick={copyMetricsToClipboard}
              >
                Copy Metric
              </Button>
            )}
            {fileUrl && (
              <Button variant="secondary"
                      onClick={() => window.open(fileUrl)} // Add download handler
              >
                Download
              </Button>
            )}
          </div>
        </div>

      </header>
      <ExcelDataViewer fileUrl={fileUrl} status={status}/>

    </div>
  );
};

export default Run;

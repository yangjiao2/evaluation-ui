// Analytics.tsx
import {useRouter} from 'next/router';
import React, {useEffect, useMemo, useState} from 'react';
import config from "@/config.json";
import {useFetchWithParams} from '@/hooks/helper/useFetchWithParams';
import ExcelDataViewer from '@/components/Plugins/ExcelDataViewer'; // Import the new component
import {Badge} from "@/components/Tremor/Badge";
import {Button} from "@/components/Tremor/Button";
import {TableRoot, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell} from "@/components/Tremor/Table";
import {Input} from '@/components/Tremor/Input';
import { Label } from '@/components/Tremor/Label';
import {KeyValuePair} from "@/types/data";
import AutocompleteInput, { OptionType } from '@/components/Plugins/AutocompleteInput';
import Loading from '@/components/Plugins/Loading';
import { EvaluationHistoryTable } from '@/components/Table/EvaluationHistoryTable';
import { customSelectStyles } from '@/components/Plugins/autoCompleteStyles';
import Select, {components, OptionProps} from 'react-select';
import { Tooltip } from '@/components/Tremor/Tooltip';


const Analytics = () => {
  const router = useRouter();
  const {id} = router.query;

  const [evalId, setEvalId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Main fetch for base ID
  // const fetchHistoryDetailParams = useMemo(() => ({
  //   url: config.SERVICE_URL + '/evaluation_history_details',
  //   queryParams: {
  //     history_id: String(id),
  //   },
  //   headers: {
  //     accept: 'application/json',
  //   },
  // }), [id]);


  // Comparison fetches
  // const comparisonFetches = useMemo(() => 
  //   selectedRows.map(historyId => ({
  //     url: config.SERVICE_URL + '/evaluation_history_details',
  //     queryParams: {
  //       history_id: String(historyId),
  //     },
  //     headers: {
  //       accept: 'application/json',
  //     },
  //   })), [selectedRows]
  // );

  const [projectName, setProjectName] = useState<string | null>(null);
  const [historyDataFilters, setHistoryDataFilters] = useState<KeyValuePair[]>([]); // Array of objects with 'key' and 'value' as strings
  const [activePage, setPage] = useState(1);


  // Replace selectedRows entirely instead of appending to it
  // Clear selectedRows when there's no 'history_ids' filter
  // Avoid duplicates by setting the exact IDs from the filter instead of adding to existing ones
  
  useEffect(() => {
    // console.log("historyDataFilters", historyDataFilters, historyDataFilters.find(filter => filter.key === 'history_ids'))
    const historyIdsFilter = historyDataFilters.find(filter => filter.key === 'history_ids');
    if (historyIdsFilter) {
      const idsFromFilter = historyIdsFilter.value.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      setSelectedRows(idsFromFilter);
    } else {
      setSelectedRows([]);
    }
  }, [historyDataFilters])


  // Create a stable string representation of non-history_ids filters for comparison
  const nonHistoryIdFiltersKey = useMemo(() => {
    const filtered = historyDataFilters.filter(item => item.key !== 'history_ids');
    return JSON.stringify(filtered.map(item => ({ key: item.key, value: item.value })));
  }, [historyDataFilters]);
  
  const fetchHistoryParams = useMemo(() => {
    const params = {is_active: 'true', page: activePage ?? 1};
    
    // Parse the filters from the stable key to avoid dependency on historyDataFilters
    const parsedFilters = JSON.parse(nonHistoryIdFiltersKey || '[]');
    console.log("fetchHistoryParams", parsedFilters)
    
    parsedFilters.forEach((item: any) => {
      params[item.key] = item.value;
    });
    
    return {
      url: `${config.SERVICE_URL}/evaluations_history`,
      queryParams: params,
      headers: {
        accept: 'application/json',
      },
    };
  }, [nonHistoryIdFiltersKey, activePage]);

  const {data: historyData, error: historyError, loading: historyLoading} = useFetchWithParams(fetchHistoryParams);

  const historyFilterKeys: OptionType[] = [
    {value: 'project', label: 'Name'},
    {value: 'status', label: 'Status'},
    {value: 'run_type', label: 'RunType'},
    {value: 'history_ids', label: 'HistoryIDs'},
  ]
  
  const histories = historyData ? (historyData as { items: [], total: number, size: number, pages: number }).items : [];


  
  // const {
  //   data: historyDetailsData,
  //   error: historyDetailError,
  //   loading: historyDetailLoading
  // } = useFetchWithParams(fetchHistoryDetailParams);

  // const comparisonResults = comparisonFetches.map(params => 
  //   useFetchWithParams(params)
  // );


  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-b-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <Label htmlFor="Analytics">Filter by project, then select History IDs to compare <span className="text-sm text-gray-500"> (Example: `history_ids: id_1, id_2`)</span></Label>
            <Tooltip 
              side="bottom" 
              showArrow={true} 
              content={
                <div className="text-sm">
                  <div>1.  Use "Select key(s)" to filter project by project name. Click Enter to apply. </div>
                  <div>2.  Click the checkboxes (☑️) next to at least two rows to compare.</div>
                  <div className="mb-2 text-center">
                    <img 
                      src="/assets/analytics_help.png" 
                      alt="Help guide" 
                      className="inline-block w-126 h-26 mb-1"
                    />
                  </div>
                </div>
              }
            >
              <div className="flex items-center justify-center w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded-full cursor-help text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                ?
              </div>
            </Tooltip>

          </div>
          
            <div className="flex gap-2">
              <Tooltip side="left" showArrow={false} content={selectedRows.length > 1 ? "" : "Select > 1 row to compare"}>
                <Button variant={selectedRows.length > 1 ? "secondary": "light"}
                        onClick={() => {
                          // Navigate to comparison page with history IDs
                          const historyIds = selectedRows.join('&');
                          router.push(`/dashboard/analytics/compare=${historyIds}`);
                        }}
                        disabled={selectedRows.length <= 1}
                >
                  Compare
                </Button>
              </Tooltip>
          </div>
          </div>
          <div className="flex-grow flex justify-end">
            <AutocompleteInput
              predefinedOptions={historyFilterKeys}
              // keyValuePairs={[
              //   ...historyDataFilters.filter(filter => filter.key !== 'history_ids'),
              //   ...(selectedRows.length > 0 ? [{key: 'history_ids', value: selectedRows.join(',')}] : [])
              // ]}
              keyValuePairs={historyDataFilters}
              setKeyValuePairs={setHistoryDataFilters}
            />
          </div>
  
          
          <div className="flex items-center justify-between">
          </div>
        </div>
      </header>
      
      {historyLoading ? (
        <div className="flex h-full w-full">
          <Loading/>
        </div>
      ) : (
        <div className="flex">
          <EvaluationHistoryTable
            historyData={histories || []}
            isSelectable={true}
            selectedRows={selectedRows}
            setSelectedRows={(e) => {
              setSelectedRows(e); 
              // console.log("setSelectedRows", e); 
              setHistoryDataFilters(prev => {
                const filtered = prev.filter(filter => filter.key !== 'history_ids');
                if (e.length > 0) {
                  return [...filtered, {key: 'history_ids', value: e.join(",")}];
                }
                return filtered;
              });
            }}
            expandDrawer={null}
            showDetails={false}
            showMetrics={true}
          />
        </div>
      )}
    </div>
    
  );
};

export default Analytics;

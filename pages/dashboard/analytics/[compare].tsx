// Compare.tsx - Dedicated page for metric comparison
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import config from "@/config.json";
import {useFetchWithParams} from '@/hooks/helper/useFetchWithParams';
import {Badge} from "@/components/Tremor/Badge";
import {Button} from "@/components/Tremor/Button";
import {TableRoot, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell} from "@/components/Tremor/Table";
import {Label} from '@/components/Tremor/Label';
import {KeyValuePair} from "@/types/data";
import AutocompleteInput, { OptionType } from '@/components/Plugins/AutocompleteInput';
import Loading from '@/components/Plugins/Loading';
import { Tooltip } from '@/components/Tremor/Tooltip';
import { flattenMetrics, getMetricValue, calculateTrend } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from 'recharts';

// Import the CategoryChart component from analytics.tsx
interface CategoryChartProps {
  category: string;
  categoryMetrics: Set<string>;
  baseId: number;
  baseMetrics: any;
  comparisonDetails: {[key: string]: any};
}

const CategoryChart: React.FC<CategoryChartProps> = ({ 
  category, 
  categoryMetrics, 
  baseId, 
  baseMetrics, 
  comparisonDetails 
}) => {
  // Prepare data for category chart
  const categoryChartData: any[] = [];
  
  Array.from(categoryMetrics).forEach((metricKey) => {
    const fullKey = `${category}: ${metricKey}`;
    const baseFlattenedMetrics = flattenMetrics(baseMetrics);
    const baseValue = getMetricValue(baseFlattenedMetrics, fullKey);
    const baseNumValue = baseValue !== 'n/a' ? parseFloat(baseValue) : 0;
    
    // Create data point for this metric
    const metricData: any = {
      metric: metricKey.length > 15 ? metricKey.substring(0, 15) + '...' : metricKey,
      fullMetric: metricKey,
      [`Base:${baseId}`]: baseNumValue
    };
    
    // Add comparison values
    Object.entries(comparisonDetails)
      .filter(([histId]) => histId !== String(baseId))
      .forEach(([histId, details]) => {
        const flattenedMetrics = flattenMetrics(details.metrics);
        const compValue = getMetricValue(flattenedMetrics, fullKey);
        const compNumValue = compValue !== 'n/a' ? parseFloat(compValue) : 0;
        metricData[`ID:${histId}`] = compNumValue;
      });
    
    categoryChartData.push(metricData);
  });
  
  const allHistoryIds = Object.keys(comparisonDetails);
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={categoryChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <XAxis 
            dataKey="metric" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10 }}
            domain={[0, 'dataMax + dataMax*0.1']}
          />
          <RechartsTooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-gray-800 text-white p-3 rounded shadow">
                    <div className="font-medium mb-1">{data.fullMetric}</div>
                    {payload.map((entry, index) => (
                      <div key={index} className="text-xs">
                        <span style={{ color: entry.color }}>{entry.dataKey}: </span>
                        <span>{typeof entry.value === 'number' ? entry.value.toFixed(3) : entry.value}</span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          {allHistoryIds.map((histId, index) => {
            const isBase = histId === String(baseId);
            const dataKey = isBase ? `Base:${baseId}` : `ID:${histId}`;
            return (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                fill={colors[index % colors.length]}
                radius={[2, 2, 0, 0]}
                name={dataKey}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Compare = () => {
  const router = useRouter();
  const { compare } = router.query;

  const [historyIds, setHistoryIds] = useState<number[]>([]);
  const [comparisonDetails, setComparisonDetails] = useState<{[key: string]: any}>({});
  const [showCategoryCharts, setShowCategoryCharts] = useState<boolean>(true);
  const [historyDataFilters, setHistoryDataFilters] = useState<KeyValuePair[]>([]);

  // Extract history IDs from route parameter
  useEffect(() => {
    if (compare && typeof compare === 'string') {
      // Parse "compare=1;2;3" format
      const compareParam = compare.startsWith('compare=') ? compare.slice(8) : compare;
      const ids = compareParam.split('&').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      setHistoryIds(ids);
      
      // Set initial filter for history IDs
      if (ids.length > 0) {
        setHistoryDataFilters([{key: 'history_ids', value: ids.join(',')}]);
      }
    }
  }, [compare]);

  // Fetch history data with the extracted IDs - only when we have IDs
  const fetchHistoryParams = React.useMemo(() => {
    if (historyIds.length === 0) {
      return null; // Don't provide params when no IDs
    }
    
    return {
      url: `${config.SERVICE_URL}/evaluations_history`,
      queryParams: {
        is_active: 'true',
        history_ids: historyIds.join('&'),
        page_size: 10,
      },
      headers: {
        accept: 'application/json',
      },
    };
  }, [historyIds]);

  // Custom conditional fetch logic
  const [historyData, setHistoryData] = useState<any | null>(null);
  const [historyError, setHistoryError] = useState<Error | null>(null);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  // Use useFetchWithParams conditionally
  const shouldFetch = fetchHistoryParams !== null;
  const fetchResult = useFetchWithParams(
    shouldFetch ? fetchHistoryParams : {
      url: '', // Dummy URL to satisfy the hook
      queryParams: {},
      headers: {}
    }
  );

  // Update local state based on fetch results and conditions
  useEffect(() => {
    if (!shouldFetch) {
      // No fetch needed, reset state
      setHistoryData(null);
      setHistoryError(null);
      setHistoryLoading(false);
    } else {
      // Use fetch results
      setHistoryData(fetchResult.data);
      setHistoryError(fetchResult.error);
      setHistoryLoading(fetchResult.loading);
    }
  }, [shouldFetch, fetchResult.data, fetchResult.error, fetchResult.loading]);

  const histories = historyData && historyData.items ? (historyData as { items: [], total: number, size: number, pages: number }).items : [];
  // Update comparisonDetails when histories are loaded
  useEffect(() => {
    if (histories && histories.length > 0) {
      const newComparisonDetails: {[key: string]: any} = {};
      
      historyIds.forEach(historyId => {
        const historyItem = (histories as any[]).find((item: any) => item.id === historyId);
        if (historyItem) {
          // Parse metadata and include metrics for comparison
          const metadata = JSON.parse(historyItem.metadata_value);
          newComparisonDetails[String(historyId)] = {
            ...metadata,
            metrics: historyItem.metrics,
            project: historyItem.project,
            status: historyItem.status,
            run_type: historyItem.run_type,
          };
        }
      });
      
      setComparisonDetails(newComparisonDetails);
    //   console.log("Updated comparisonDetails:", newComparisonDetails);
    }
  }, [historyIds, histories]);

  // Helper function to export to Excel
  const exportToExcel = async () => {
    if (historyIds.length < 2) return;
    if (Object.keys(comparisonDetails).length < 2) return;
    
    const baseId = historyIds[0];
    const baseMetrics = comparisonDetails[String(baseId)]?.metrics || {};
      try {
        // Dynamically import xlsx for better compatibility
        const XLSX = await import('xlsx');
        
        const workbook = XLSX.utils.book_new();
        
        // Create combined data for all categories
        const allData: any[][] = [];
        
        // Add main header
        const mainHeaders = ['Metric', `ID: ${baseId} (Base)`, ...Object.keys(comparisonDetails)
          .filter(histId => histId !== String(baseId))
          .map(histId => `ID: ${histId}`)
        ];
        allData.push(mainHeaders);
        
        // Add data for each category
        Object.keys(baseMetrics).forEach(category => {
          // Add category header (bold will be applied later)
          allData.push([category, '', ...Array(Object.keys(comparisonDetails).length - 1).fill('')]);
          
          // Get metrics for this category
          const categoryMetrics = new Set<string>();
          Object.values(comparisonDetails).forEach(details => {
            if (details.metrics?.[category]) {
              const categoryDataObj = details.metrics[category];
              Object.keys(categoryDataObj).forEach(subcategory => {
                const subcategoryData = categoryDataObj[subcategory];
                Object.keys(subcategoryData).forEach(metricName => {
                  if (typeof subcategoryData[metricName] === 'number') {
                    categoryMetrics.add(`${subcategory} ${metricName}`);
                  }
                });
              });
            }
          });
          
          // Add data rows for this category
           Array.from(categoryMetrics).forEach(metricKey => {
             const fullKey = `${category}: ${metricKey}`;
             const baseFlattenedMetrics = flattenMetrics(baseMetrics);
             const baseValue = getMetricValue(baseFlattenedMetrics, fullKey);
             const row = [metricKey, baseValue];
             
             Object.entries(comparisonDetails)
               .filter(([histId]) => histId !== String(baseId))
               .forEach(([histId, details]) => {
                 const flattenedMetrics = flattenMetrics(details.metrics);
                 const compValue = getMetricValue(flattenedMetrics, fullKey);
                 const {trend, diff} = calculateTrend(baseValue, compValue);
                 
                 // Combine value with trend and difference
                 const cellValue = diff !== 'n/a' ? `${compValue} ${trend} (${diff})` : compValue;
                 row.push(cellValue);
               });
             
             allData.push(row);
           });
          
          // Add empty row for spacing
          allData.push(['', '', ...Array(Object.keys(comparisonDetails).length - 1).fill('')]);
        });
        
        // Create single worksheet with enhanced styling
        const worksheet = XLSX.utils.aoa_to_sheet(allData);
        
        // Set column widths for better readability
        const colWidths = [
          {wch: 25}, // Metric column
          {wch: 15}, // Base column
          ...Array(Object.keys(comparisonDetails).length - 1).fill({wch: 20}) // Comparison columns
        ];
        worksheet['!cols'] = colWidths;
        
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Metric_Comparison');
        
        // Generate and download file
        const fileName = `metric_comparison_${baseId}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        
      } catch (error) {
        console.error('Excel export failed:', error);
        alert('Excel export failed. Please install xlsx library: npm install xlsx');
      }
    };

  const renderMetricComparison = () => {
    if (historyIds.length < 2) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-500">At least 2 history items are required for comparison</p>
            <Button 
              onClick={() => router.push('/dashboard/analytics')}
              className="mt-4"
              variant="secondary"
            >
              Go Back
            </Button>
          </div>
        </div>
      );
    }
    
    if (Object.keys(comparisonDetails).length < 2) return null;
    
    const baseId = historyIds[0];
    const baseMetrics = comparisonDetails[String(baseId)]?.metrics || {};

    return (
      <div className="mt-2 px-5 pb-4 border-slate-200 dark:border-slate-700">
        {(() => {
          // Group metrics by category
          const metricsByCategory: {[category: string]: {[key: string]: number}[]} = {};
          
          // Get all metrics from all selected items
          Object.values(comparisonDetails).forEach(details => {
            if (details.metrics) {
              Object.keys(details.metrics).forEach(category => {
                if (!metricsByCategory[category]) {
                  metricsByCategory[category] = [];
                }
              });
            }
          });
          
          return Object.keys(metricsByCategory).map(category => {
            // Get all subcategory-metric combinations for this category
            const categoryMetrics = new Set<string>();
            Object.values(comparisonDetails).forEach(details => {
              if (details.metrics?.[category]) {
                const categoryData = details.metrics[category];
                   Object.keys(categoryData).forEach(subcategory => {
                   const subcategoryData = categoryData[subcategory];
                   Object.keys(subcategoryData).forEach(metricName => {
                     if (typeof subcategoryData[metricName] === 'number') {
                       categoryMetrics.add(`${subcategory} ${metricName}`);
                     }
                   });
                 });
              }
            });
              
              return (
               <div key={category} className="mb-6">
                 <div className="flex items-center justify-between mb-2">
                   <h4 className="font-medium text-base text-gray-800 dark:text-gray-200">{category}</h4>
                   <button
                     onClick={() => setShowCategoryCharts(!showCategoryCharts)}
                     className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded transition-colors"
                   >
                     {showCategoryCharts ? 'Hide Chart' : 'Show Chart'}
                   </button>
                 </div>
                 
                 {/* Category-level consolidated chart */}
                 {showCategoryCharts && (
                   <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded border">
                     <CategoryChart
                       category={category}
                       categoryMetrics={categoryMetrics}
                       baseId={baseId}
                       baseMetrics={baseMetrics}
                       comparisonDetails={comparisonDetails}
                     />
                   </div>
                 )}
                 
                 <div className="border-b border-gray-300 dark:border-gray-600 mb-2"></div>
                 
                 <div className="overflow-x-auto">
                   <TableRoot className="min-w-full">
                     <Table className="text-sm">
                       <TableHead>
                         <TableRow>
                           <TableHeaderCell className="px-2 py-1 text-xs font-medium">Metric</TableHeaderCell>
                           <TableHeaderCell className="px-2 py-1 text-xs font-medium whitespace-nowrap">ID: {baseId}(Base)</TableHeaderCell>
                           {Object.keys(comparisonDetails)
                             .filter(histId => histId !== String(baseId))
                             .map(histId => (
                               <TableHeaderCell key={histId} className="px-2 py-1 text-xs font-medium whitespace-nowrap">ID: {histId}</TableHeaderCell>
                             ))}
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {Array.from(categoryMetrics).map(metricKey => {
                           // Get base value for this metric
                           const fullKey = `${category}: ${metricKey}`;
                           const baseFlattenedMetrics = flattenMetrics(baseMetrics);
                           const baseValue = getMetricValue(baseFlattenedMetrics, fullKey);
                           
                           return (
                             <TableRow key={metricKey}>
                               <TableCell className="px-2 py-1 text-xs font-medium">{metricKey}</TableCell>
                               <TableCell className="px-2 py-1 text-xs">{baseValue}</TableCell>
                               {Object.entries(comparisonDetails)
                                 .filter(([histId]) => histId !== String(baseId))
                                 .map(([histId, details]) => {
                                   const flattenedMetrics = flattenMetrics(details.metrics);
                                   const compValue = getMetricValue(flattenedMetrics, fullKey);
                                   const trendProp = fullKey.includes('Latency Metrics') ? -1 : (metricKey.toLowerCase().includes(' std') ? 0 : 1);
                                   const {trend, trendColor, diff} = calculateTrend(baseValue, compValue, trendProp);
                                   
                                   return (
                                     <TableCell key={histId} className="px-2 py-1 text-xs whitespace-nowrap">
                                       <span>{compValue}</span>
                                       {diff !== 'n/a' && (
                                         <>
                                           <span className={`ml-1 ${trendColor}`}>{trend}</span>
                                           <span className="ml-1 text-xs text-gray-500">
                                             ({diff})
                                           </span>
                                         </>
                                       )}
                                     </TableCell>
                                   );
                                 })}
                             </TableRow>
                           );
                         })}
                       </TableBody>
                     </Table>
                   </TableRoot>
                 </div>
               </div>
             );
          });
        })()}
      </div>
    );
  };

  const historyFilterKeys: OptionType[] = [
    {value: 'project', label: 'Name'},
    {value: 'status', label: 'Status'},
    {value: 'run_type', label: 'RunType'},
    {value: 'history_ids', label: 'HistoryIDs'},
  ];

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-b-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <Label htmlFor="Analytics">Comparing History IDs: {historyIds.join(', ')}</Label>
              <Tooltip 
                side="bottom" 
                showArrow={true} 
                content={
                  <div className="text-sm">
                    <div>Comparing metrics across selected history items</div>
                    <div>Base comparison: ID {historyIds[0]}</div>
                  </div>
                }
              >
                <div className="flex items-center justify-center w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded-full cursor-help text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                  ?
                </div>
              </Tooltip>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => router.push('/dashboard/analytics')}
                variant="secondary"
              >
                ← Back to Analytics
              </Button>
              
              {historyIds.length > 1 && (
                <Button 
                  variant="secondary" 
                  onClick={exportToExcel}
                  className="text-sm px-3 py-1"
                >
                  Export to Excel
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex-grow flex justify-end">
            <AutocompleteInput
              predefinedOptions={historyFilterKeys}
              keyValuePairs={historyDataFilters}
              setKeyValuePairs={setHistoryDataFilters}
            />
          </div>
        </div>
      </header>
      
      {historyLoading ? (
        <div className="flex h-full w-full">
          <Loading/>
        </div>
      ) : (
        renderMetricComparison()
      )}
    </div>
  );
};

export default Compare; 
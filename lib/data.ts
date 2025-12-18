// Helper function to flatten metrics into comparable key-value pairs
export const flattenMetrics = (metrics: any): {[key: string]: number} => {
  const flattened: {[key: string]: number} = {};
  
  if (!metrics) return flattened;
  
  Object.keys(metrics).forEach(category => {
    const categoryData = metrics[category];
               Object.keys(categoryData).forEach(subcategory => {
         const subcategoryData = categoryData[subcategory];
         Object.keys(subcategoryData).forEach(metricName => {
          const value = subcategoryData[metricName];
           if (typeof value === 'number') {
             // Handle different patterns:
             // Case 1: Accuracy {Mean: 0.89, Std: 0.31} -> "Accuracy Mean", "Accuracy Std"
             // Case 2: Std {Latency: 12.68} -> "Std Latency"
             const key = `${category}: ${subcategory} ${metricName}`;
             flattened[key] = value;
           }
         });
       });
  });
  return flattened;
};

// Helper function to get metric value
export const getMetricValue = (flattenedMetrics: {[key: string]: number}, key: string): string => {
  const value = flattenedMetrics[key];
  return value !== undefined ? value.toFixed(2) : 'n/a';
};

// Helper function to extract key metrics for display
export const getKeyMetrics = (metrics: any) => {
  if (!metrics) return null;
  
  const extractedMetrics: any = {
    latency: {},
    quality: {},
    status: {}
  };
  
  // Extract latency metrics: avg, p50, p90
  if (metrics['Latency Metrics']) {
    const latencyMetrics = metrics['Latency Metrics'];
    if (latencyMetrics['Avg']?.['Latency']) {
      extractedMetrics.latency.avg = `${latencyMetrics['Avg']['Latency']}s`;
    }
    if (latencyMetrics['P50']?.['Latency']) {
      extractedMetrics.latency.p50 = `${latencyMetrics['P50']['Latency']}s`;
    }
    if (latencyMetrics['P90']?.['Latency']) {
      extractedMetrics.latency.p90 = `${latencyMetrics['P90']['Latency']}s`;
    }
  }
  
  // Extract all quality metrics
  if (metrics['Quality Metrics']) {
    const qualityMetrics = metrics['Quality Metrics'];
    Object.keys(qualityMetrics).forEach((qualityKey) => {
      const qualityData = qualityMetrics[qualityKey];
      
      // Check if both Mean and Std exist for this quality metric
      if (qualityData['Mean'] !== undefined && qualityData['Std'] !== undefined) {
        const mean = typeof qualityData['Mean'] === 'number' ? qualityData['Mean'].toFixed(2) : qualityData['Mean'];
        const std = typeof qualityData['Std'] === 'number' ? qualityData['Std'].toFixed(2) : qualityData['Std'];
        extractedMetrics.quality[qualityKey] = `${mean} (±${std})`;
      }
    });
  }
  
  // Extract success rate if available
  if (metrics['Status Distribution']) {
    const total = metrics['Status Distribution']['Total']?.['Status Distribution'] || 0;
    const errors = metrics['Status Distribution']['Error rate']?.['Status Distribution'] || 0;
    if (total > 0) {
      extractedMetrics.status.success = `${((1 - errors / 100) * 100).toFixed(1)}%`;
      extractedMetrics.status.total = total;
    }
  }
  
  return extractedMetrics;
}; 


  // Helper function to calculate trend
 export const calculateTrend = (baseValue: any, compareValue: any, trendProp: number = 1) => {
    if (baseValue === 'n/a' || compareValue === 'n/a') {
      return {
        trend: '−',
        trendColor: 'text-gray-500',
        diff: 'n/a'
      };
    }

    const diff = Number(compareValue) - Number(baseValue);
    let trendColor = '';
    if (trendProp == -1) {
      trendColor = diff > 0 ? 'text-red-500' : diff < 0 ? 'text-green-500' : 'text-gray-500';
    } else if (trendProp == 1) {
      trendColor = diff > 0 ? 'text-green-500' : diff < 0 ? 'text-red-500' : 'text-gray-500';
    }
    return {
      trend: (trendProp == 0 ? ('') : (diff > 0 ? '↑' : diff < 0 ? '↓' : '−')),
      trendColor: trendColor,
      diff: diff.toFixed(2)
    };
  };

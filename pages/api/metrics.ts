function formatMetrics(data: any): string {
    let output = '';
  
    for (const section in data) {
      output += `${section}\n`;
  
      const content = data[section];
  
      // Handle table-like metrics with Mean/Std
      const allHaveMean = Object.values(content).every(
        (val) => val !== null && typeof val === 'object' && 'Mean' in val && 'Std' in val
      );
  
      if (allHaveMean) {
        for (const metric in content) {
          const mean = content[metric].Mean;
          const std = content[metric].Std;
          output += `- ${metric}: ${mean} (Std Dev: ${std})\n`;
        }
      } else {
        // Combine all leaf keys into a single horizontal line if numeric
        const horizontal: string[] = [];
        for (const metric in content) {
          const val = content[metric];
          if (typeof val === 'object') {
            for (const submetric in val) {
              horizontal.push(`${metric}: ${val[submetric]}`);
            }
          } else {
            horizontal.push(`${metric}: ${val}`);
          }
        }
        output += '- ' + horizontal.join(', ') + '\n';
      }
  
      output += '\n'; // section spacing
    }
  
    return output;
  }


  function compareMetricsDiff(entries: any[]): string {
    if (!Array.isArray(entries) || entries.length < 2) {
      return 'Need at least two metric entries to compare.';
    }
  
    let output = '';
    const numEntries = entries.length;
  
    // Collect all categories across all entries
    const categories = new Set<string>();
    for (const entry of entries) {
      Object.keys(entry).forEach(cat => categories.add(cat));
    }
  
    for (const category of Array.from(categories)) {
      output += `${category}\n`;
  
            // Collect all metric keys across all entries for this category
      const metricKeys = new Set<string>();
      for (const entry of entries) {
        const section = entry[category] || {};
        Object.keys(section).forEach(metric => metricKeys.add(metric));
      }

      for (const metric of Array.from(metricKeys)) {
        // Determine if metric values are objects or primitives by scanning first non-null value
        let isNested = false;
        for (const entry of entries) {
          const val = entry[category]?.[metric];
          if (val !== undefined && val !== null) {
            isNested = (typeof val === 'object' && val !== null);
            break;
          }
        }
  
        if (isNested) {
                    // Collect all subkeys across entries for this metric
          const subKeys = new Set<string>();
          for (const entry of entries) {
            const val = entry[category]?.[metric];
            if (val && typeof val === 'object') {
              Object.keys(val).forEach(sub => subKeys.add(sub));
            }
          }

          for (const sub of Array.from(subKeys)) {
            // Collect all values for this submetric across entries
            const values = entries.map(entry => {
              const v = entry[category]?.[metric]?.[sub];
              return v !== undefined ? v : 'N/A';
            });
  
            output += `- ${metric} (${sub}): ${values.join(' -> ')}\n`;
          }
        } else {
          // Primitive values: collect all values across entries
          const values = entries.map(entry => {
            const v = entry[category]?.[metric];
            return v !== undefined ? v : 'N/A';
          });
  
          output += `- ${metric}: ${values.join(' -> ')}\n`;
        }
      }
  
      output += '\n';
    }
  
    return output.trim();
  }
  
export { formatMetrics, compareMetricsDiff };
  
import React, {useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import {Column} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import {Tabs} from '@mantine/core';
import Loading from "@/components/Plugins/Loading";

type Row = Array<string | number | null>;

interface ExcelDataViewerProps {
  fileUrl: string | null;
  status: string | null;
}

interface Header {
  value: string;
  style: Record<string, any>;
}

export type SortableColumn<T> = Column<T> & {
  sortFunction?: (a: T, b: T) => number;
  readonly renderValue?: (value: T) => React.ReactNode;
};

const indexColumn = 'index'

// Helper function to pretty-print JSON if applicable
const formatContent = (content: any) => {
  try {
    const parsedContent = JSON.parse(content);
    return JSON.stringify(parsedContent, null, 2); // Pretty-print JSON with 2 spaces
  } catch {
    return content;
  }
};

const toColumn = (col: any, toggleExpand: (rowIndex: number) => void, expandedRows: Set<number>) => {
  const {renderValue} = col;
  return {
    ...col,
    // resizable: true,
    draggable: true,
    renderCell: (cell) => {
      const rowIndex = cell.rowIdx;
      const isExpanded = expandedRows.has(rowIndex);
      const row = cell.row;
      // console.log(col.index, rowIndex, row)
      if (col.index == -1) {
        // index hidden
        return <></>
      }
      return (
        <div
          className={`${isExpanded ? 'overflow-y-scroll whitespace-normal h-[190px]' : 'overflow-hidden whitespace-nowrap h-auto'} cursor-pointer text-ellipsis`}
          onClick={() => toggleExpand(cell.rowIdx)} // Toggle row expansion on cell click
        >
          {col.index == -1 ?
            <p className="text-slate-400 text-sm"> {rowIndex} </p> : formatContent(row[`col${col.index}`] || '')}
        </div>
      );
    },
  };
};


const ExcelDataViewer: React.FC<ExcelDataViewerProps> = ({fileUrl, status}) => {
  const [sheets, setSheets] = useState<any[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // New state for expanded rows
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [columns, setColumns] = useState<Column<any>[]>([]);
  const [formattedRows, setFormattedRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchExcelData = async () => {
      if (!fileUrl) return;

      setLoading(true);
      try {
        const response = await fetch(fileUrl, {
          headers: {accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Excel data');
        }

        const excelData = await response.arrayBuffer();
        const workbook = XLSX.read(excelData, {type: 'array'});
        const sheetData = workbook.SheetNames.map((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const content = XLSX.utils.sheet_to_json<Row>(sheet, {header: 1, raw: false});

          const styledContent = content.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
              const cellAddress = XLSX.utils.encode_cell({r: rowIndex, c: colIndex});
              const cellData = sheet[cellAddress] || {};

              return {
                value: cell,
                style: cellData.s || {},
              };
            });
          });

          return {name: sheetName, content: styledContent};
        });

        setSheets(sheetData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchExcelData();
  }, [fileUrl]);

  useEffect(() => {
    if (sheets.length > 0 && sheets[activeSheet]) {
      const activeSheetContent = sheets[activeSheet].content;
      const headers: Header[] = [];

      if (Array.isArray(activeSheetContent[0])) {
        activeSheetContent[0].forEach((header) => {
          if (header == null) {
            headers.push({value: '', style: {}});
          } else {
            headers.push(header);
          }
        });
      }
      // console.log("headers", headers)
      const rows = activeSheetContent.slice(1);

      let columns: Column<any>[] = [];
      if (rows.length > 0 && rows[0].length - 1 == headers.length) {
        // Python excel writer: index=False, header=True
        columns = [
          {
            key: '',
            name: '',
            width: 150,
            index: 0,
          },
          ...headers.map((header: any, index: number) => ({
            key: `col${index + 1}`,
            name: header?.value || `Column ${index + 1}`,
            width: 150, // Fixed width, adjust as needed
            // minWith: 150,
            index: index + 1,   // Add an "index" column
          })),
        ];
      } else {
        columns = [
          // {
          //   key: indexColumn,
          //   name: '',
          //   width: 150,
          //   index: -1, // index should be hidden to expand rows
          // },
          ...headers.map((header: any, index: number) => ({
            key: `col${index}`,
            name: header?.value || `Column ${index}`,
            width: 150, // Fixed width, adjust as needed
            // minWith: 150,
            index,   // Add an "index" column
          })),
        ];
      }



      const formattedRows = rows.map((row: any, rowIndex: number) => {
        const formattedRow: any = {index: rowIndex + 1}; // Add index to each row
        row.forEach((cell: any, colIndex: number) => {
          formattedRow[`col${colIndex}`] = cell?.value || '';
        });
        // console.log("formattedRow", formattedRow)
        return formattedRow;
      });

      // Update columns and formattedRows state
      setColumns(columns);
      setFormattedRows(formattedRows);
    }
  }, [activeSheet, sheets]);

  const handleSheetChange = (index: number) => {
    setActiveSheet(index);
  };

  // Toggle row expansion
  const toggleExpand = (rowIndex: number) => {
    console.log("toggleExpand", rowIndex)
    setExpandedRows((prevExpandedRows) => {
      const updatedExpandedRows = new Set(prevExpandedRows);
      if (updatedExpandedRows.has(rowIndex)) {
        updatedExpandedRows.delete(rowIndex);
      } else {
        updatedExpandedRows.add(rowIndex);
      }
      return updatedExpandedRows;
    });
  };
  // console.log("expandedRows", expandedRows)
  const excelComponent = () => {
    if (sheets.length > 0 && columns.length > 0) {
      return (
        <div className="px-4 py-4  flex-col shadow-lg rounded-sm">
          <Tabs color="" defaultValue="0">
            <Tabs.List className="flex border-b border-gray-300">
              {sheets.map((sheet, t_index) => (
                <Tabs.Tab
                  key={t_index}
                  value={String(t_index)}
                  onClick={(value) => setActiveSheet(t_index)}
                  className={`rounded-t border-transparent px-4 py-2 cursor-pointer ${
                    activeSheet === t_index
                      ? 'glyphicon-font bg-emerald-100 text-slate-800 dark:text-slate-900 border-b-emerald-800 border-2'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {sheet.name}
                </Tabs.Tab>
              ))}
            </Tabs.List>

          </Tabs>
          <div className="overflow-auto flex-grow">
            <DataGrid
              columns={columns.map((col) => toColumn(col, toggleExpand, expandedRows))}
              rows={formattedRows}
              className="min-w-full h-full fill-grid"
              onColumnsReorder={(col1, col2) => {
                const movedColumnIdx = columns.findIndex((col) => col.key === col1)
                const targetColumnIdx = columns.findIndex((col) => col.key === col2)
                const newColumns = [...columns]
                const [movedColumn] = newColumns.splice(movedColumnIdx, 1)

                setColumns([
                  ...newColumns.slice(0, targetColumnIdx),
                  movedColumn,
                  ...newColumns.slice(targetColumnIdx)
                ])
              }}
              rowHeight={(row) => expandedRows.has(parseInt(row[indexColumn]) - 1) ? 200 : 40} // Adjust row height based on expansion state
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col">
      {loading && <div className="flex w-full"><Loading/></div>}
      {error && <div>Error: {error.message}</div>}
      {excelComponent()}
    </div>
  );
};

export default ExcelDataViewer;

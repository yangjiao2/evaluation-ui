'use client';
import React, {useEffect, useMemo, useRef, useState, useTransition} from 'react';
import {GetServerSideProps} from 'next';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useCreateReducer} from '@/hooks/useCreateReducer';
import {useFetchBotConfig} from '@/services/useApiService';
import config from '../../config.json';

import {DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE} from '@/utils/app/const';
import {getSettings} from '@/utils/app/settings';
import {Conversation} from '@/types/chat';
import {OllamaModelID, OllamaModels, fallbackModelID} from '@/types/ollama';
import {v4 as uuidv4} from 'uuid';
import Login, {validateToken} from '@/components/Plugins/Login';
import ErrorPage from '@/components/Plugins/Error';
import LoadingPage from '@/components/Plugins/Loading';
import Dashboard from '@/components/Plugins/Dashboard'
import {useFetch} from '@/hooks/useFetch';
import {useFetchWithParams} from '@/hooks/helper/useFetchWithParams';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Tremor/Table"
import {Checkbox} from '@/components/Tremor/Checkbox'
import {Button} from "@/components/Tremor/Button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/Tremor/Drawer"
import {Pagination} from '@mantine/core';

import MultiCardCarousel from '@/components/MultiCardCarousel';
import {Badge} from '@/components/Tremor/Badge';
import Loading from '@/components/Plugins/Loading';
import Link from "next/link";
import loading from "@/components/Plugins/Loading";
import Tag from '@/components/Tag';
import { Tooltip } from '../Tremor/Tooltip';
import { getKeyMetrics } from '@/lib/data';


// Define types for the data structure of a history item
export interface HistoryItem {
  id: number;
  project: string;
  run_type: string;
  status: string;
  metadata_value: string; // Assuming metadata is stored as a JSON string
  created_date: string;
  modified_date: string;
  nemo_eval_id: string;
  tag1: string;
  tag2: string;
  metrics?: any; // Added metrics field
}

// Define the props for the EvaluationHistoryTable component
interface EvaluationHistoryTableProps {
  historyData: HistoryItem[]; // Array of HistoryItem objects
  isSelectable?: boolean; // Optional, defaults to false
  selectedRows: number[]; // Array of selected row IDs
  setSelectedRows: any; // Setter function to update selected rows
  expandDrawer: any; // Function to expand the drawer with metadata
  showDetails?: boolean; // Optional, show evaluation details as a column
  showMetrics?: boolean; // Optional, show evaluation detail metrics
  expandMetricsDrawer?: any; // Optional function to expand metrics drawer
}

export function EvaluationHistoryTable({
                                         historyData,
                                         isSelectable = false,
                                         selectedRows,
                                         setSelectedRows,
                                         expandDrawer = null,
                                         showDetails = true,
                                         showMetrics = false,
                                         expandMetricsDrawer = null,
                                       }: EvaluationHistoryTableProps) {

  const router = useRouter();
  
  // Toggle selection of a row
  const handleSelectRow = (id: number) => {
    console.log("rowId", id, selectedRows.includes(id))
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Helper function to format metrics for tooltip display
  const formatMetricsTooltip = (metrics: any) => {
    if (!metrics) return "No metrics available";
    
    let tooltip = "";
    Object.keys(metrics).forEach((category) => {
      tooltip += `${category}:\n`;
      const categoryData = metrics[category];
      
      Object.keys(categoryData).forEach((subKey) => {
        const subData = categoryData[subKey];
        Object.keys(subData).forEach((metricKey) => {
          const value = subData[metricKey];
          tooltip += `  ${subKey} ${metricKey}: ${typeof value === 'number' ? value.toFixed(2) : value}\n`;
        });
      });
      tooltip += "\n";
    });
    
    return tooltip.trim();
  };

  // console.log("historyData", historyData)
  
  return (
    <>
      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              {isSelectable && <TableHeaderCell>☑️</TableHeaderCell>}
              <TableHeaderCell>Id</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Run Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Metadata</TableHeaderCell>
              <TableHeaderCell>Created timestamp</TableHeaderCell>
             {showDetails && <TableHeaderCell>Details</TableHeaderCell>}
              <TableHeaderCell>Modified timestamp</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(historyData) &&
              historyData.map((h) => {
                const convertToPST =(utcTimestamp)=> {
                  // Convert the input UTC timestamp to a Date object
                  const utcDate = new Date(utcTimestamp + "Z"); // Add 'Z' to treat as UTC

                  // Format the date in PST timezone
                  const pstFormatted = utcDate.toLocaleString("en-US", {
                    timeZone: "America/Los_Angeles", // PST time zone
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true, // Format to 12-hour clock
                  });

                  return pstFormatted + " PST";
                }

                // const created_date = new Date(h.created_date);
                const formattedCreatedDate = convertToPST(h.created_date)

                // const modified_date = new Date(h.modified_date);
                const formattedModifiedDate = convertToPST(h.modified_date);

                const metadataJson = JSON.parse(h.metadata_value);
                const isSelected = selectedRows.includes(h.id); // Check if row is selected
                const keyMetrics = getKeyMetrics(h.metrics);
                const columnCount = (isSelectable ? 1 : 0) + 5 + (showDetails ? 1 : 0); // Calculate total columns
                // console.log("selectedRows", selectedRows)

                return (
                  <React.Fragment key={h.id}>
                    <TableRow>
                      {isSelectable && (
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onClick={() => handleSelectRow(h.id)}
                          />
                        </TableCell>
                      )}
                      <TableCell>{h.id}</TableCell>
                      <TableCell>{h.project}
                        <div className="flex flex-wrap gap-2 mt-1" key="tags">
                          {[h.tag1, h.tag2].map((tag, index) => (
                            <Tag key={index} text={tag} />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{h.run_type}</TableCell>
                      <TableCell>
                      <Tooltip side="top" showArrow={false} content={h.status == "ERROR" ? "Encountered parsing error (minor), please check evaluation details" : (h.status == "FAILED" ? "Please contact Jessica Jiao" : "")}>
                        <Badge
                          variant={
                            h.status === "COMPLETED"
                              ? "success"
                              : h.status === "STARTED"
                                ? "default"
                                : h.status === "FAILED"
                                  ? "error"
                                  : "neutral"
                          }
                        >
                          {h.status}
                        </Badge>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {expandDrawer ? <Button
                          variant="ghost"
                          onClick={() => expandDrawer(metadataJson)}
                        >
                          {metadataJson.Env}
                        </Button> : <> {metadataJson.Env}</>}
                      </TableCell>
                      <TableCell>{formattedCreatedDate}</TableCell>
                     {showDetails && <TableCell>
                        <Link
                          className="underline font-medium text-md text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3"
                          href={`/dashboard/run?id=${h.id}`}
                          onClick={() => {
                            sessionStorage.setItem(`id=${h.id}`, JSON.stringify({"tag1": h.tag1, "tag2": h.tag2, ...metadataJson}));
                          }}
                        >
                          {h.nemo_eval_id}
                        </Link>
                      </TableCell>}
                      <TableCell>{formattedModifiedDate}</TableCell>
                    </TableRow>
                    
                    {/* Metrics Row - spans all columns */}
                      {showMetrics && h.metrics && (
                         <TableRow style={{borderTop: 'none'}}> 
                          
                          {/* Empty cells to align with Name column */}
                          {isSelectable && <TableCell className="border-t-0"></TableCell>}
                          <TableCell className="border-t-0"></TableCell>
                          
                          <TableCell colSpan={columnCount - (isSelectable ? 2 : 1)} className="pb-3 pt-0 border-t-0">
                              <div className="flex flex-wrap gap-4">

                              {/* Latency Metrics */}
                              {Object.keys(keyMetrics.latency).length > 0 && (
                                <div>
                                  {/* <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">⚡ Latency</div> */}
                                  <div className="flex flex-wrap gap-1">
                                      {keyMetrics && (
                                       <Badge variant="neutral" className="text-xs">
                                         {keyMetrics.latency.avg && (`Avg: ${keyMetrics.latency.avg}`)}
                                         {keyMetrics.latency.p50 && (`, P50: ${keyMetrics.latency.p50}`)}
                                         {keyMetrics.latency.p90 && (`, P90: ${keyMetrics.latency.p90}`)}
                                       </Badge>
                                     )}
                         
                                  </div>
                                </div>
                              )}
                              
                              {/* Quality Metrics */}
                              {Object.keys(keyMetrics.quality).length > 0 && (
                                <div>
                                  {/* <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">🎯 Quality</div> */}
                                  <div className="flex flex-wrap gap-1">
                                      {Object.entries(keyMetrics.quality).map(([key, value]) => (
                                       <Badge key={key} variant="default" className="text-xs">
                                         {key}: {String(value)}
                                       </Badge>
                                     ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Status Metrics */}
                               {Object.keys(keyMetrics.status).length > 0 && (
                                 <div>
                                   {/* <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">✅ Status</div> */}
                                   <div className="flex flex-wrap gap-1">
                                     <Badge variant="warning" className="text-xs">
                                       {keyMetrics.status.success && (`Success: ${keyMetrics.status.success}`)}
                                       {keyMetrics.status.total && (`, Total: ${keyMetrics.status.total}`)}
                                     </Badge>
                                   </div>
                                 </div>
                               )}
                            </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableRoot>
    </>
  );
}
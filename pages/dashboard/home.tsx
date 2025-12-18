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
import {Label} from '@/components/Tremor/Label';
import {Input} from '@/components/Tremor/Input';
import {DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE} from '@/utils/app/const';
import {getSettings} from '@/utils/app/settings';
import {Conversation} from '@/types/chat';
import {OllamaModelID, OllamaModels, fallbackModelID} from '@/types/ollama';
import HomeContext from '../api/home/home.context';
import {HomeInitialState, initialState} from '../api/home/home.state';
import {v4 as uuidv4} from 'uuid';
import Login, {validateToken} from '@/components/Plugins/Login';
import ErrorPage from '@/components/Plugins/Error';
import LoadingPage from '@/components/Plugins/Loading';
import Dashboard from '@/components/Plugins/Dashboard'
import {useFetch} from '@/hooks/useFetch';
import {useFetchWithParams} from '@/hooks/helper/useFetchWithParams';
import {Pagination} from '@mantine/core';

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

import MultiCardCarousel from '@/components/MultiCardCarousel';
import {Badge} from '@/components/Tremor/Badge';
import Loading from '@/components/Plugins/Loading';
import Link from "next/link";
import loading from "@/components/Plugins/Loading";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Tremor/Select"
import AutocompleteInput, {OptionType} from "@/components/Plugins/AutocompleteInput";
import {EvaluationHistoryTable, HistoryItem} from "@/components/Table/EvaluationHistoryTable";
import {KeyValuePair} from "@/types/data";


type StateType = [boolean, () => void, () => void, () => void] & {
  state: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const timeRanges = [
  {
    value: "past-1-week",
    label: "Past 1 week",
  },
  {
    value: "past-2-weeks",
    label: "Past 2 weeks",
  },
  {
    value: "past-1-month",
    label: "Past 1 month",
  },
]


const useToggleState = (initial = false) => {
  const [state, setState] = useState<boolean>(initial)

  const close = () => {
    setState(false)
  }

  const open = () => {
    setState(true)
  }

  const toggle = () => {
    setState((state) => !state)
  }

  const hookData = [state, open, close, toggle] as StateType
  hookData.state = state
  hookData.open = open
  hookData.close = close
  hookData.toggle = toggle
  return hookData
}

const Home = ({}) => {
    const containerRef = useRef(null);
    const router = useRouter()
    const {t} = useTranslation('chat');
    const contextValue = useCreateReducer<HomeInitialState>({
      initialState,
    });
    const {
      state: {
        // folders,
        // conversations,
        // selectedConversation,
        // prompts,
        // selectedModel,
        appConfig
      },
      dispatch,
    } = contextValue;
    const [projectName, setProjectName] = useState<string | null>(null);
    // const stopConversationRef = useRef<boolean>(false);
    // const botName = router?.query?.bot ?? 'nvhelp'

    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const [drawerContent, setDrawerContent] = useState<Object | null>(null)
    const [drawerOpen, showDrawer, closeDrawer] = useToggleState()

    const [selectedTimeRange, setSelectedTimeRange] = useState("past-1-month")
    const expandDrawer = (drawerObject: Object) => {
      setDrawerContent(drawerObject)
      showDrawer()
    }
    const [historyDataFilters, setHistoryDataFilters] = useState<KeyValuePair[]>([]); // Array of objects with 'key' and 'value' as strings
    const [activePage, setPage] = useState(1);


    // const [isTokenValid, setIsTokenValid] = useState(false)

    const fetchHistoryParams = useMemo(() => {
      const params = {is_active: 'true', page: activePage ?? 1};

      historyDataFilters.forEach(item => {
        params[item.key] = item.value;
      });

      return {
        url: `${config.SERVICE_URL}/evaluations_history`,
        queryParams: {...params, "include_metrics": false},
        headers: {
          accept: 'application/json',
        },
      };
    }, [projectName, historyDataFilters, activePage]);


    const fetchProjectParams = useMemo(() => ({
      url: `${config.SERVICE_URL}/evaluations_project`,
      queryParams: {
        is_active: 'true',
      },
      headers: {
        accept: 'application/json',
      },
    }), []);

    const {data: historyData, error: historyError, loading: historyLoading} = useFetchWithParams(fetchHistoryParams);
    const {data: projectData, error: projectError, loading: projectLoading} = useFetchWithParams(fetchProjectParams);


    // useEffect(() => {
    //   const fetchData = async () => {
    //     const { url, queryParams = {}, headers = {} } = fetchParams;
    //     const params = new URLSearchParams(queryParams);
    //     setLoading(true);
    //     let response;
    //     console.log('histories URL',`${url}?${params.toString()}`)
    //     try {
    //       response = await get(`${url}?${params.toString()}`, {
    //         headers: {
    //           accept: 'application/json',
    //           ...headers, // Merge additional headers
    //         },
    //       });
    //       setHistoryData(response);
    //     } catch (err) {
    //       setError(err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchData();
    // }, [fetchParams]);

    // const params = new URLSearchParams(fetchParams.queryParams);
    // console.log('histories URL',`${fetchParams.url}?${params.toString()}`)

    // useEffect(() => {

    //   const isUserLoggedIn = sessionStorage.getItem("IsUserLoggedIn") == "true" ?? false;
    //   console.log('IsUserLoggedIn', isUserLoggedIn);
    //   // if (!userLoggedIn || !isTokenValid) {
    //   //   return <Login appConfig={appConfig} dispatch={dispatch} />
    //   // } else if (!userHasAccess && !loading){
    //   //   return <ErrorPage message={errorMessage}/>
    //   // }
    //   console.log('sessionStorage', sessionStorage);
    //   setUserLoggedIn(isUserLoggedIn)
    //   const valid = validateToken();
    //   setIsTokenValid(!!valid);
    // }, []);
    // const filterComponent = <AutoCompleteDropdown keys={["a"]} />;
    const timeRangeSelectComponent = (selectedTimeRange: string) => (
      <div>
        <Select defaultValue={selectedTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select time range"/>
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )

    const historyFilterKeys: OptionType[] = [
      {value: 'project', label: 'Name'},
      {value: 'status', label: 'Status'},
      {value: 'run_type', label: 'RunType'},
    ]

    const drawerComponent = (drawerContent: Object) => {
      console.log("drawerContent", drawerContent);
      return (<div className="flex justify-center">
        <Drawer
          open={drawerOpen}
          onOpenChange={(modalOpened) => {
            if (!modalOpened) {
              closeDrawer()
            }
          }}
        >
          <DrawerContent className="sm:max-w-lg">
            <DrawerHeader>
              <DrawerTitle>{'Metadata'}</DrawerTitle>
              {/*<DrawerDescription className="mt-1 text-sm">*/}
              {/*  - {'bookToEdit?.year'}*/}
              {/*</DrawerDescription>*/}
            </DrawerHeader>
            {Object.entries(drawerContent)
            .filter(([key, value]) => value != null) // Exclude null values
            .map(([key, value], index) => (
              <div key={index} className='py-4'>
                <DrawerDescription className="font-bold">{key}</DrawerDescription>
                <DrawerBody>
                  {
                    typeof value === 'object' && !Array.isArray(value) ? (
                      <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                                        {JSON.stringify(value, null, 2)} {/* Pretty print JSON */}
                                    </pre>
                    ) : (
                      value.toString() ?? 'none'
                    )
                  }
                </DrawerBody>
              </div>
            ))}

            <DrawerFooter className="mt-6">
              <DrawerClose asChild>
                <Button
                  className="mt-2 w-full sm:mt-0 sm:w-fit"
                  variant="secondary"
                >
                  Go back
                </Button>
              </DrawerClose>

            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>);
    }

    // console.log('home index.tsx', userLoggedIn)
    // console.log("historyData", historyData)
    // console.log("projectData", projectData)


    const histories = historyData ? (historyData as { items: [], total: number, size: number, pages: number }).items : [];
    const pages = historyData ? (historyData as { items: [], total: number, size: number, pages: number }).pages : null;
        console.log("histories", histories)
    return (
      <div>
        <MultiCardCarousel cards={projectData && Array.isArray(projectData) ? projectData.map(
          p => {
            return {
              title: p.system,
              description: p.description,
            }
          }) : []}/>
        <div className="w-full mx-auto py-2 flex flex-row align-text-top space-x-4">
   
          <div className="flex-grow flex justify-end">
            <AutocompleteInput
              predefinedOptions={historyFilterKeys}
              keyValuePairs={historyDataFilters}
              setKeyValuePairs={setHistoryDataFilters}
            />
          </div>
          <div className="flex-shrink-0">
            {timeRangeSelectComponent(selectedTimeRange)}
          </div>
        </div>


        <div
          className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">

          <div className="flex items-center justify-between">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">Evaluation histories</h2>
            </header>
            {historyData ?
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Page</span>
                  <div className='text-xs pb-2'>(max 20)</div>
                </div>
                {/*<div className='pt-2 px-2'>Page <span > max {pages} </span></div>*/}
                <Input
                  // label="Project"
                  enableStepper={true}
                  className="pl-1 pb-2 w-12 pr-2"
                  value={activePage ? activePage : ""}
                  name="Page Number"
                  onChange={(e) => {
                    console.log("parseInt(e.target.value)", parseInt(e.target.value))
                    setPage(e.target.value ? parseInt(e.target.value) : 0);
                    // setHistoryDataFilters(prev => {
                    //   console.log("prev", prev)
                    //   return [
                    //     ...prev,
                    //
                    //     {
                    //       key: "page",
                    //       value: parseInt(e.target.value),
                    //     }
                    //     // page: parseInt(e.target.value),
                    //   ];
                    // })
                  }}
                  placeholder="Enter Project name"
                />
              </div> : <></>}
              
          </div>

          {historyLoading ? (<div className="flex h-full w-full"><Loading/></div>) :
            <div className="flex">
              <EvaluationHistoryTable
                historyData={histories || []}
                isSelectable={false}
                selectedRows={[]}
                setSelectedRows={null}
                expandDrawer={expandDrawer}
                showMetrics={false}
              />

            </div>
          }
    
        </div>

        {drawerContent && drawerComponent(drawerContent)}
      </div>
    );
  }
;
export default Home;

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
  // const defaultModelId = 
  // process.env.DEFAULT_MODEL || fallbackModelID;

  return {
    props: {
      // defaultModelId,
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'chat',
        'sidebar',
        'markdown',
        'promptbar',
        'settings',
      ])),
    },
  };
};

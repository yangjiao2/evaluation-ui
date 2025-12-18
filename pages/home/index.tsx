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
import HomeContext from '../api/home/home.context';
import {HomeInitialState, initialState} from '../api/home/home.state';
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


// interface Props {
//   defaultModelId: OllamaModelID;
// }
type StateType = [boolean, () => void, () => void, () => void] & {
  state: boolean
  open: () => void
  close: () => void
  toggle: () => void
}


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

  const expandDrawer = (drawerObject: Object) => {
    setDrawerContent(drawerObject)
    showDrawer()
  }


  // const [isTokenValid, setIsTokenValid] = useState(false)

  /* load history data */
  const fetchHistoryParams = useMemo(() => ({
    url: config.SERVICE_URL + '/evaluations_history',
    queryParams: {
      is_active: 'true',
      // project: projectName,
    },
    headers: {
      accept: 'application/json',
    },
  }), [projectName]);

  const fetchProjectParams = useMemo(() => ({
    url: config.SERVICE_URL + '/evaluations_project',
    queryParams: {
      is_active: 'true',
    },
    headers: {
      accept: 'application/json',
    },
  }), []);

  const {data: historyData, error: historyError, loading: historyLoading} = useFetchWithParams(fetchHistoryParams);
  const {data: projectData, error: projectError, loading: projectLoading} = useFetchWithParams(fetchProjectParams);

  // const { get } = useFetch(); // Your existing fetch hook
  // const [historyData, setHistoryData] = useState<T | null>(null);
  // const [error, setError] = useState<Error | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [projectName, setProjectName] = useState<string>("");

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

  const drawerComponent = (drawerContent: Object) => (<div className="flex justify-center">
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
          <DrawerTitle>{'bookToEdit?.title'}</DrawerTitle>
          <DrawerDescription className="mt-1 text-sm">
            - {'bookToEdit?.year'}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>{'bookToEdit?.summary'}</p>
        </DrawerBody>
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

  console.log('home index.tsx', userLoggedIn)
  console.log("historyData", historyData)
  console.log("projectData", projectData)
  return (
    // <HomeContext.Provider
    //   value={{
    //     ...contextValue,
    //     // handleNewConversation,
    //     // handleCreateFolder,
    //     // handleDeleteFolder,
    //     // handleUpdateFolder,
    //     // åhandleSelectConversation,
    //     // handleUpdateConversation,
    //   }}
    // >
    <></>
  );
};
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

'use client';
import Login, {validateToken} from '@/components/Plugins/Login';
import HomeContext from '@/pages/api/home/home.context';
import {MutableRefObject, useContext, useEffect, useState} from 'react';
import {Navbar} from '@/components/Mobile/Navbar';
import {ChatBody, Conversation} from '@/types/chat';
import {useRouter} from 'next/router';
import ErrorPage from './Error';
import {getIdTokenFromSession} from '@/utils/app/helper';
import {getEndpoint} from '@/utils/app/api';
import {v4 as uuidv4} from 'uuid';
import Loading from './Loading';

import Header from '@/components/Plugins/Header';
import Sidebar from '@/components/Plugins/Sidebar';

interface Props {
  containerRef: MutableRefObject<null>,
  children,
  // stopConversationRef: MutableRefObject<boolean>,
  // handleNewConversion: () => void,
  // selectedConversation: Conversation
}

export const Main = ({
                       containerRef,
                       children,
                       // handleNewConversion,
                       // stopConversationRef,
                       // selectedConversation
                     }: Props) => {
  const router = useRouter()
  const {
    state: {
      selectedModel,
      lightMode,
      appConfig,
    },
    dispatch
  } = useContext(HomeContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const [isTokenValid, setIsTokenValid] = useState(false)
  // const [isTokenValid, setIsTokenValid] = useState(!!validateToken() || false)
  // const userLoggedIn = sessionStorage && sessionStorage.getItem('IsUserLoggedIn') === 'true';
  const [userHasAccess, setUserHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    let intervalId: any = null;
    console.log('intervalId')
    const checkTokenValidity = () => {
      const valid = validateToken();
      setIsTokenValid(!!valid);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // When the page is visible, check token validity and start interval
        checkTokenValidity(); // Check immediately when the page becomes visible
        intervalId = setInterval(checkTokenValidity, 30000);
      } else {
        // Clear the interval when the page is not visible
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    };

    // Add visibility change event listener to document
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start the interval when the component mounts if the page is visible
    if (document.visibilityState === 'visible') {
      checkTokenValidity(); // Check immediately on mount
      intervalId = setInterval(checkTokenValidity, 30000);
    }

    // Clean up by removing event listener and clearing interval
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    const valid = validateToken();
    setIsTokenValid(!!valid);
    setUserLoggedIn(sessionStorage.getItem('IsUserLoggedIn') == 'true' ?? false);
  }, []);
  // useEffect( ()=> {
  //   console.log('sendChatRequest')
  //   const sendChatRequest = async () => {
  //     const queryId = uuidv4();
  //     const chatBody = {
  //         model: selectedModel || appConfig?.supportedModels[0].id,
  //         system: router?.query?.bot || 'nvhelp' as string,
  //         prompt: 'hello',
  //         sessionId: sessionStorage.getItem('sessionId'),
  //         userName: sessionStorage.getItem('user') || '',
  //         options: { temperature: 1 },
  //         queryId,
  //         attachment: null,
  //         dlCheck: true
  //     };
  //     const endpoint = getEndpoint({ service: 'chat' });

  //     // Create an AbortController instance
  //     const controller = new AbortController();
  //     const signal = controller.signal;

  //     // Set a timeout to abort the fetch request
  //     const timeoutId = setTimeout(() => {
  //         controller.abort();
  //     }, 1000); // 1000 milliseconds = 1 second

  //     try {
  //         const response = await fetch(`${window.location.origin}\\${endpoint}`, {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${getIdTokenFromSession()}`
  //             },
  //             body: JSON.stringify(chatBody),
  //             signal
  //         });

  //         clearTimeout(timeoutId); // Clear the timeout if the request completes in time

  //         if (!response.ok) {
  //             if (response.status === 403) {
  //                 const res = await response.json();
  //                 setLoading(false);
  //                 setUserHasAccess(false);
  //                 setErrorMessage(res?.error);
  //             }
  //         } else {
  //             setLoading(false);
  //             setUserHasAccess(true);
  //         }
  //     } catch (error) {
  //         if (error.name === 'AbortError') {
  //             console.log('Fetch aborted due to timeout');
  //         } else {
  //             console.log('Error fetching data:', error);
  //         }
  //         setLoading(false);
  //         setUserHasAccess(true); // Update based on your specific requirements
  //     }
  //   };


  //   appConfig?.botName && sendChatRequest()
  // }, [appConfig?.botName])

  console.log('userHasAccess', userHasAccess)
  console.log('userLoggedIn', userLoggedIn)
  console.log('isTokenValid', isTokenValid)
  console.log('loading', loading)

  useEffect(() => {
    console.log('sidebarOpen changed:', sidebarOpen);
  }, [sidebarOpen]);

  if (!userLoggedIn || !isTokenValid) {
    return <Login dispatch={dispatch}/>
  } else if (!userHasAccess && !loading) {
    return <ErrorPage message={errorMessage}/>
  } else {
    return (

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          // className={"sidebar-expanded"}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
          <div className="flex-grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {children}
          </div>
        </div>
      </div>);
  }
};

{/* <div className="fixed top-0 w-full sm:hidden">
            <Navbar
              selectedConversation={selectedConversation}
              onNewConversation={handleNewConversion}
            />
          </div>
          <div className="flex h-full w-full pt-[48px] sm:pt-0">
            {appConfig?.enableChatAndSettingsBar && <Chatbar />}
            <div className="flex flex-col flex-1 relative">
              <ChatHeader />
              <Chat stopConversationRef={stopConversationRef} />
            </div>
            {appConfig?.enablePromptBar && <Promptbar />}
          </div> */
}
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import DatadogInit from "@/components/Plugins/dataDogRumInit";
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

// import '@/styles/globals.css';
import { useEffect, useRef } from 'react';
import ThemeProvider from '@/utils/ThemeContext';

import '@/styles/style.css'
import { useCreateReducer } from '@/hooks/useCreateReducer';
import { HomeInitialState, initialState } from './api/home/home.state';
import HomeContext from './api/home/home.context';
import { Main } from '@/components/Plugins/Main';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'teal',
});

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  
  const containerRef = useRef(null);
  const queryClient = new QueryClient();
  console.log('_app');

  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  });
  
  return (
    <div className={inter.className}>
      <DatadogInit />
      <Toaster
        toastOptions={{
          style: {
            maxWidth: 500,
            wordBreak: 'break-all',
          },
        }}
      />
      <ThemeProvider>
       <MantineProvider theme={theme}>
      <HomeContext.Provider
      value={{
        ...contextValue,
        // handleNewConversation,
        // handleCreateFolder,
        // handleDeleteFolder,
        // handleUpdateFolder,
        // handleSelectConversation,
        // handleUpdateConversation,
      }}
    >
        <QueryClientProvider client={queryClient}>
       <Main
          containerRef={containerRef}
          // selectedConversation={selectedConversation}
          // handleNewConversation={handleNewConversation}
          // stopConversationRef={stopConversationRef}
          children={
          <Component {...pageProps} />
          }
        />
        </QueryClientProvider>
    </HomeContext.Provider>
         </MantineProvider>
      </ThemeProvider>
    </div>
  );
}



export default appWithTranslation(App);

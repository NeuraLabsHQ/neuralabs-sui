// frontend/src/App.jsx

import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/layout';
import FlowBuilderPage from './pages/flow_builder_page';
import DashboardPage from './pages/home_page';
import MarketplacePage from './pages/marketplace_page';
import ChatInterfacePage from './pages/chat_interface_page';
import AccessManagementPage from './pages/access_management_page';
import ZkLoginCallback from './components/auth/ZkLoginCallback';
import theme from './theme';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';
import { ZkLoginContextProvider } from './contexts/ZkLoginContext';
import { Buffer } from 'buffer';


// Required for SUI operations
window.Buffer = window.Buffer || Buffer;

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  devnet: { url: getFullnodeUrl('devnet') }, // Added for zkLogin testing
});

const queryClient = new QueryClient();

// Google OAuth Client ID - Replace with your actual client ID
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CREDENTIALS;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork={process.env.REACT_APP_SUI_NETWORK}>        
          <WalletProvider autoConnect={true} preferredWallets={['Slush']}>
          <ZkLoginContextProvider googleClientId={GOOGLE_CLIENT_ID}>
            <ChakraProvider theme={theme}>
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  } />
                  <Route path="/flow-builder" element={
                    <Layout>
                      <FlowBuilderPage />
                    </Layout>
                  } />
                  {/* Add route with agent_id parameter */}
                  <Route path="/flow-builder/:agentId" element={
                    <Layout>
                      <FlowBuilderPage />
                    </Layout>
                  } />
                  <Route path="/marketplace" element={
                    <Layout>
                      <MarketplacePage />
                    </Layout>
                  } />
                  <Route path="/chat" element={
                    <Layout>
                      <ChatInterfacePage />
                    </Layout>
                  } />
                  <Route path="/access-management" element={
                    <Layout>
                      <AccessManagementPage />
                    </Layout>
                  } />
                  {/* Add zkLogin callback route */}
                  <Route path="/auth/callback" element={<ZkLoginCallback />} />
                </Routes>
              </BrowserRouter>
            </ChakraProvider>
          </ZkLoginContextProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
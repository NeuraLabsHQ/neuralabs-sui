// frontend/src/components/common_components/CustomConnectButton/CustomConnectButton.jsx

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  useColorModeValue,
  Tooltip,
  useColorMode
} from '@chakra-ui/react';
import { 
  useCurrentAccount, 
  useCurrentWallet, 
  useDisconnectWallet
} from '@mysten/dapp-kit';
import sui_connected from '../../../assets/icons/sui_connected.svg';
import sui_light from '../../../assets/icons/sui_light_2.svg';
import sui_dark from '../../../assets/icons/sui_dark_2.svg';
import WalletMethodSelector from '../WalletMethodSelector/WalletMethodSelector';
import { useZkLogin } from '../../../contexts/ZkLoginContext';
import * as WalletAuth from '../../../components/auth/WalletSignatureService';

const CustomConnectButton = ({ 
  iconColor, 
  hoverBgColor, 
  viewOnlyMode = false
}) => {
  // Use dApp Kit hooks
  const currentAccount = useCurrentAccount();
  const { wallet } = useCurrentWallet();
  const { mutate: disconnect, isPending: disconnecting } = useDisconnectWallet();
  
  
  // Use zkLogin hook
  const { isAuthenticated: isZkLoggedIn, zkLoginAddress, logout: zkLogout } = useZkLogin();
  
  // Get color mode (light/dark)
  const { colorMode } = useColorMode();
  
  // State for modals
  const [methodSelectorOpen, setMethodSelectorOpen] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  // Check if any wallet is connected (either dapp-kit or zkLogin)
  const connected = !!currentAccount || isZkLoggedIn;
  
  // Get appropriate wallet address
  const walletAddress = currentAccount?.address || zkLoginAddress || '';
  
  // Handle wallet action
  const handleWalletAction = async () => {
    if (connected) {
      // Disconnect appropriate wallet
      setIsDisconnecting(true);
      
      try {
        if (currentAccount) {
          // Disconnect dapp-kit wallet
          await disconnect();
          await WalletAuth.logout();
 
        } else if (isZkLoggedIn) {
          // Disconnect zkLogin
          zkLogout();
        }
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
      } finally {
        setIsDisconnecting(false);
      }
    } else {
      // Open the wallet method selector
      setMethodSelectorOpen(true);
    }
  };
  
  // Format wallet address for tooltip
  const formattedAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
    : '';
    
  // Set wallet tooltip text
  const walletTooltip = connected 
    ? isZkLoggedIn 
      ? `Connected: zkLogin (${formattedAddress})` 
      : `Connected: ${wallet?.name || 'Wallet'} (${formattedAddress})` 
    : "Connect Wallet";
  
  // Determine which icon to show based on connection state and color mode
  const getWalletIcon = () => {
    if (connected) {
      return sui_connected;
    } else {
      return colorMode === 'light' ? sui_light : sui_dark;
    }
  };
  
  // Button styles
  const buttonStyles = {
    w: "100%",
    h: "56px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: 0,
    bg: "transparent", 
    color: iconColor,
    _hover: { 
      bg: hoverBgColor,
      cursor: viewOnlyMode ? "not-allowed" : "pointer"
    }
  };

  return (
    <>
      <Tooltip 
        label={walletTooltip}
        placement="right" 
        bg={useColorModeValue("gray.900", "gray.900")} 
        hasArrow
      >
        <Button 
          {...buttonStyles}
          onClick={handleWalletAction}
          aria-label={connected ? "Disconnect Wallet" : "Connect Wallet"}
          disabled={viewOnlyMode || isDisconnecting}
        >
          {isDisconnecting ? (
            <Box 
              position="relative" 
              w="24px" 
              h="24px" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
            >
              <Box 
                position="absolute"
                border="2px solid"
                borderColor={iconColor}
                borderRadius="full"
                width="24px"
                height="24px"
                borderBottomColor="transparent"
                animation="spin 1s linear infinite"
              />
            </Box>
          ) : (
            <img src={getWalletIcon()} alt="Wallet Icon" width="25px" height="25px" />
          )}
          
          {connected && (
            <Box 
              position="absolute"
              bottom="12px"
              right="12px"
              w="8px"
              h="8px"
              bg="green.400"
              borderRadius="full"
            />
          )}
        </Button>
      </Tooltip>
      
      {/* Our custom wallet method selector */}
      <WalletMethodSelector
        isOpen={methodSelectorOpen}
        onClose={() => setMethodSelectorOpen(false)}
      />
    </>
  );
};

export default CustomConnectButton;
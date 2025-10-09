/**
 * React Provider and Hooks for FHEVM
 * Wagmi-like structure for React applications
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { BrowserProvider } from "ethers";
import { FhevmClient } from "./client";
import type { FhevmClientConfig, FhevmContextValue } from "./types";

const FhevmContext = createContext<FhevmContextValue | null>(null);

export interface FhevmProviderProps {
  config: FhevmClientConfig;
  children: ReactNode;
}

/**
 * FhevmProvider - React context provider for FHEVM functionality
 * Similar to WagmiConfig provider
 */
export const FhevmProvider: React.FC<FhevmProviderProps> = ({ config, children }) => {
  const [client] = useState(() => new FhevmClient(config));
  const [isInitialized, setIsInitialized] = useState(false);

  const initialize = useCallback(
    async (provider: BrowserProvider) => {
      if (!isInitialized) {
        await client.initialize(provider);
        setIsInitialized(true);
      }
    },
    [client, isInitialized]
  );

  const encrypt = useCallback(
    async (value: any, type: string, contractAddress: string) => {
      switch (type) {
        case "uint32":
          return client.encryptU32(value, contractAddress);
        case "uint64":
          return client.encryptU64(value, contractAddress);
        case "bool":
          return client.encryptBool(value, contractAddress);
        default:
          throw new Error(`Unsupported encryption type: ${type}`);
      }
    },
    [client]
  );

  const decrypt = useCallback(
    async (contractAddress: string, handle: bigint, options = {}) => {
      if (options.usePublicDecrypt) {
        return client.publicDecrypt(contractAddress, handle);
      }
      return client.userDecrypt(contractAddress, handle);
    },
    [client]
  );

  const value: FhevmContextValue = {
    client,
    isInitialized,
    initialize,
    encrypt,
    decrypt,
  };

  return <FhevmContext.Provider value={value}>{children}</FhevmContext.Provider>;
};

/**
 * useFhevmClient - Hook to access FHEVM client
 * Similar to useClient from wagmi
 */
export const useFhevmClient = () => {
  const context = useContext(FhevmContext);
  if (!context) {
    throw new Error("useFhevmClient must be used within FhevmProvider");
  }
  return context;
};

/**
 * useFhevmSigner - Hook to get signer functionality
 * Similar to useSigner from wagmi
 */
export const useFhevmSigner = () => {
  const context = useContext(FhevmContext);
  if (!context) {
    throw new Error("useFhevmSigner must be used within FhevmProvider");
  }

  return {
    setSigner: (signer: any) => context.client.setSigner(signer),
    getSigner: () => context.client.getSigner(),
  };
};

/**
 * useEncrypt - Hook for encrypting values
 */
export const useEncrypt = () => {
  const { encrypt, client } = useFhevmClient();

  return {
    encryptU32: (value: number, contractAddress: string) =>
      encrypt(value, "uint32", contractAddress),
    encryptU64: (value: bigint, contractAddress: string) =>
      encrypt(value, "uint64", contractAddress),
    encryptBool: (value: boolean, contractAddress: string) =>
      encrypt(value, "bool", contractAddress),
  };
};

/**
 * useDecrypt - Hook for decrypting values
 */
export const useDecrypt = () => {
  const { decrypt } = useFhevmClient();

  return {
    userDecrypt: (contractAddress: string, handle: bigint) =>
      decrypt(contractAddress, handle, { usePublicDecrypt: false }),
    publicDecrypt: (contractAddress: string, handle: bigint) =>
      decrypt(contractAddress, handle, { usePublicDecrypt: true }),
  };
};

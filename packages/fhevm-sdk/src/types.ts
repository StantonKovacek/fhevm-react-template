/**
 * Type definitions for FHEVM SDK
 */

export interface FhevmClientConfig {
  networkUrl?: string;
  gatewayUrl: string;
  aclAddress: string;
  kmsVerifierAddress: string;
}

export interface EncryptionResult {
  handles: Uint8Array[];
  inputProof: string;
}

export interface DecryptionOptions {
  usePublicDecrypt?: boolean;
}

export interface ContractConfig {
  address: string;
  abi: any[];
}

export type EncryptedValue = Uint8Array;

export interface FhevmContextValue {
  client: any;
  isInitialized: boolean;
  initialize: (provider: any) => Promise<void>;
  encrypt: (value: any, type: string, contractAddress: string) => Promise<EncryptionResult>;
  decrypt: (contractAddress: string, handle: bigint, options?: DecryptionOptions) => Promise<bigint>;
}

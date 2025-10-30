/**
 * FHE-related TypeScript type definitions
 */

export type EncryptionType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'bool';

export type DecryptionMethod = 'user' | 'public';

export interface EncryptedValue {
  handle: bigint;
  inputProof: string;
  type: EncryptionType;
}

export interface DecryptedValue {
  value: bigint | boolean;
  timestamp: number;
}

export interface FHEError {
  code: string;
  message: string;
  details?: any;
}

export interface FHEClientStatus {
  isInitialized: boolean;
  networkId?: number;
  gatewayUrl?: string;
}

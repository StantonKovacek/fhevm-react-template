/**
 * Type definitions for FHE operations
 */

export interface EncryptionResult {
  handles: bigint[];
  inputProof: string;
}

export interface DecryptionResult {
  value: bigint;
  timestamp: number;
}

export type EncryptionType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool';

export type DecryptionMethod = 'user' | 'public';

export interface FHEOperation {
  type: 'encrypt' | 'decrypt';
  status: 'pending' | 'success' | 'error';
  result?: any;
  error?: string;
  timestamp: number;
}

export interface FHEConfig {
  gatewayUrl: string;
  aclAddress: string;
  kmsVerifierAddress: string;
}

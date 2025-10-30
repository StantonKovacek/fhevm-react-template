/**
 * API type definitions
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface EncryptionRequest {
  value: any;
  type: string;
  contractAddress: string;
}

export interface EncryptionResponse {
  handles: string[];
  inputProof: string;
}

export interface DecryptionRequest {
  contractAddress: string;
  handle: string;
  method: 'user' | 'public';
}

export interface DecryptionResponse {
  value: string;
  timestamp: number;
}

export interface ComputationRequest {
  operation: string;
  handleA: string;
  handleB: string;
}

export interface ComputationResponse {
  resultHandle: string;
  operation: string;
}

/**
 * Custom hook for FHE operations
 * Provides a convenient interface for encryption and decryption
 */

import { useState, useCallback } from 'react';
import { useFhevmClient, useEncrypt as useSdkEncrypt, useDecrypt as useSdkDecrypt } from '@fhevm-toolkit/sdk/react';
import type { EncryptionType, DecryptionMethod } from '../lib/fhe/types';

export function useFHE() {
  const { isInitialized, initialize } = useFhevmClient();
  const { encryptU32, encryptU64, encryptBool } = useSdkEncrypt();
  const { userDecrypt, publicDecrypt } = useSdkDecrypt();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encrypt = useCallback(
    async (value: any, type: EncryptionType, contractAddress: string) => {
      setIsProcessing(true);
      setError(null);

      try {
        let result;

        switch (type) {
          case 'uint32':
            result = await encryptU32(Number(value), contractAddress);
            break;
          case 'uint64':
            result = await encryptU64(BigInt(value), contractAddress);
            break;
          case 'bool':
            result = await encryptBool(value === 'true' || value === true, contractAddress);
            break;
          default:
            throw new Error(`Unsupported encryption type: ${type}`);
        }

        return result;
      } catch (err: any) {
        setError(err.message || 'Encryption failed');
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [encryptU32, encryptU64, encryptBool]
  );

  const decrypt = useCallback(
    async (contractAddress: string, handle: bigint, method: DecryptionMethod = 'user') => {
      setIsProcessing(true);
      setError(null);

      try {
        const result = method === 'user'
          ? await userDecrypt(contractAddress, handle)
          : await publicDecrypt(contractAddress, handle);

        return result;
      } catch (err: any) {
        setError(err.message || 'Decryption failed');
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [userDecrypt, publicDecrypt]
  );

  return {
    isInitialized,
    isProcessing,
    error,
    encrypt,
    decrypt,
    initialize,
  };
}

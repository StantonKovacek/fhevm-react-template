/**
 * Hook specifically for encryption operations
 */

import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm-toolkit/sdk/react';
import { validateEncryptionInput, validateContractAddress } from '../lib/utils/validation';

export function useEncryption() {
  const { encryptU32, encryptU64, encryptBool } = useEncrypt();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const encryptValue = useCallback(
    async (value: any, type: 'uint32' | 'uint64' | 'bool', contractAddress: string) => {
      setIsEncrypting(true);
      setError(null);
      setResult(null);

      // Validate contract address
      const addressValidation = validateContractAddress(contractAddress);
      if (!addressValidation.isValid) {
        setError(addressValidation.error || 'Invalid address');
        setIsEncrypting(false);
        return null;
      }

      // Validate input value
      const inputValidation = validateEncryptionInput(value, type);
      if (!inputValidation.isValid) {
        setError(inputValidation.error || 'Invalid input');
        setIsEncrypting(false);
        return null;
      }

      try {
        let encrypted;

        switch (type) {
          case 'uint32':
            encrypted = await encryptU32(Number(value), contractAddress);
            break;
          case 'uint64':
            encrypted = await encryptU64(BigInt(value), contractAddress);
            break;
          case 'bool':
            const boolValue = String(value).toLowerCase() === 'true';
            encrypted = await encryptBool(boolValue, contractAddress);
            break;
          default:
            throw new Error('Unsupported encryption type');
        }

        setResult(encrypted);
        return encrypted;
      } catch (err: any) {
        setError(err.message || 'Encryption failed');
        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [encryptU32, encryptU64, encryptBool]
  );

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
  }, []);

  return {
    encryptValue,
    isEncrypting,
    error,
    result,
    reset,
  };
}

/**
 * Validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEncryptionInput(
  value: any,
  type: 'uint32' | 'uint64' | 'bool'
): ValidationResult {
  switch (type) {
    case 'uint32':
      const uint32Val = Number(value);
      if (isNaN(uint32Val)) {
        return { isValid: false, error: 'Value must be a number' };
      }
      if (uint32Val < 0 || uint32Val > 4294967295) {
        return { isValid: false, error: 'Value must be between 0 and 4,294,967,295' };
      }
      return { isValid: true };

    case 'uint64':
      try {
        const uint64Val = BigInt(value);
        if (uint64Val < 0n) {
          return { isValid: false, error: 'Value must be positive' };
        }
        return { isValid: true };
      } catch {
        return { isValid: false, error: 'Invalid number format' };
      }

    case 'bool':
      const boolVal = String(value).toLowerCase();
      if (boolVal !== 'true' && boolVal !== 'false') {
        return { isValid: false, error: 'Value must be "true" or "false"' };
      }
      return { isValid: true };

    default:
      return { isValid: false, error: 'Unknown encryption type' };
  }
}

export function validateContractAddress(address: string): ValidationResult {
  if (!address) {
    return { isValid: false, error: 'Contract address is required' };
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { isValid: false, error: 'Invalid Ethereum address format' };
  }
  if (address === '0x0000000000000000000000000000000000000000') {
    return { isValid: false, error: 'Cannot use zero address' };
  }
  return { isValid: true };
}

/**
 * Security utilities for FHE operations
 */

export function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[^\w\s.-]/gi, '');
}

export function isValidHandle(handle: string): boolean {
  try {
    BigInt(handle);
    return true;
  } catch {
    return false;
  }
}

export function validateUint32(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= 4294967295;
}

export function validateUint64(value: bigint): boolean {
  return value >= 0n && value <= 18446744073709551615n;
}

export class SecurityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SecurityError';
  }
}

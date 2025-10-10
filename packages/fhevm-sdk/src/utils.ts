/**
 * Utility functions for FHEVM SDK
 */

/**
 * Convert handle to hex string
 */
export function handleToHex(handle: bigint): string {
  return `0x${handle.toString(16)}`;
}

/**
 * Convert hex string to handle
 */
export function hexToHandle(hex: string): bigint {
  return BigInt(hex);
}

/**
 * Format encrypted value for display
 */
export function formatEncryptedValue(value: Uint8Array): string {
  return `0x${Array.from(value)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")}`;
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate chain ID
 */
export function isValidChainId(chainId: number): boolean {
  return chainId > 0 && Number.isInteger(chainId);
}

/**
 * Get network name from chain ID
 */
export function getNetworkName(chainId: number): string {
  const networks: Record<number, string> = {
    1: "mainnet",
    5: "goerli",
    11155111: "sepolia",
    8009: "zama-devnet",
    31337: "localhost",
  };
  return networks[chainId] || `unknown-${chainId}`;
}

/**
 * Sleep utility for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry logic for async operations
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const { retries = 3, delay = 1000, onRetry } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < retries) {
        if (onRetry) {
          onRetry(lastError, attempt + 1);
        }
        await sleep(delay * (attempt + 1));
      }
    }
  }

  throw lastError!;
}

/**
 * Format wei to ether
 */
export function formatEther(wei: bigint, decimals: number = 4): string {
  const etherValue = Number(wei) / 1e18;
  return etherValue.toFixed(decimals);
}

/**
 * Parse ether to wei
 */
export function parseEther(ether: string): bigint {
  const value = parseFloat(ether);
  return BigInt(Math.floor(value * 1e18));
}

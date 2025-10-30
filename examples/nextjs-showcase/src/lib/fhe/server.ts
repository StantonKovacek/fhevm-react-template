/**
 * Server-side FHE operations
 * These functions run on the server and handle FHE operations
 * that require server-side processing
 */

import { FhevmClient } from '@fhevm-toolkit/sdk';
import type { JsonRpcProvider } from 'ethers';

/**
 * Initialize FHE client on server
 */
export async function initializeServerFHE(provider: JsonRpcProvider) {
  const config = {
    gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://gateway.zama.ai',
    aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS || '0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92',
    kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS || '0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04',
  };

  const client = new FhevmClient(config);
  await client.initialize(provider);
  return client;
}

/**
 * Perform server-side encryption
 */
export async function serverEncrypt(
  client: FhevmClient,
  value: number | bigint | boolean,
  type: 'uint32' | 'uint64' | 'bool',
  contractAddress: string
) {
  switch (type) {
    case 'uint32':
      return await client.encryptU32(Number(value), contractAddress);
    case 'uint64':
      return await client.encryptU64(BigInt(value), contractAddress);
    case 'bool':
      return await client.encryptBool(Boolean(value), contractAddress);
    default:
      throw new Error(`Unsupported encryption type: ${type}`);
  }
}

/**
 * Perform server-side public decryption
 */
export async function serverPublicDecrypt(
  client: FhevmClient,
  contractAddress: string,
  handle: bigint
) {
  return await client.publicDecrypt(contractAddress, handle);
}

/**
 * Batch encryption on server
 */
export async function serverBatchEncrypt(
  client: FhevmClient,
  values: Array<{ value: any; type: 'uint32' | 'uint64' | 'bool' }>,
  contractAddress: string
) {
  const results = [];
  for (const { value, type } of values) {
    const encrypted = await serverEncrypt(client, value, type, contractAddress);
    results.push(encrypted);
  }
  return results;
}

/**
 * Validate server-side FHE operation
 */
export function validateServerOperation(operation: string): boolean {
  const allowedOperations = ['encrypt', 'decrypt', 'compute'];
  return allowedOperations.includes(operation);
}

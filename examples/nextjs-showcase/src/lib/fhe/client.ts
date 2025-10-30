/**
 * Client-side FHE operations
 * Wraps the SDK for easy use in components
 */

import { FhevmClient } from '@fhevm-toolkit/sdk';
import type { BrowserProvider } from 'ethers';

export class FHEClientWrapper {
  private client: FhevmClient | null = null;
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  async initialize(provider: BrowserProvider) {
    if (!this.client) {
      this.client = new FhevmClient(this.config);
      await this.client.initialize(provider);
    }
    return this.client;
  }

  getClient(): FhevmClient {
    if (!this.client) {
      throw new Error('FHE client not initialized');
    }
    return this.client;
  }

  isInitialized(): boolean {
    return this.client !== null;
  }
}

// Default configuration
export const defaultFHEConfig = {
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://gateway.zama.ai',
  aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS || '0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92',
  kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS || '0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04',
};

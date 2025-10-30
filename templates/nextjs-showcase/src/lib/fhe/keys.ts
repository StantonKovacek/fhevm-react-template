/**
 * Key management utilities for FHE
 */

export interface KeyPair {
  publicKey: string;
  privateKey?: string;
}

export class KeyManager {
  private static instance: KeyManager;
  private keys: Map<string, KeyPair> = new Map();

  private constructor() {}

  static getInstance(): KeyManager {
    if (!KeyManager.instance) {
      KeyManager.instance = new KeyManager();
    }
    return KeyManager.instance;
  }

  storeKey(identifier: string, keyPair: KeyPair): void {
    this.keys.set(identifier, keyPair);
  }

  getKey(identifier: string): KeyPair | undefined {
    return this.keys.get(identifier);
  }

  hasKey(identifier: string): boolean {
    return this.keys.has(identifier);
  }

  clearKeys(): void {
    this.keys.clear();
  }
}

export const keyManager = KeyManager.getInstance();

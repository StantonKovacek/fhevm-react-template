/**
 * FhevmClient - Core client for FHEVM operations
 * Framework-agnostic implementation
 */

import { createInstance, FhevmInstance } from "fhevmjs";
import { BrowserProvider, JsonRpcProvider, Signer } from "ethers";
import type { FhevmClientConfig, EncryptionResult } from "./types";

export class FhevmClient {
  private instance: FhevmInstance | null = null;
  private provider: BrowserProvider | JsonRpcProvider | null = null;
  private signer: Signer | null = null;
  private config: FhevmClientConfig;

  constructor(config: FhevmClientConfig) {
    this.config = config;
  }

  /**
   * Initialize the FHEVM instance
   */
  async initialize(provider: BrowserProvider | JsonRpcProvider): Promise<void> {
    this.provider = provider;

    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);

    this.instance = await createInstance({
      chainId,
      networkUrl: this.config.networkUrl || (await provider._getConnection()).url,
      gatewayUrl: this.config.gatewayUrl,
      aclAddress: this.config.aclAddress,
      kmsVerifierAddress: this.config.kmsVerifierAddress,
    });

    console.log("✅ FHEVM Client initialized for chain:", chainId);
  }

  /**
   * Set the signer for transactions
   */
  setSigner(signer: Signer): void {
    this.signer = signer;
  }

  /**
   * Get the FHEVM instance
   */
  getInstance(): FhevmInstance {
    if (!this.instance) {
      throw new Error("FHEVM instance not initialized. Call initialize() first.");
    }
    return this.instance;
  }

  /**
   * Get the provider
   */
  getProvider(): BrowserProvider | JsonRpcProvider {
    if (!this.provider) {
      throw new Error("Provider not set. Call initialize() first.");
    }
    return this.provider;
  }

  /**
   * Get the signer
   */
  getSigner(): Signer {
    if (!this.signer) {
      throw new Error("Signer not set. Call setSigner() first.");
    }
    return this.signer;
  }

  /**
   * Encrypt a 32-bit unsigned integer
   */
  async encryptU32(value: number, contractAddress: string): Promise<EncryptionResult> {
    const instance = this.getInstance();
    const input = instance.createEncryptedInput(contractAddress, await this.getSigner().getAddress());
    input.add32(value);
    return input.encrypt();
  }

  /**
   * Encrypt a 64-bit unsigned integer
   */
  async encryptU64(value: bigint, contractAddress: string): Promise<EncryptionResult> {
    const instance = this.getInstance();
    const input = instance.createEncryptedInput(contractAddress, await this.getSigner().getAddress());
    input.add64(value);
    return input.encrypt();
  }

  /**
   * Encrypt a boolean value
   */
  async encryptBool(value: boolean, contractAddress: string): Promise<EncryptionResult> {
    const instance = this.getInstance();
    const input = instance.createEncryptedInput(contractAddress, await this.getSigner().getAddress());
    input.addBool(value);
    return input.encrypt();
  }

  /**
   * Decrypt data using user's private key (EIP-712 signature)
   */
  async userDecrypt(
    contractAddress: string,
    handle: bigint
  ): Promise<bigint> {
    const instance = this.getInstance();
    const signer = this.getSigner();

    // Generate EIP-712 signature for decryption
    const { signature } = await instance.generateToken({
      verifyingContract: contractAddress,
    });

    const signedSignature = await signer.signTypedData(
      signature.domain,
      { Reencrypt: signature.types.Reencrypt },
      signature.message
    );

    // Request decryption from KMS
    const decrypted = await instance.reencrypt(
      handle,
      signature.privateKey,
      signedSignature,
      contractAddress,
      await signer.getAddress()
    );

    return decrypted;
  }

  /**
   * Public decrypt (no signature required)
   */
  async publicDecrypt(
    contractAddress: string,
    handle: bigint
  ): Promise<bigint> {
    const instance = this.getInstance();

    const decrypted = await instance.decrypt(
      contractAddress,
      handle
    );

    return decrypted;
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.instance !== null;
  }

  /**
   * Get configuration
   */
  getConfig(): FhevmClientConfig {
    return this.config;
  }
}

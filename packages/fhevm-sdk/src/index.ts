/**
 * @fhevm-toolkit/sdk
 * Universal FHEVM SDK for building confidential dApps
 * Framework-agnostic core functionality
 */

export { FhevmClient } from "./client";
export { encrypt, decrypt, createEncryptedInput } from "./encryption";
export { FhevmProvider, useFhevmClient, useFhevmSigner } from "./provider";
export * from "./types";
export * from "./utils";

// Re-export commonly used types from fhevmjs
export type { FhevmInstance } from "fhevmjs";

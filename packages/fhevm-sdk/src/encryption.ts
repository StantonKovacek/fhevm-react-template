/**
 * Encryption utilities for FHEVM
 * Framework-agnostic helper functions
 */

import { FhevmInstance } from "fhevmjs";
import type { EncryptionResult } from "./types";

/**
 * Encrypt a value using FHEVM instance
 */
export async function encrypt(
  instance: FhevmInstance,
  value: number | bigint | boolean,
  type: "uint32" | "uint64" | "bool",
  contractAddress: string,
  userAddress: string
): Promise<EncryptionResult> {
  const input = instance.createEncryptedInput(contractAddress, userAddress);

  switch (type) {
    case "uint32":
      input.add32(Number(value));
      break;
    case "uint64":
      input.add64(BigInt(value));
      break;
    case "bool":
      input.addBool(Boolean(value));
      break;
    default:
      throw new Error(`Unsupported type: ${type}`);
  }

  return input.encrypt();
}

/**
 * Decrypt encrypted data (user decrypt with signature)
 */
export async function decrypt(
  instance: FhevmInstance,
  contractAddress: string,
  handle: bigint,
  signer: any
): Promise<bigint> {
  const { signature } = await instance.generateToken({
    verifyingContract: contractAddress,
  });

  const signedSignature = await signer.signTypedData(
    signature.domain,
    { Reencrypt: signature.types.Reencrypt },
    signature.message
  );

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
 * Create an encrypted input builder
 */
export function createEncryptedInput(
  instance: FhevmInstance,
  contractAddress: string,
  userAddress: string
) {
  return instance.createEncryptedInput(contractAddress, userAddress);
}

/**
 * Batch encrypt multiple values
 */
export async function batchEncrypt(
  instance: FhevmInstance,
  values: Array<{ value: any; type: "uint32" | "uint64" | "bool" }>,
  contractAddress: string,
  userAddress: string
): Promise<EncryptionResult> {
  const input = instance.createEncryptedInput(contractAddress, userAddress);

  for (const { value, type } of values) {
    switch (type) {
      case "uint32":
        input.add32(Number(value));
        break;
      case "uint64":
        input.add64(BigInt(value));
        break;
      case "bool":
        input.addBool(Boolean(value));
        break;
    }
  }

  return input.encrypt();
}

# TypeScript Types Reference

Complete TypeScript type definitions for the FHEVM Toolkit SDK.

## Table of Contents

- [Configuration Types](#configuration-types)
- [Encryption Types](#encryption-types)
- [Client Types](#client-types)
- [React Hook Types](#react-hook-types)
- [Utility Types](#utility-types)
- [Provider Types](#provider-types)

---

## Configuration Types

### `FhevmConfig`

Main configuration object for FHEVM client initialization.

```typescript
interface FhevmConfig {
  /**
   * URL of the Zama gateway service
   * @example "https://gateway.zama.ai"
   */
  gatewayUrl: string;

  /**
   * Address of the ACL (Access Control List) contract
   * @example "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92"
   */
  aclAddress: string;

  /**
   * Address of the KMS verifier contract
   * @example "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04"
   */
  kmsVerifierAddress: string;
}
```

**Usage:**
```typescript
const config: FhevmConfig = {
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL!,
  aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS!,
  kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS!,
};
```

---

## Encryption Types

### `EncryptionResult`

Result object returned from encryption operations.

```typescript
interface EncryptionResult {
  /**
   * Array of encrypted handles
   * Each handle is a unique identifier for the encrypted value
   */
  handles: bigint[];

  /**
   * Cryptographic proof that the encryption was performed correctly
   * Used by smart contracts to verify the encryption
   */
  inputProof: string;
}
```

**Usage:**
```typescript
const result: EncryptionResult = await encryptU32(42, contractAddress);

// Use in contract call
await contract.submitEncrypted(
  result.handles[0],
  result.inputProof
);
```

---

### `EncryptedValue`

Generic type for encrypted values.

```typescript
type EncryptedValue = bigint;
```

---

### `EncryptionType`

Supported encryption data types.

```typescript
type EncryptionType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool';
```

**Value Ranges:**

| Type | Range | TypeScript Type |
|------|-------|-----------------|
| `uint8` | 0 to 255 | `number` |
| `uint16` | 0 to 65,535 | `number` |
| `uint32` | 0 to 4,294,967,295 | `number` |
| `uint64` | 0 to 18,446,744,073,709,551,615 | `bigint` |
| `bool` | true or false | `boolean` |

---

## Client Types

### `FhevmClient`

Main client class type definition.

```typescript
class FhevmClient {
  constructor(config: FhevmConfig);

  /**
   * Initialize the client with an Ethereum provider
   */
  initialize(provider: BrowserProvider | JsonRpcProvider): Promise<void>;

  /**
   * Set the signer for transaction signing
   */
  setSigner(signer: Signer): void;

  /**
   * Get the current provider
   */
  getProvider(): BrowserProvider | JsonRpcProvider | null;

  /**
   * Get the current signer
   */
  getSigner(): Signer | null;

  /**
   * Encrypt an unsigned 8-bit integer
   */
  encryptU8(value: number, contractAddress: string): Promise<EncryptionResult>;

  /**
   * Encrypt an unsigned 16-bit integer
   */
  encryptU16(value: number, contractAddress: string): Promise<EncryptionResult>;

  /**
   * Encrypt an unsigned 32-bit integer
   */
  encryptU32(value: number, contractAddress: string): Promise<EncryptionResult>;

  /**
   * Encrypt an unsigned 64-bit integer
   */
  encryptU64(value: bigint, contractAddress: string): Promise<EncryptionResult>;

  /**
   * Encrypt a boolean value
   */
  encryptBool(value: boolean, contractAddress: string): Promise<EncryptionResult>;

  /**
   * Decrypt data with user signature (EIP-712)
   */
  userDecrypt(contractAddress: string, handle: bigint): Promise<bigint>;

  /**
   * Decrypt publicly available data
   */
  publicDecrypt(contractAddress: string, handle: bigint): Promise<bigint>;
}
```

---

## React Hook Types

### `useFhevmClient` Return Type

```typescript
interface UseFhevmClientReturn {
  /**
   * The FHEVM client instance
   */
  client: FhevmClient;

  /**
   * Whether the client has been initialized
   */
  isInitialized: boolean;

  /**
   * Initialize the client with a provider
   */
  initialize: (provider: BrowserProvider | JsonRpcProvider) => Promise<void>;
}
```

**Usage:**
```typescript
const { client, isInitialized, initialize }: UseFhevmClientReturn = useFhevmClient();
```

---

### `useEncrypt` Return Type

```typescript
interface UseEncryptReturn {
  /**
   * Encrypt an unsigned 8-bit integer
   */
  encryptU8: (value: number, contractAddress: string) => Promise<EncryptionResult>;

  /**
   * Encrypt an unsigned 16-bit integer
   */
  encryptU16: (value: number, contractAddress: string) => Promise<EncryptionResult>;

  /**
   * Encrypt an unsigned 32-bit integer
   */
  encryptU32: (value: number, contractAddress: string) => Promise<EncryptionResult>;

  /**
   * Encrypt an unsigned 64-bit integer
   */
  encryptU64: (value: bigint, contractAddress: string) => Promise<EncryptionResult>;

  /**
   * Encrypt a boolean value
   */
  encryptBool: (value: boolean, contractAddress: string) => Promise<EncryptionResult>;
}
```

**Usage:**
```typescript
const { encryptU32, encryptU64, encryptBool }: UseEncryptReturn = useEncrypt();
```

---

### `useDecrypt` Return Type

```typescript
interface UseDecryptReturn {
  /**
   * Decrypt data with user signature (EIP-712)
   * Requires signer to be set and user permission
   */
  userDecrypt: (contractAddress: string, handle: bigint) => Promise<bigint>;

  /**
   * Decrypt publicly available data
   * No signature required
   */
  publicDecrypt: (contractAddress: string, handle: bigint) => Promise<bigint>;
}
```

**Usage:**
```typescript
const { userDecrypt, publicDecrypt }: UseDecryptReturn = useDecrypt();
```

---

### `useFhevmSigner` Return Type

```typescript
interface UseFhevmSignerReturn {
  /**
   * Current signer instance
   */
  signer: Signer | null;

  /**
   * Set a new signer
   */
  setSigner: (signer: Signer) => void;
}
```

**Usage:**
```typescript
const { signer, setSigner }: UseFhevmSignerReturn = useFhevmSigner();
```

---

## Provider Types

### `FhevmProviderProps`

Props for the FhevmProvider component.

```typescript
interface FhevmProviderProps {
  /**
   * FHEVM configuration object
   */
  config: FhevmConfig;

  /**
   * Child components to wrap
   */
  children: React.ReactNode;
}
```

**Usage:**
```tsx
const props: FhevmProviderProps = {
  config: {
    gatewayUrl: "https://gateway.zama.ai",
    aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
    kmsVerifierAddress: "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
  },
  children: <App />,
};

<FhevmProvider {...props} />
```

---

### `FhevmContextValue`

Context value provided by FhevmProvider.

```typescript
interface FhevmContextValue {
  /**
   * The FHEVM client instance
   */
  client: FhevmClient;

  /**
   * Whether the client is initialized
   */
  isInitialized: boolean;

  /**
   * Initialize the client
   */
  initialize: (provider: BrowserProvider | JsonRpcProvider) => Promise<void>;
}
```

---

## Utility Types

### `ContractAddress`

Type alias for contract addresses.

```typescript
type ContractAddress = string;
```

**Validation:**
```typescript
function isValidAddress(address: ContractAddress): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
```

---

### `EncryptedHandle`

Type alias for encrypted handles.

```typescript
type EncryptedHandle = bigint;
```

---

### `InputProof`

Type alias for input proofs.

```typescript
type InputProof = string;
```

---

## ethers.js Types

The SDK uses ethers.js v6 types. Import from ethers:

```typescript
import {
  BrowserProvider,
  JsonRpcProvider,
  Signer,
  Contract,
  parseEther,
  formatEther,
} from "ethers";
```

### `BrowserProvider`

Browser-based provider (MetaMask, etc.).

```typescript
const provider = new BrowserProvider(window.ethereum);
```

### `JsonRpcProvider`

RPC endpoint provider.

```typescript
const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY");
```

### `Signer`

Transaction signer interface.

```typescript
const signer = await provider.getSigner();
```

---

## Type Guards

### `isEncryptionResult`

Check if an object is an EncryptionResult.

```typescript
function isEncryptionResult(obj: any): obj is EncryptionResult {
  return (
    obj &&
    typeof obj === "object" &&
    Array.isArray(obj.handles) &&
    typeof obj.inputProof === "string"
  );
}
```

**Usage:**
```typescript
if (isEncryptionResult(result)) {
  console.log(result.handles[0]);
}
```

---

### `isFhevmConfig`

Check if an object is a valid FhevmConfig.

```typescript
function isFhevmConfig(obj: any): obj is FhevmConfig {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.gatewayUrl === "string" &&
    typeof obj.aclAddress === "string" &&
    typeof obj.kmsVerifierAddress === "string"
  );
}
```

---

## Generic Types

### `AsyncFunction`

Type for async functions.

```typescript
type AsyncFunction<T = void> = (...args: any[]) => Promise<T>;
```

---

### `EncryptFunction`

Generic type for encryption functions.

```typescript
type EncryptFunction<T> = (
  value: T,
  contractAddress: string
) => Promise<EncryptionResult>;
```

**Usage:**
```typescript
const encryptNumber: EncryptFunction<number> = encryptU32;
const encryptBigInt: EncryptFunction<bigint> = encryptU64;
const encryptBoolean: EncryptFunction<boolean> = encryptBool;
```

---

### `DecryptFunction`

Generic type for decryption functions.

```typescript
type DecryptFunction = (
  contractAddress: string,
  handle: bigint
) => Promise<bigint>;
```

---

## Full Type Example

Complete TypeScript example using all types:

```typescript
import { FhevmClient, FhevmConfig, EncryptionResult } from "@fhevm-toolkit/sdk";
import { BrowserProvider, Signer } from "ethers";

// Configuration
const config: FhevmConfig = {
  gatewayUrl: "https://gateway.zama.ai",
  aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
  kmsVerifierAddress: "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
};

// Client initialization
const client: FhevmClient = new FhevmClient(config);

async function example() {
  // Provider setup
  const provider: BrowserProvider = new BrowserProvider(window.ethereum);
  await client.initialize(provider);

  // Signer setup
  const signer: Signer = await provider.getSigner();
  client.setSigner(signer);

  // Encryption
  const contractAddress: string = "0x1234...";
  const value: number = 42;
  const encrypted: EncryptionResult = await client.encryptU32(value, contractAddress);

  // Decryption
  const handle: bigint = encrypted.handles[0];
  const decrypted: bigint = await client.userDecrypt(contractAddress, handle);

  console.log("Original:", value);
  console.log("Decrypted:", decrypted);
}
```

---

## React TypeScript Example

```tsx
import React, { useEffect, useState } from "react";
import {
  FhevmProvider,
  useFhevmClient,
  useEncrypt,
  useDecrypt,
  UseFhevmClientReturn,
  UseEncryptReturn,
  UseDecryptReturn,
} from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";

const config: FhevmConfig = {
  gatewayUrl: "https://gateway.zama.ai",
  aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
  kmsVerifierAddress: "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
};

function App(): JSX.Element {
  return (
    <FhevmProvider config={config}>
      <MyComponent />
    </FhevmProvider>
  );
}

function MyComponent(): JSX.Element {
  const { isInitialized, initialize }: UseFhevmClientReturn = useFhevmClient();
  const { encryptU32 }: UseEncryptReturn = useEncrypt();
  const { userDecrypt }: UseDecryptReturn = useDecrypt();
  const [result, setResult] = useState<EncryptionResult | null>(null);

  useEffect(() => {
    const init = async (): Promise<void> => {
      const provider: BrowserProvider = new BrowserProvider(window.ethereum);
      await initialize(provider);
    };
    init();
  }, [initialize]);

  const handleEncrypt = async (): Promise<void> => {
    const encrypted: EncryptionResult = await encryptU32(42, "0x1234...");
    setResult(encrypted);
  };

  return (
    <div>
      {isInitialized ? (
        <button onClick={handleEncrypt}>Encrypt</button>
      ) : (
        <div>Initializing...</div>
      )}
    </div>
  );
}
```

---

## Declaration Files

If you need custom type declarations, create a `types.d.ts` file:

```typescript
// types.d.ts
declare module "@fhevm-toolkit/sdk" {
  export * from "@fhevm-toolkit/sdk/dist/types";
}

declare module "@fhevm-toolkit/sdk/react" {
  export * from "@fhevm-toolkit/sdk/dist/provider";
}
```

---

## tsconfig.json Recommendations

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  }
}
```

---

For more information:
- [API Reference](./API-REFERENCE.md)
- [Best Practices](./BEST-PRACTICES.md)
- [SDK Documentation](./packages/fhevm-sdk/README.md)

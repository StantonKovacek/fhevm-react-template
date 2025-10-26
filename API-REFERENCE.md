# API Reference

Complete API documentation for the FHEVM Toolkit SDK.

## Table of Contents

- [Core Client](#core-client)
- [React Hooks](#react-hooks)
- [Encryption Functions](#encryption-functions)
- [Decryption Functions](#decryption-functions)
- [Types](#types)
- [Configuration](#configuration)

---

## Core Client

### `FhevmClient`

The core client class that manages FHEVM operations.

#### Constructor

```typescript
constructor(config: FhevmConfig)
```

**Parameters:**
- `config: FhevmConfig` - Configuration object

**Example:**
```typescript
import { FhevmClient } from "@fhevm-toolkit/sdk";

const config = {
  gatewayUrl: "https://gateway.zama.ai",
  aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
  kmsVerifierAddress: "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
};

const client = new FhevmClient(config);
```

#### Methods

##### `initialize(provider: BrowserProvider | JsonRpcProvider): Promise<void>`

Initializes the FHEVM client with an Ethereum provider.

**Parameters:**
- `provider: BrowserProvider | JsonRpcProvider` - ethers.js provider instance

**Returns:** `Promise<void>`

**Example:**
```typescript
import { BrowserProvider } from "ethers";

const provider = new BrowserProvider(window.ethereum);
await client.initialize(provider);
```

**Throws:**
- Error if provider is invalid
- Error if initialization fails

---

##### `setSigner(signer: Signer): void`

Sets the signer for transaction signing.

**Parameters:**
- `signer: Signer` - ethers.js Signer instance

**Example:**
```typescript
const signer = await provider.getSigner();
client.setSigner(signer);
```

---

##### `encryptU8(value: number, contractAddress: string): Promise<EncryptionResult>`

Encrypts an unsigned 8-bit integer.

**Parameters:**
- `value: number` - Value to encrypt (0 to 255)
- `contractAddress: string` - Target contract address

**Returns:** `Promise<EncryptionResult>`

**Example:**
```typescript
const result = await client.encryptU8(42, "0x1234...");
```

---

##### `encryptU16(value: number, contractAddress: string): Promise<EncryptionResult>`

Encrypts an unsigned 16-bit integer.

**Parameters:**
- `value: number` - Value to encrypt (0 to 65,535)
- `contractAddress: string` - Target contract address

**Returns:** `Promise<EncryptionResult>`

**Example:**
```typescript
const result = await client.encryptU16(1000, "0x1234...");
```

---

##### `encryptU32(value: number, contractAddress: string): Promise<EncryptionResult>`

Encrypts an unsigned 32-bit integer.

**Parameters:**
- `value: number` - Value to encrypt (0 to 4,294,967,295)
- `contractAddress: string` - Target contract address

**Returns:** `Promise<EncryptionResult>`

**Example:**
```typescript
const result = await client.encryptU32(123456, "0x1234...");
console.log(result.handles[0]); // Encrypted handle
console.log(result.inputProof);  // Input proof
```

---

##### `encryptU64(value: bigint, contractAddress: string): Promise<EncryptionResult>`

Encrypts an unsigned 64-bit integer.

**Parameters:**
- `value: bigint` - Value to encrypt
- `contractAddress: string` - Target contract address

**Returns:** `Promise<EncryptionResult>`

**Example:**
```typescript
const result = await client.encryptU64(9876543210n, "0x1234...");
```

---

##### `encryptBool(value: boolean, contractAddress: string): Promise<EncryptionResult>`

Encrypts a boolean value.

**Parameters:**
- `value: boolean` - Value to encrypt
- `contractAddress: string` - Target contract address

**Returns:** `Promise<EncryptionResult>`

**Example:**
```typescript
const result = await client.encryptBool(true, "0x1234...");
```

---

##### `userDecrypt(contractAddress: string, handle: bigint): Promise<bigint>`

Decrypts data using user signature (EIP-712).

**Parameters:**
- `contractAddress: string` - Contract that owns the encrypted data
- `handle: bigint` - Encrypted handle to decrypt

**Returns:** `Promise<bigint>` - Decrypted value

**Example:**
```typescript
const decrypted = await client.userDecrypt("0x1234...", 123456n);
console.log(decrypted); // Original value
```

**Requires:**
- Signer to be set
- User has permission to decrypt

---

##### `publicDecrypt(contractAddress: string, handle: bigint): Promise<bigint>`

Decrypts publicly available data without signature.

**Parameters:**
- `contractAddress: string` - Contract that owns the encrypted data
- `handle: bigint` - Encrypted handle to decrypt

**Returns:** `Promise<bigint>` - Decrypted value

**Example:**
```typescript
const decrypted = await client.publicDecrypt("0x1234...", 123456n);
```

---

##### `getProvider(): BrowserProvider | JsonRpcProvider | null`

Returns the current provider instance.

**Returns:** `BrowserProvider | JsonRpcProvider | null`

**Example:**
```typescript
const provider = client.getProvider();
```

---

##### `getSigner(): Signer | null`

Returns the current signer instance.

**Returns:** `Signer | null`

**Example:**
```typescript
const signer = client.getSigner();
```

---

## React Hooks

### `FhevmProvider`

Provider component that wraps your application.

**Props:**
- `config: FhevmConfig` - FHEVM configuration
- `children: React.ReactNode` - Child components

**Example:**
```tsx
import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

const config = {
  gatewayUrl: "https://gateway.zama.ai",
  aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
  kmsVerifierAddress: "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
};

function App() {
  return (
    <FhevmProvider config={config}>
      <YourApp />
    </FhevmProvider>
  );
}
```

---

### `useFhevmClient()`

Hook to access the FHEVM client and its methods.

**Returns:**
```typescript
{
  client: FhevmClient;
  isInitialized: boolean;
  initialize: (provider: BrowserProvider | JsonRpcProvider) => Promise<void>;
}
```

**Example:**
```tsx
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";

function MyComponent() {
  const { client, isInitialized, initialize } = useFhevmClient();

  useEffect(() => {
    const init = async () => {
      const provider = new BrowserProvider(window.ethereum);
      await initialize(provider);
    };
    init();
  }, [initialize]);

  if (!isInitialized) {
    return <div>Initializing...</div>;
  }

  return <div>FHEVM Ready!</div>;
}
```

---

### `useEncrypt()`

Hook that provides encryption functions.

**Returns:**
```typescript
{
  encryptU8: (value: number, contractAddress: string) => Promise<EncryptionResult>;
  encryptU16: (value: number, contractAddress: string) => Promise<EncryptionResult>;
  encryptU32: (value: number, contractAddress: string) => Promise<EncryptionResult>;
  encryptU64: (value: bigint, contractAddress: string) => Promise<EncryptionResult>;
  encryptBool: (value: boolean, contractAddress: string) => Promise<EncryptionResult>;
}
```

**Example:**
```tsx
import { useEncrypt } from "@fhevm-toolkit/sdk/react";

function EncryptComponent() {
  const { encryptU32, encryptU64, encryptBool } = useEncrypt();

  const handleEncrypt = async () => {
    const result = await encryptU32(42, contractAddress);
    console.log("Encrypted:", result.handles[0]);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

---

### `useDecrypt()`

Hook that provides decryption functions.

**Returns:**
```typescript
{
  userDecrypt: (contractAddress: string, handle: bigint) => Promise<bigint>;
  publicDecrypt: (contractAddress: string, handle: bigint) => Promise<bigint>;
}
```

**Example:**
```tsx
import { useDecrypt } from "@fhevm-toolkit/sdk/react";

function DecryptComponent() {
  const { userDecrypt, publicDecrypt } = useDecrypt();

  const handleUserDecrypt = async () => {
    const value = await userDecrypt(contractAddress, handleValue);
    console.log("Decrypted:", value);
  };

  const handlePublicDecrypt = async () => {
    const value = await publicDecrypt(contractAddress, handleValue);
    console.log("Public decrypted:", value);
  };

  return (
    <>
      <button onClick={handleUserDecrypt}>User Decrypt</button>
      <button onClick={handlePublicDecrypt}>Public Decrypt</button>
    </>
  );
}
```

---

### `useFhevmSigner()`

Hook to manage the signer for transactions.

**Returns:**
```typescript
{
  signer: Signer | null;
  setSigner: (signer: Signer) => void;
}
```

**Example:**
```tsx
import { useFhevmSigner } from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";

function WalletConnect() {
  const { signer, setSigner } = useFhevmSigner();

  const connect = async () => {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const newSigner = await provider.getSigner();
    setSigner(newSigner);
  };

  return (
    <button onClick={connect}>
      {signer ? "Connected" : "Connect Wallet"}
    </button>
  );
}
```

---

## Encryption Functions

All encryption functions return an `EncryptionResult` object.

### `EncryptionResult`

```typescript
interface EncryptionResult {
  handles: bigint[];    // Array of encrypted handles
  inputProof: string;   // Cryptographic proof of encryption
}
```

### Usage in Smart Contracts

```typescript
const encrypted = await encryptU64(amount, contractAddress);

// Use in contract call
await contract.someFunction(
  encrypted.handles[0],  // Encrypted handle
  encrypted.inputProof   // Input proof
);
```

---

## Decryption Functions

### User Decrypt

Requires EIP-712 signature from the user.

**Use Cases:**
- Private balances
- Individual votes
- Personal data
- Access-controlled information

**Requirements:**
- Signer must be set
- User must have permission from contract

### Public Decrypt

No signature required.

**Use Cases:**
- Public results
- Revealed auction winners
- Final vote counts
- Publicly available data

**Requirements:**
- Contract must have made data public
- No permissions needed

---

## Types

### `FhevmConfig`

```typescript
interface FhevmConfig {
  gatewayUrl: string;        // Zama gateway URL
  aclAddress: string;        // ACL contract address
  kmsVerifierAddress: string; // KMS verifier contract address
}
```

### `EncryptionResult`

```typescript
interface EncryptionResult {
  handles: bigint[];    // Encrypted handles
  inputProof: string;   // Cryptographic input proof
}
```

---

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
NEXT_PUBLIC_KMS_ADDRESS=0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04
```

### Network Addresses

**Sepolia Testnet:**
- ACL: `0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92`
- KMS Verifier: `0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04`
- Gateway: `https://gateway.zama.ai`

---

## Error Handling

All async methods can throw errors. Always wrap in try-catch:

```typescript
try {
  const encrypted = await client.encryptU32(42, contractAddress);
} catch (error) {
  console.error("Encryption failed:", error);
}
```

**Common Errors:**
- `Client not initialized` - Call `initialize()` first
- `Invalid value` - Value out of range for type
- `Signer not set` - Call `setSigner()` before user decrypt
- `Permission denied` - User lacks permission to decrypt

---

## Full Example

```tsx
import { FhevmProvider, useFhevmClient, useEncrypt, useDecrypt } from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";

const config = {
  gatewayUrl: "https://gateway.zama.ai",
  aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
  kmsVerifierAddress: "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
};

function App() {
  return (
    <FhevmProvider config={config}>
      <MyComponent />
    </FhevmProvider>
  );
}

function MyComponent() {
  const { initialize, isInitialized } = useFhevmClient();
  const { encryptU32 } = useEncrypt();
  const { userDecrypt } = useDecrypt();

  useEffect(() => {
    const init = async () => {
      const provider = new BrowserProvider(window.ethereum);
      await initialize(provider);
    };
    init();
  }, [initialize]);

  const handleEncrypt = async () => {
    const result = await encryptU32(42, "0x1234...");
    console.log("Encrypted:", result.handles[0]);
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

For more examples, see:
- [Frontend Integration Guide](./FRONTEND-INTEGRATION.md)
- [Cultural Crowdfunding Example](./examples/cultural-crowdfunding/README.md)
- [Next.js Showcase](./examples/nextjs-showcase/README.md)

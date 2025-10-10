# @fhevm-toolkit/sdk

Universal FHEVM SDK for building confidential dApps with ease. Framework-agnostic core with React adapters.

## Features

- 🔐 **Easy Encryption/Decryption**: Simple APIs for FHE operations
- ⚛️ **React Hooks**: Wagmi-like hooks for React applications
- 🎯 **Framework Agnostic**: Core functionality works with any framework
- 📦 **All-in-One Package**: No need to manage multiple dependencies
- 🚀 **Quick Setup**: Get started in less than 10 lines of code
- 🛠️ **TypeScript Support**: Full type safety

## Installation

```bash
npm install @fhevm-toolkit/sdk
# or
yarn add @fhevm-toolkit/sdk
# or
pnpm add @fhevm-toolkit/sdk
```

## Quick Start

### React Usage

```tsx
import { FhevmProvider, useFhevmClient, useEncrypt } from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";

// 1. Wrap your app with FhevmProvider
function App() {
  return (
    <FhevmProvider
      config={{
        gatewayUrl: "https://gateway.zama.ai",
        aclAddress: "0x...",
        kmsVerifierAddress: "0x...",
      }}
    >
      <YourApp />
    </FhevmProvider>
  );
}

// 2. Use hooks in your components
function YourComponent() {
  const { initialize, isInitialized } = useFhevmClient();
  const { encryptU32, encryptU64 } = useEncrypt();

  // Initialize on mount
  useEffect(() => {
    const provider = new BrowserProvider(window.ethereum);
    initialize(provider);
  }, []);

  // Encrypt a value
  const handleEncrypt = async () => {
    const encrypted = await encryptU32(42, contractAddress);
    // Use encrypted.handles and encrypted.inputProof
  };

  return <button onClick={handleEncrypt}>Encrypt Value</button>;
}
```

### Vanilla JavaScript / Node.js Usage

```javascript
import { FhevmClient } from "@fhevm-toolkit/sdk";
import { JsonRpcProvider } from "ethers";

// 1. Create client
const client = new FhevmClient({
  gatewayUrl: "https://gateway.zama.ai",
  aclAddress: "0x...",
  kmsVerifierAddress: "0x...",
});

// 2. Initialize
const provider = new JsonRpcProvider("https://rpc-url");
await client.initialize(provider);

// 3. Encrypt values
const encrypted = await client.encryptU32(42, contractAddress);

// 4. Decrypt values
const decrypted = await client.userDecrypt(contractAddress, handle);
```

## API Reference

### Core Client

#### `FhevmClient`

Main client class for FHEVM operations.

```typescript
const client = new FhevmClient(config);
await client.initialize(provider);
client.setSigner(signer);
```

**Methods:**
- `initialize(provider)` - Initialize FHEVM instance
- `setSigner(signer)` - Set transaction signer
- `encryptU32(value, contractAddress)` - Encrypt 32-bit unsigned integer
- `encryptU64(value, contractAddress)` - Encrypt 64-bit unsigned integer
- `encryptBool(value, contractAddress)` - Encrypt boolean
- `userDecrypt(contractAddress, handle)` - Decrypt with user signature (EIP-712)
- `publicDecrypt(contractAddress, handle)` - Public decrypt (no signature)

### React Hooks

#### `useFhevmClient()`

Access the FHEVM client and initialization state.

```typescript
const { client, isInitialized, initialize, encrypt, decrypt } = useFhevmClient();
```

#### `useEncrypt()`

Encryption helpers.

```typescript
const { encryptU32, encryptU64, encryptBool } = useEncrypt();
```

#### `useDecrypt()`

Decryption helpers.

```typescript
const { userDecrypt, publicDecrypt } = useDecrypt();
```

#### `useFhevmSigner()`

Signer management.

```typescript
const { setSigner, getSigner } = useFhevmSigner();
```

### Utility Functions

```typescript
import {
  handleToHex,
  hexToHandle,
  formatEncryptedValue,
  isValidAddress,
  retry,
  formatEther,
  parseEther
} from "@fhevm-toolkit/sdk";
```

## Configuration

```typescript
interface FhevmClientConfig {
  networkUrl?: string;           // RPC URL (optional, inferred from provider)
  gatewayUrl: string;            // Zama gateway URL
  aclAddress: string;            // ACL contract address
  kmsVerifierAddress: string;    // KMS verifier address
}
```

## Examples

### Encrypt and Send Transaction

```typescript
import { useEncrypt, useFhevmClient } from "@fhevm-toolkit/sdk/react";
import { Contract } from "ethers";

function ContributionForm() {
  const { encryptU64 } = useEncrypt();
  const { client } = useFhevmClient();

  const contribute = async (amount: bigint) => {
    // 1. Encrypt amount
    const encrypted = await encryptU64(amount, CONTRACT_ADDRESS);

    // 2. Send transaction
    const contract = new Contract(CONTRACT_ADDRESS, ABI, client.getSigner());
    const tx = await contract.contribute(
      encrypted.handles[0],
      encrypted.inputProof
    );

    await tx.wait();
  };

  return <button onClick={() => contribute(1000000n)}>Contribute</button>;
}
```

### Decrypt User Data

```typescript
import { useDecrypt } from "@fhevm-toolkit/sdk/react";

function MyBalance() {
  const { userDecrypt } = useDecrypt();
  const [balance, setBalance] = useState<bigint>(0n);

  const fetchBalance = async () => {
    // Get encrypted handle from contract
    const handle = await contract.getMyBalance();

    // Decrypt with user signature
    const decrypted = await userDecrypt(CONTRACT_ADDRESS, handle);
    setBalance(decrypted);
  };

  return <div>Balance: {balance.toString()}</div>;
}
```

### Batch Encryption

```typescript
import { FhevmClient, batchEncrypt } from "@fhevm-toolkit/sdk";

const values = [
  { value: 42, type: "uint32" },
  { value: true, type: "bool" },
  { value: 1000n, type: "uint64" },
];

const encrypted = await batchEncrypt(
  client.getInstance(),
  values,
  contractAddress,
  userAddress
);
```

## Framework Integration

### Next.js

```typescript
// app/providers.tsx
"use client";

import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

export function Providers({ children }) {
  return (
    <FhevmProvider config={fhevmConfig}>
      {children}
    </FhevmProvider>
  );
}
```

### Vue.js

```typescript
// Use the core client directly
import { FhevmClient } from "@fhevm-toolkit/sdk";

export const fhevmClient = new FhevmClient(config);

// In your component
await fhevmClient.initialize(provider);
```

### Plain Node.js

```typescript
import { FhevmClient } from "@fhevm-toolkit/sdk";
import { JsonRpcProvider, Wallet } from "ethers";

const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

const client = new FhevmClient(config);
await client.initialize(provider);
client.setSigner(wallet);

// Now use encryption/decryption
const encrypted = await client.encryptU32(42, contractAddress);
```

## Best Practices

1. **Initialize Once**: Initialize the client once when your app starts
2. **Set Signer**: Always set the signer before encryption operations
3. **Error Handling**: Wrap encrypt/decrypt operations in try-catch
4. **Type Safety**: Use TypeScript for better development experience
5. **Cache Instance**: Reuse the client instance across your app

## TypeScript

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  FhevmClientConfig,
  EncryptionResult,
  DecryptionOptions,
  FhevmContextValue
} from "@fhevm-toolkit/sdk";
```

## License

MIT

## Support

- Documentation: [GitHub](https://github.com/your-repo)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)
- Zama Docs: [docs.zama.ai](https://docs.zama.ai/)

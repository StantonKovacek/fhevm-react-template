# Best Practices Guide

Guidelines and best practices for using the FHEVM Toolkit SDK effectively and securely.

## Table of Contents

- [Initialization](#initialization)
- [Encryption](#encryption)
- [Decryption](#decryption)
- [Error Handling](#error-handling)
- [Performance](#performance)
- [Security](#security)
- [React Patterns](#react-patterns)
- [Contract Integration](#contract-integration)
- [Testing](#testing)
- [Production Deployment](#production-deployment)

---

## Initialization

### ✅ DO: Initialize Once

Initialize the FHEVM client once when your application starts.

```tsx
function App() {
  const { initialize, isInitialized } = useFhevmClient();

  useEffect(() => {
    const init = async () => {
      if (!isInitialized) {
        const provider = new BrowserProvider(window.ethereum);
        await initialize(provider);
      }
    };
    init();
  }, [initialize, isInitialized]);

  return <div>...</div>;
}
```

### ❌ DON'T: Initialize Multiple Times

```tsx
// Bad - initializes on every render
function BadComponent() {
  const { initialize } = useFhevmClient();

  // This runs on every render!
  initialize(provider);

  return <div>...</div>;
}
```

---

### ✅ DO: Check Initialization Status

Always check if the client is initialized before using it.

```tsx
function MyComponent() {
  const { isInitialized } = useFhevmClient();

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return <EncryptionForm />;
}
```

---

### ✅ DO: Handle Initialization Errors

```tsx
const [initError, setInitError] = useState<string | null>(null);

useEffect(() => {
  const init = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      await initialize(provider);
    } catch (error) {
      setInitError("Failed to initialize FHEVM");
      console.error(error);
    }
  };
  init();
}, [initialize]);
```

---

## Encryption

### ✅ DO: Validate Input Before Encryption

```typescript
function validateU32(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= 4294967295;
}

async function encryptSafely(value: number) {
  if (!validateU32(value)) {
    throw new Error("Invalid uint32 value");
  }

  return await encryptU32(value, contractAddress);
}
```

---

### ✅ DO: Use Correct Types

Match your encryption type to your contract's expected type.

```typescript
// Contract expects euint32
const encrypted = await encryptU32(amount, contractAddress);

// Contract expects euint64
const encrypted = await encryptU64(BigInt(largeAmount), contractAddress);

// Contract expects ebool
const encrypted = await encryptBool(isActive, contractAddress);
```

---

### ✅ DO: Bind Encryption to Contract Address

Always encrypt for the specific contract that will use the data.

```typescript
const CROWDFUNDING_ADDRESS = "0x1234...";

// Good - encrypted for specific contract
const encrypted = await encryptU64(amount, CROWDFUNDING_ADDRESS);

// Bad - using wrong address
const encrypted = await encryptU64(amount, "0x0000...");
```

---

### ❌ DON'T: Reuse Encrypted Values Across Contracts

```typescript
// Bad - trying to reuse encryption
const encrypted = await encryptU32(42, contractA);
await contractB.someFunction(encrypted.handles[0]); // Will fail!

// Good - encrypt separately for each contract
const encryptedA = await encryptU32(42, contractAAddress);
const encryptedB = await encryptU32(42, contractBAddress);
```

---

## Decryption

### ✅ DO: Choose Appropriate Decryption Method

**User Decrypt** for private data:
```typescript
// Private balance - requires user signature
const balance = await userDecrypt(contractAddress, balanceHandle);
```

**Public Decrypt** for public data:
```typescript
// Public result after voting ends
const winner = await publicDecrypt(contractAddress, winnerHandle);
```

---

### ✅ DO: Set Signer Before User Decrypt

```tsx
const { setSigner } = useFhevmSigner();

const connectAndDecrypt = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  setSigner(signer);

  // Now user decrypt will work
  const value = await userDecrypt(contractAddress, handle);
};
```

---

### ❌ DON'T: Assume Decryption Permission

```typescript
// Bad - doesn't check permission
try {
  const value = await userDecrypt(contractAddress, handle);
} catch (error) {
  // Might fail if user lacks permission
}

// Good - handle permission errors
try {
  const value = await userDecrypt(contractAddress, handle);
} catch (error) {
  if (error.message.includes("permission")) {
    setError("You don't have permission to decrypt this data");
  }
}
```

---

## Error Handling

### ✅ DO: Use Try-Catch for All Operations

```typescript
async function handleEncryption() {
  try {
    const encrypted = await encryptU32(value, contractAddress);
    setResult(encrypted);
  } catch (error) {
    console.error("Encryption failed:", error);
    setError(error instanceof Error ? error.message : "Unknown error");
  }
}
```

---

### ✅ DO: Provide User-Friendly Error Messages

```typescript
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("user rejected")) {
      return "Transaction was rejected. Please try again.";
    }
    if (error.message.includes("insufficient funds")) {
      return "Insufficient funds to complete transaction.";
    }
    if (error.message.includes("not initialized")) {
      return "Please wait for initialization to complete.";
    }
  }
  return "An unexpected error occurred.";
}
```

---

### ✅ DO: Log Errors for Debugging

```typescript
const logError = (context: string, error: unknown) => {
  console.error(`[${context}]`, {
    message: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });
};

try {
  await encryptU32(value, contractAddress);
} catch (error) {
  logError("Encryption", error);
}
```

---

## Performance

### ✅ DO: Memoize Expensive Computations

```tsx
import { useMemo } from "react";

function MyComponent() {
  const contractAddress = useMemo(
    () => process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    []
  );

  const config = useMemo(
    () => ({
      gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL!,
      aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS!,
      kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS!,
    }),
    []
  );

  return <FhevmProvider config={config}>...</FhevmProvider>;
}
```

---

### ✅ DO: Batch Operations When Possible

```typescript
// Good - parallel encryption
async function encryptMultiple(values: number[]) {
  const promises = values.map(v => encryptU32(v, contractAddress));
  return await Promise.all(promises);
}

// Bad - sequential encryption
async function encryptSequential(values: number[]) {
  const results = [];
  for (const v of values) {
    results.push(await encryptU32(v, contractAddress)); // Slow!
  }
  return results;
}
```

---

### ✅ DO: Implement Loading States

```tsx
function EncryptForm() {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const { encryptU32 } = useEncrypt();

  const handleSubmit = async () => {
    setIsEncrypting(true);
    try {
      await encryptU32(value, contractAddress);
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <button disabled={isEncrypting}>
      {isEncrypting ? "Encrypting..." : "Encrypt"}
    </button>
  );
}
```

---

## Security

### ✅ DO: Validate Contract Addresses

```typescript
function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function validateContractAddress(address: string): void {
  if (!isValidEthereumAddress(address)) {
    throw new Error("Invalid contract address");
  }
}

// Use before encryption
validateContractAddress(contractAddress);
const encrypted = await encryptU32(value, contractAddress);
```

---

### ✅ DO: Store Configuration Securely

```env
# .env.local - Never commit to git!
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
NEXT_PUBLIC_KMS_ADDRESS=0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04
```

```typescript
// Load from environment
const config: FhevmConfig = {
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL!,
  aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS!,
  kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS!,
};
```

---

### ❌ DON'T: Hardcode Sensitive Data

```typescript
// Bad - hardcoded addresses
const config = {
  gatewayUrl: "https://gateway.zama.ai",
  aclAddress: "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
  kmsVerifierAddress: "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
};

// Good - use environment variables
const config = {
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL!,
  aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS!,
  kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS!,
};
```

---

### ✅ DO: Validate User Input

```typescript
function validateDonationAmount(amount: string): number {
  const parsed = parseFloat(amount);

  if (isNaN(parsed)) {
    throw new Error("Invalid amount");
  }

  if (parsed <= 0) {
    throw new Error("Amount must be positive");
  }

  if (parsed > 1000000) {
    throw new Error("Amount too large");
  }

  return Math.floor(parsed);
}
```

---

## React Patterns

### ✅ DO: Use Custom Hooks

Create reusable hooks for common patterns:

```typescript
// useContractEncryption.ts
export function useContractEncryption(contractAddress: string) {
  const { encryptU32, encryptU64 } = useEncrypt();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encrypt = async (value: number | bigint) => {
    setIsEncrypting(true);
    setError(null);

    try {
      if (typeof value === "bigint") {
        return await encryptU64(value, contractAddress);
      } else {
        return await encryptU32(value, contractAddress);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Encryption failed");
      throw err;
    } finally {
      setIsEncrypting(false);
    }
  };

  return { encrypt, isEncrypting, error };
}
```

---

### ✅ DO: Separate Concerns

```tsx
// EncryptionLogic.ts - Business logic
export async function encryptDonation(
  amount: number,
  contractAddress: string,
  encryptFn: (v: number, addr: string) => Promise<EncryptionResult>
) {
  validateDonationAmount(amount);
  return await encryptFn(amount, contractAddress);
}

// DonationForm.tsx - UI Component
function DonationForm() {
  const { encryptU32 } = useEncrypt();

  const handleSubmit = async (amount: number) => {
    await encryptDonation(amount, CONTRACT_ADDRESS, encryptU32);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

### ✅ DO: Use Context for Global State

```tsx
// EncryptionContext.tsx
const EncryptionContext = createContext<{
  contractAddress: string;
  isReady: boolean;
} | null>(null);

export function EncryptionProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized } = useFhevmClient();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

  return (
    <EncryptionContext.Provider
      value={{ contractAddress, isReady: isInitialized }}
    >
      {children}
    </EncryptionContext.Provider>
  );
}

export function useEncryptionContext() {
  const context = useContext(EncryptionContext);
  if (!context) {
    throw new Error("useEncryptionContext must be used within EncryptionProvider");
  }
  return context;
}
```

---

## Contract Integration

### ✅ DO: Match Contract ABI Types

Ensure your frontend types match contract expectations:

```solidity
// Contract
function contribute(euint64 encryptedAmount, bytes calldata inputProof) external;
```

```typescript
// Frontend
const encrypted = await encryptU64(amount, contractAddress);

await contract.contribute(
  encrypted.handles[0],  // euint64
  encrypted.inputProof   // bytes
);
```

---

### ✅ DO: Handle Contract Events

```typescript
contract.on("ProjectCreated", (projectId, creator) => {
  console.log(`New project ${projectId} by ${creator}`);
  refreshProjects();
});

// Clean up listeners
useEffect(() => {
  return () => {
    contract.removeAllListeners();
  };
}, [contract]);
```

---

### ✅ DO: Estimate Gas Before Transactions

```typescript
async function contributeWithGasEstimate(amount: bigint) {
  const encrypted = await encryptU64(amount, contractAddress);

  // Estimate gas
  const gasEstimate = await contract.contribute.estimateGas(
    encrypted.handles[0],
    encrypted.inputProof,
    { value: parseEther("0.1") }
  );

  // Add 20% buffer
  const gasLimit = (gasEstimate * 120n) / 100n;

  // Send transaction
  const tx = await contract.contribute(
    encrypted.handles[0],
    encrypted.inputProof,
    { value: parseEther("0.1"), gasLimit }
  );

  return await tx.wait();
}
```

---

## Testing

### ✅ DO: Mock FHEVM Client in Tests

```typescript
// __mocks__/@fhevm-toolkit/sdk.ts
export const FhevmClient = jest.fn().mockImplementation(() => ({
  initialize: jest.fn().mockResolvedValue(undefined),
  encryptU32: jest.fn().mockResolvedValue({
    handles: [123n],
    inputProof: "0xproof...",
  }),
  userDecrypt: jest.fn().mockResolvedValue(42n),
}));
```

---

### ✅ DO: Test Error Scenarios

```typescript
describe("Encryption", () => {
  it("should handle invalid values", async () => {
    await expect(encryptU32(-1, contractAddress)).rejects.toThrow();
    await expect(encryptU32(5000000000, contractAddress)).rejects.toThrow();
  });

  it("should handle invalid addresses", async () => {
    await expect(encryptU32(42, "invalid")).rejects.toThrow();
  });

  it("should handle uninitialized client", async () => {
    const client = new FhevmClient(config);
    await expect(client.encryptU32(42, contractAddress)).rejects.toThrow(
      "Client not initialized"
    );
  });
});
```

---

### ✅ DO: Test React Components

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

describe("EncryptForm", () => {
  it("should disable button while encrypting", async () => {
    render(
      <FhevmProvider config={mockConfig}>
        <EncryptForm />
      </FhevmProvider>
    );

    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
});
```

---

## Production Deployment

### ✅ DO: Use Environment-Specific Configuration

```typescript
// config.ts
export const getConfig = (): FhevmConfig => {
  const isDev = process.env.NODE_ENV === "development";

  return {
    gatewayUrl: isDev
      ? "http://localhost:8080"
      : "https://gateway.zama.ai",
    aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS!,
    kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS!,
  };
};
```

---

### ✅ DO: Implement Proper Logging

```typescript
// logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Send to error tracking service in production
    if (process.env.NODE_ENV === "production") {
      // sendToSentry(error);
    }
  },
};
```

---

### ✅ DO: Monitor Performance

```typescript
async function encryptWithMetrics(value: number) {
  const startTime = performance.now();

  try {
    const result = await encryptU32(value, contractAddress);
    const duration = performance.now() - startTime;

    logger.info("Encryption completed", { duration, value });

    return result;
  } catch (error) {
    logger.error("Encryption failed", error);
    throw error;
  }
}
```

---

### ✅ DO: Implement Retry Logic

```typescript
async function encryptWithRetry(
  value: number,
  maxRetries = 3
): Promise<EncryptionResult> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await encryptU32(value, contractAddress);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");
      logger.info(`Retry ${i + 1}/${maxRetries}`, { error: lastError.message });

      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }

  throw lastError;
}
```

---

## Summary Checklist

### Initialization
- [ ] Initialize client once at app startup
- [ ] Check initialization status before operations
- [ ] Handle initialization errors gracefully

### Encryption
- [ ] Validate input values before encryption
- [ ] Use correct encryption types
- [ ] Bind encryption to specific contract addresses

### Decryption
- [ ] Choose appropriate decryption method
- [ ] Set signer before user decrypt
- [ ] Handle permission errors

### Error Handling
- [ ] Wrap all operations in try-catch
- [ ] Provide user-friendly error messages
- [ ] Log errors for debugging

### Performance
- [ ] Memoize expensive computations
- [ ] Batch operations when possible
- [ ] Implement loading states

### Security
- [ ] Validate contract addresses
- [ ] Store configuration in environment variables
- [ ] Validate all user input

### Production
- [ ] Use environment-specific configuration
- [ ] Implement proper logging
- [ ] Monitor performance
- [ ] Implement retry logic

---

For more information:
- [API Reference](./API-REFERENCE.md)
- [TypeScript Types](./TYPESCRIPT-TYPES.md)
- [Frontend Integration Guide](./FRONTEND-INTEGRATION.md)

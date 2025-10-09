# FHEVM SDK Showcase - Next.js Example

Interactive Next.js 14 application demonstrating FHEVM SDK integration patterns and capabilities.

## 🎯 Overview

This showcase application provides hands-on demos of FHEVM encryption and decryption capabilities, helping developers understand how to integrate privacy-preserving FHE technology into their Next.js applications.

## ✨ Features

### 🔐 Encryption Demo
- **Multiple data types**: Encrypt uint32, uint64, and boolean values
- **Contract binding**: Link encrypted data to specific contract addresses
- **Real-time validation**: Input validation and error handling
- **Visual feedback**: See encrypted handles and input proofs

### 🔓 Decryption Demo
- **User Decryption**: Permission-based decryption with EIP-712 signatures
- **Public Decryption**: Signature-free decryption for public data
- **Comparison table**: Understand when to use each method
- **Educational content**: Learn about privacy trade-offs

### 🎨 User Experience
- **Wallet connection**: MetaMask integration
- **Status indicators**: Real-time FHEVM and wallet status
- **Responsive design**: Mobile-friendly interface
- **Loading states**: Clear feedback during async operations
- **Error handling**: Helpful error messages and validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension
- Access to Ethereum Sepolia testnet (for testing)

### Installation

1. **Navigate to the example:**
   ```bash
   cd examples/nextjs-showcase
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
   NEXT_PUBLIC_ACL_ADDRESS=0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
   NEXT_PUBLIC_KMS_ADDRESS=0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04
   NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 📁 Project Structure

```
nextjs-showcase/
├── app/
│   ├── layout.tsx              # Root layout with FhevmProvider
│   ├── page.tsx                # Landing page with feature overview
│   ├── globals.css             # Global styles with Tailwind
│   ├── encrypt/
│   │   └── page.tsx            # Interactive encryption demo
│   └── decrypt/
│       └── page.tsx            # Decryption demo with comparison
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies and scripts
└── .env.example                # Environment variables template
```

## 🔧 SDK Integration

### 1. Provider Setup (app/layout.tsx)

```tsx
import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

const fhevmConfig = {
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL!,
  aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS!,
  kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS!,
};

export default function RootLayout({ children }) {
  return (
    <FhevmProvider config={fhevmConfig}>
      {children}
    </FhevmProvider>
  );
}
```

### 2. Client Initialization

```tsx
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";

const { initialize, isInitialized } = useFhevmClient();

useEffect(() => {
  const init = async () => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await initialize(provider);
    }
  };
  init();
}, [initialize]);
```

### 3. Encryption

```tsx
import { useEncrypt } from "@fhevm-toolkit/sdk/react";

const { encryptU32, encryptU64, encryptBool } = useEncrypt();

const encrypted = await encryptU32(42, contractAddress);
// Use encrypted.handles[0] and encrypted.inputProof in contract calls
```

### 4. Decryption

```tsx
import { useDecrypt } from "@fhevm-toolkit/sdk/react";

const { userDecrypt, publicDecrypt } = useDecrypt();

// User decrypt (requires signature)
const value = await userDecrypt(contractAddress, handle);

// Public decrypt (no signature)
const publicValue = await publicDecrypt(contractAddress, handle);
```

## 📚 Learn More

### Encryption Types

| Type | Range | Use Case |
|------|-------|----------|
| **uint32** | 0 to 4,294,967,295 | Moderate numbers (prices, counts) |
| **uint64** | 0 to 18,446,744,073,709,551,615 | Large numbers (balances, timestamps) |
| **bool** | true/false | Flags, votes, access control |

### Decryption Methods

**User Decrypt:**
- Requires EIP-712 signature from wallet
- Permission-based access control
- Higher gas costs
- Use for: Private balances, individual votes, personal data

**Public Decrypt:**
- No signature required
- Anyone can decrypt
- Lower gas costs
- Use for: Final results, public totals, revealed data

## 🎓 Key Concepts

### FHE (Fully Homomorphic Encryption)
Allows computations on encrypted data without decrypting it. Smart contracts can process private information while preserving user privacy.

### Encrypted Handles
When you encrypt data, you receive a handle (unique identifier) that references the encrypted value on-chain.

### Input Proofs
Cryptographic proofs that verify you correctly encrypted the data and have permission to submit it.

### Contract Binding
Encrypted data is bound to specific contract addresses, preventing unauthorized use in other contracts.

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Blockchain:** ethers.js v6
- **FHE:** fhevmjs + @fhevm-toolkit/sdk

## 📖 Documentation

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Frontend Integration Guide](../../FRONTEND-INTEGRATION.md)
- [Quick Start Guide](../../QUICK-START.md)
- [Project Structure](../../PROJECT-STRUCTURE.md)

## 🐛 Troubleshooting

### FHEVM not initializing
- Ensure MetaMask is installed and connected
- Check that environment variables are set correctly
- Verify you're on the correct network (Sepolia)

### Encryption fails
- Verify contract address is valid
- Check input values are within valid ranges
- Ensure FHEVM client is initialized (`isInitialized === true`)

### Decryption fails
- For user decrypt: Ensure you have permission from the contract
- For public decrypt: Verify the data has been made public by the contract
- Check that the handle is valid and exists

## 🤝 Contributing

This example is part of the FHEVM React Template. To contribute:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - See [LICENSE](../../LICENSE) for details

## 🔗 Links

- [Zama Documentation](https://docs.zama.ai/)
- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Built with ❤️ using FHEVM SDK and Next.js 14**

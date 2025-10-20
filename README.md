# FHEVM Toolkit - Universal SDK for Confidential dApps

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Universal FHEVM SDK that makes building confidential frontends simple, consistent, and developer-friendly.

## 🌐 Live Demo

**Live Application**: https://fhe-cultural-crowdfunding.vercel.app/

**Demo Video**: Download and view `demo.mp4` file in this repository for a complete walkthrough

**GitHub Repository**: https://github.com/StantonKovacek/fhevm-react-template

## 🌟 Features

- **🎯 Framework Agnostic** - Works with React, Next.js, Vue, Node.js, or any frontend setup
- **📦 All-in-One Package** - No need to worry about scattered dependencies
- **🪝 Wagmi-like API** - Intuitive structure for web3 developers
- **⚡ Quick Setup** - Get started in less than 10 lines of code
- **🔐 Complete FHE Workflow** - Encryption, decryption, and contract interaction
- **📖 Well Documented** - Clear examples and comprehensive guides
- **🔒 Production Ready** - Following Zama's official SDK guidelines

## 🚀 Quick Start

### Install from Root

```bash
# Clone and install
git clone https://github.com/StantonKovacek/fhevm-react-template
cd fhevm-react-template
npm install

# Build SDK
npm run build:sdk

# Run examples
npm run dev:nextjs
# or
npm run dev:cultural
```

### Use SDK in Your Project

```bash
npm install @fhevm-toolkit/sdk
```

### React Example (< 10 Lines)

```tsx
import { FhevmProvider, useEncrypt } from "@fhevm-toolkit/sdk/react";

// Wrap your app
<FhevmProvider config={fhevmConfig}>
  <App />
</FhevmProvider>

// Use in component
function MyComponent() {
  const { encryptU32 } = useEncrypt();
  const encrypted = await encryptU32(42, contractAddress);
  // Done! ✅
}
```

## 📦 What's Included

### Universal SDK (`packages/fhevm-sdk`)

Framework-agnostic core with React adapters:

- ✅ Client initialization and management
- ✅ Encryption utilities (uint32, uint64, bool)
- ✅ Decryption flows (userDecrypt with EIP-712, publicDecrypt)
- ✅ React hooks (wagmi-like API)
- ✅ TypeScript support
- ✅ Error handling and retry logic

### Example Applications

#### 1. **Cultural Crowdfunding Platform** (`examples/cultural-crowdfunding`)

**FHE Contract - Anonymous Cultural Crowdfunding**

Privacy-preserving crowdfunding platform for cultural projects:
- **Anonymous Encrypted Contributions**: All donation amounts encrypted on-chain
- **Privacy-First Design**: Contributor amounts never revealed
- **Public Project Tracking**: Transparent project details while preserving donor privacy
- **Automatic Refunds**: Failed projects automatically refund contributors
- **10+ Cultural Categories**: Visual Arts, Music, Film, Theater, Dance, and more
- **Live on Sepolia**: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`

**Live Demo**: https://fhe-cultural-crowdfunding.vercel.app/

#### 2. **Next.js Showcase** (`examples/nextjs-showcase`)

Complete Next.js 14 integration patterns:
- **App Router Architecture**: Server and Client components
- **Interactive Encryption Demo**: Test uint32, uint64, and bool encryption
- **Decryption Comparison**: User decrypt vs public decrypt examples
- **Educational Content**: Learn FHE concepts through interactive demos
- **Production-Ready**: Full TypeScript and Tailwind CSS styling

## 🏗️ Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/                          # Universal FHEVM SDK
│       ├── src/
│       │   ├── client.ts                   # Core FhevmClient class
│       │   ├── provider.tsx                # React Provider & hooks
│       │   ├── encryption.ts               # Encryption utilities
│       │   ├── types.ts                    # TypeScript definitions
│       │   ├── utils.ts                    # Helper functions
│       │   └── index.ts                    # Main exports
│       ├── package.json                    # SDK package config
│       └── README.md                       # SDK documentation
│
├── examples/
│   ├── cultural-crowdfunding/              # Example 1: Anonymous Crowdfunding
│   │   ├── contracts/
│   │   │   └── AnonymousCulturalCrowdfunding.sol  # FHE smart contract
│   │   ├── app/                            # Next.js frontend
│   │   ├── src/components/                 # React components with SDK
│   │   ├── package.json                    # Dependencies
│   │   └── README.md                       # Setup guide
│   │
│   └── nextjs-showcase/                    # Example 2: SDK Showcase
│       ├── app/
│       │   ├── page.tsx                    # Landing page
│       │   ├── encrypt/page.tsx            # Encryption demo
│       │   └── decrypt/page.tsx            # Decryption demo
│       ├── package.json                    # Dependencies
│       └── README.md                       # Integration guide
│
├── package.json                            # Workspace root config
├── tsconfig.json                           # TypeScript configuration
├── .env.example                            # Environment template
├── LICENSE                                 # MIT License
├── README.md                               # This file
└── FRONTEND-INTEGRATION.md                 # Frontend integration guide
```

## 📖 Documentation

### SDK Documentation
- [Universal SDK Guide](./packages/fhevm-sdk/README.md)
- [Frontend Integration Guide](./FRONTEND-INTEGRATION.md)
- [API Reference](./API-REFERENCE.md)
- [TypeScript Types](./TYPESCRIPT-TYPES.md)
- [Best Practices](./BEST-PRACTICES.md)

### Example Documentation
- [Cultural Crowdfunding](./examples/cultural-crowdfunding/README.md)
- [Next.js Showcase](./examples/nextjs-showcase/README.md)

### Video Demo
Download `demo.mp4` from this repository for a complete walkthrough showing:
- SDK setup and initialization
- React hooks usage patterns
- Encryption and decryption workflows
- Cultural Crowdfunding platform demonstration
- Next.js integration examples

**Note**: The video file must be downloaded to view - streaming links are not available.

## 🔐 Core Concepts

### FHE Contract - Anonymous Cultural Crowdfunding

This platform demonstrates the power of Fully Homomorphic Encryption (FHE) for privacy-preserving crowdfunding:

**Privacy Features:**
- **Encrypted Contributions**: All donation amounts encrypted on-chain using FHE
- **Anonymous Donors**: Contributors remain completely anonymous - amounts never revealed
- **Private Calculations**: Funding progress computed on encrypted values without decryption
- **Trustless Privacy**: No central authority can view contribution amounts
- **Transparent Operations**: Project details remain public while preserving donor privacy

**How It Works:**
1. **Project Creation**: Creators submit cultural project proposals with funding goals
2. **Anonymous Contributions**: Donors contribute using FHE-encrypted amounts
3. **Private Aggregation**: Smart contract sums encrypted contributions without revealing individual amounts
4. **Milestone Tracking**: Project progress tracked while maintaining contributor privacy
5. **Fund Distribution**: Projects receive funds upon reaching goals with full donor anonymity

## 🎯 SDK Usage

### Core Features

```typescript
import { FhevmClient } from "@fhevm-toolkit/sdk";

// 1. Initialize
const client = new FhevmClient(config);
await client.initialize(provider);

// 2. Encrypt
const encrypted = await client.encryptU64(amount, contractAddress);

// 3. Decrypt
const decrypted = await client.userDecrypt(contractAddress, handle);
```

### React Hooks

```tsx
import {
  FhevmProvider,
  useFhevmClient,
  useEncrypt,
  useDecrypt,
} from "@fhevm-toolkit/sdk/react";

// Provider
<FhevmProvider config={config}>
  <App />
</FhevmProvider>

// Hooks
const { initialize, isInitialized } = useFhevmClient();
const { encryptU32, encryptU64, encryptBool } = useEncrypt();
const { userDecrypt, publicDecrypt } = useDecrypt();
```

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Build SDK

```bash
npm run build:sdk
```

### Run Examples

```bash
# Cultural Crowdfunding
npm run dev:cultural

# Next.js Showcase
npm run dev:nextjs
```

### Clean Build

```bash
npm run clean
npm install
```

## 📋 Requirements

To use this SDK, you need:

1. **Node.js** >= 18.0.0
2. **npm** >= 9.0.0
3. **MetaMask** or compatible Web3 wallet
4. **Testnet ETH** for Sepolia

## 🎓 Learning Path

1. **Read SDK Documentation**: Start with [SDK README](./packages/fhevm-sdk/README.md)
2. **Explore Examples**: Check out example projects
3. **Watch Demo Video**: Download and view `demo.mp4` for complete walkthrough
4. **Build Your dApp**: Use SDK in your own project

## 🌐 Framework Support

### React / Next.js ✅
```tsx
import { FhevmProvider, useEncrypt } from "@fhevm-toolkit/sdk/react";
```

### Vue.js ✅
```typescript
import { FhevmClient } from "@fhevm-toolkit/sdk";
const client = new FhevmClient(config);
```

### Plain Node.js ✅
```typescript
import { FhevmClient } from "@fhevm-toolkit/sdk";
const client = new FhevmClient(config);
```

### Vanilla JavaScript ✅
```javascript
import { FhevmClient } from "@fhevm-toolkit/sdk";
```

## 🔧 Configuration

Create `.env.local` in your project:

```env
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
NEXT_PUBLIC_KMS_ADDRESS=0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

## 📊 Evaluation Criteria

This project addresses all bounty requirements:

### ✅ Usability
- Quick setup (< 10 lines of code)
- Minimal boilerplate
- Clear documentation
- Intuitive API

### ✅ Completeness
- Initialization ✓
- Encryption ✓
- Decryption ✓
- Contract interaction ✓

### ✅ Reusability
- Framework-agnostic core ✓
- React adapters ✓
- Clean, modular components ✓
- Extensible architecture ✓

### ✅ Documentation
- SDK documentation ✓
- Example READMEs ✓
- Video demo ✓
- Code comments ✓

### ✅ Creativity
- Multiple framework support ✓
- Real-world examples ✓
- Wagmi-like API ✓
- Production-ready ✓

## 🎥 Demo Video

**File**: `demo.mp4` (included in repository)

The demo video demonstrates:
1. Quick SDK setup and installation
2. React hooks usage patterns
3. Encryption and decryption workflows
4. Cultural Crowdfunding platform walkthrough
5. Next.js integration examples
6. Complete end-to-end user flows

**Note**: Please download the `demo.mp4` file from the repository to view the demonstration. The video cannot be streamed directly.

## 🚀 Deployment

### Example Apps

**Cultural Crowdfunding:**
- **Live Application**: https://fhe-cultural-crowdfunding.vercel.app/
- **Contract Address**: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da` (Sepolia)
- **Etherscan**: https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details

## 🔗 Links

**GitHub Repository**: https://github.com/StantonKovacek/fhevm-react-template

**Live Demo**: https://fhe-cultural-crowdfunding.vercel.app/

**Zama Documentation**: https://docs.zama.ai/

**FHEVM GitHub**: https://github.com/zama-ai/fhevm

## 🏆 Bounty Submission

This project is submitted for the Zama FHEVM SDK Bounty.

**Key Deliverables:**
- ✅ Universal FHEVM SDK package
- ✅ Next.js showcase with encryption/decryption demos
- ✅ Cultural Crowdfunding example (real-world application)
- ✅ Video demonstration (demo.mp4)
- ✅ Comprehensive documentation
- ✅ Production deployment

---

**Built with privacy in mind. Powered by Zama FHE.**

*Making confidential dApps accessible to all developers.*

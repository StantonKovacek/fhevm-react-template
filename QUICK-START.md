# Quick Start Guide

Get started with FHEVM Toolkit in 5 minutes.

## ⚡ Super Quick Start

```bash
# 1. Clone and install
git clone https://github.com/your-repo/fhevm-toolkit
cd fhevm-toolkit
npm install

# 2. Build SDK
npm run build:sdk

# 3. Run example
npm run dev:nextjs
```

Open [http://localhost:3001](http://localhost:3001)

## 📦 What's Inside

```
fhevm-toolkit/
├── packages/fhevm-sdk/          # ← The SDK (use in your projects)
└── examples/                    # ← Example applications
    ├── cultural-crowdfunding/   # Privacy crowdfunding dApp
    └── nextjs-showcase/         # Next.js integration demo
```

## 🎯 Choose Your Path

### Path 1: Use SDK in Your Project

```bash
npm install @fhevm-toolkit/sdk
```

```tsx
import { FhevmProvider, useEncrypt } from "@fhevm-toolkit/sdk/react";

// 1. Wrap app
<FhevmProvider config={config}>
  <App />
</FhevmProvider>

// 2. Use hooks
const { encryptU64 } = useEncrypt();
const encrypted = await encryptU64(1000n, contractAddress);
```

### Path 2: Explore Examples

```bash
# Cultural Crowdfunding
npm run dev:cultural

# Next.js Showcase
npm run dev:nextjs
```

## 📚 Documentation Structure

| Document | Description |
|----------|-------------|
| [README.md](./README.md) | Main overview & getting started |
| [packages/fhevm-sdk/README.md](./packages/fhevm-sdk/README.md) | SDK API reference |
| [examples/README.md](./examples/README.md) | Examples overview |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deployment guide |
| [DEMO.md](./DEMO.md) | Video demo script |

## 🔧 Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
NEXT_PUBLIC_KMS_ADDRESS=0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

## 🎓 Learning Path

1. **Read** [SDK README](./packages/fhevm-sdk/README.md) (5 min)
2. **Explore** [Cultural Crowdfunding](./examples/cultural-crowdfunding/README.md) (10 min)
3. **Study** [Next.js Showcase](./examples/nextjs-showcase/README.md) (10 min)
4. **Build** your own dApp (∞)

## 💡 Key Concepts

### Encryption

```tsx
const { encryptU32, encryptU64, encryptBool } = useEncrypt();

// Encrypt different types
const encrypted32 = await encryptU32(42, contractAddress);
const encrypted64 = await encryptU64(1000n, contractAddress);
const encryptedBool = await encryptBool(true, contractAddress);
```

### Decryption

```tsx
const { userDecrypt, publicDecrypt } = useDecrypt();

// User decrypt (requires signature)
const decrypted = await userDecrypt(contractAddress, handle);

// Public decrypt (no signature)
const publicValue = await publicDecrypt(contractAddress, handle);
```

### Smart Contract Integration

```tsx
// Send encrypted value to contract
const encrypted = await encryptU64(amount, contractAddress);

const tx = await contract.someFunction(
  encrypted.handles[0],     // Encrypted value
  encrypted.inputProof      // Proof of encryption
);

await tx.wait();
```

## 🚀 Available Commands

### Root Level

```bash
npm install              # Install all dependencies
npm run build:sdk        # Build SDK package
npm run dev:cultural     # Run cultural crowdfunding
npm run dev:nextjs       # Run Next.js showcase
npm run clean            # Clean all node_modules
```

### SDK Package

```bash
cd packages/fhevm-sdk
npm run build           # Build SDK
npm run dev             # Watch mode
npm test                # Run tests
npm run lint            # Lint code
```

### Examples

```bash
cd examples/[example-name]
npm install             # Install dependencies
npm run dev             # Development server
npm run build           # Production build
npm run lint            # Lint code
```

## 🔍 Example Comparison

### Cultural Crowdfunding
- ✅ Real smart contract included
- ✅ Deployed on Sepolia
- ✅ Complete dApp workflow
- 🎯 Best for: Learning full FHE workflow

### Next.js Showcase
- ✅ Multiple scenarios (voting, auction, messaging)
- ✅ Next.js 14 App Router
- ✅ Production-ready patterns
- 🎯 Best for: Framework integration

## 🐛 Troubleshooting

### Issue: SDK not found

**Solution:**
```bash
npm run build:sdk
```

### Issue: Contract not found

**Solution:**
1. Check `.env.local` has correct contract address
2. Ensure MetaMask is on Sepolia network
3. Verify contract is deployed

### Issue: Transaction fails

**Solution:**
1. Check you have Sepolia testnet ETH
2. Verify wallet is connected
3. Check gas settings
4. Review contract function requirements

## 📞 Get Help

- 📖 [Full Documentation](./README.md)
- 💬 [GitHub Issues](https://github.com/your-repo/fhevm-toolkit/issues)
- 📺 [Video Demo](./demo.mp4)
- 🔗 [Zama Docs](https://docs.zama.ai/)

## ✨ Next Steps

1. **Understand the SDK**
   - Read [SDK README](./packages/fhevm-sdk/README.md)
   - Review type definitions
   - Check API reference

2. **Run Examples**
   - Try cultural crowdfunding
   - Experiment with Next.js showcase
   - Modify code to learn

3. **Build Your dApp**
   - Install SDK in your project
   - Implement encryption
   - Deploy to testnet

4. **Go Production**
   - Audit smart contracts
   - Test thoroughly
   - Deploy to mainnet

---

**Ready to build confidential dApps? Start coding! 🚀**

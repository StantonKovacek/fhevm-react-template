# FHEVM SDK Examples

This directory contains example applications demonstrating the FHEVM SDK in different scenarios and frameworks.

## 📁 Available Examples

### 1. Cultural Crowdfunding Platform

**Directory:** `cultural-crowdfunding/`

**Description:** Privacy-preserving crowdfunding platform for cultural projects using FHE technology.

**Key Features:**
- 🎨 Anonymous encrypted contributions
- 📊 Public project tracking (backer count)
- 💰 Private donation amounts
- ⏰ Time-limited campaigns (7-90 days)
- 🔄 Automatic refunds for failed projects
- 🏛️ 10+ cultural categories

**Technology Stack:**
- Solidity smart contract with FHE
- FHEVM SDK integration
- Deployed on Sepolia testnet

**Files:**
- `AnonymousCulturalCrowdfunding.sol` - Smart contract
- `package.json` - Dependencies
- `README.md` - Detailed setup guide

**Live Demo:**
- Contract: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
- Network: Sepolia (Chain ID: 11155111)
- [View on Etherscan](https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da)

**Quick Start:**
```bash
cd cultural-crowdfunding
npm install
npm run dev
```

---

### 2. Next.js Showcase

**Directory:** `nextjs-showcase/`

**Description:** Complete Next.js 14 application demonstrating FHEVM SDK integration patterns.

**Key Features:**
- ⚛️ Next.js 14 App Router
- 🎨 Tailwind CSS styling
- 🔐 Multiple encryption scenarios
- 📱 Responsive design
- 🪝 React hooks examples
- 🎯 Production-ready architecture

**Scenarios Demonstrated:**
1. **Voting System** - Confidential voting
2. **Private Auction** - Sealed bid auctions
3. **Secret Messaging** - Encrypted communications

**Technology Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- FHEVM SDK

**Files:**
- `package.json` - Dependencies
- `README.md` - Integration guide

**Quick Start:**
```bash
cd nextjs-showcase
npm install
npm run dev
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH

### Installation

From the root directory:

```bash
# Install all dependencies
npm install

# Build the SDK
npm run build:sdk

# Run specific example
npm run dev:cultural      # Cultural Crowdfunding
npm run dev:nextjs        # Next.js Showcase
```

### Configuration

Each example requires environment variables. Copy `.env.example` to `.env.local`:

```bash
cd examples/[example-name]
cp ../../.env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
NEXT_PUBLIC_KMS_ADDRESS=0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

## 📚 Documentation

Each example includes comprehensive documentation:

- **README.md** - Setup and usage guide
- **Code comments** - Inline documentation
- **Type definitions** - TypeScript support

## 🎓 Learning Path

**Recommended order for learning:**

1. **Start with SDK Documentation**
   - Read `packages/fhevm-sdk/README.md`
   - Understand core concepts
   - Review API reference

2. **Explore Cultural Crowdfunding**
   - Real-world dApp example
   - Complete smart contract
   - Frontend integration

3. **Study Next.js Showcase**
   - Framework integration patterns
   - Multiple use cases
   - Production architecture

4. **Build Your Own**
   - Use examples as templates
   - Adapt to your use case
   - Deploy your dApp

## 🔧 Common Patterns

### 1. Provider Setup

All examples use the FHEVM Provider:

```tsx
import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

<FhevmProvider config={fhevmConfig}>
  <App />
</FhevmProvider>
```

### 2. Initialization

Initialize the FHEVM client on mount:

```tsx
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";

const { initialize, isInitialized } = useFhevmClient();

useEffect(() => {
  const provider = new BrowserProvider(window.ethereum);
  initialize(provider);
}, []);
```

### 3. Encryption

Encrypt values before sending to contract:

```tsx
import { useEncrypt } from "@fhevm-toolkit/sdk/react";

const { encryptU64 } = useEncrypt();
const encrypted = await encryptU64(amount, contractAddress);

await contract.someFunction(
  encrypted.handles[0],
  encrypted.inputProof
);
```

### 4. Decryption

Decrypt encrypted data from contract:

```tsx
import { useDecrypt } from "@fhevm-toolkit/sdk/react";

const { userDecrypt } = useDecrypt();
const handle = await contract.getEncryptedValue();
const decrypted = await userDecrypt(contractAddress, handle);
```

## 🛠️ Development Tips

### Testing

Run tests in each example:

```bash
cd examples/[example-name]
npm test
```

### Building

Build for production:

```bash
cd examples/[example-name]
npm run build
```

### Deployment

Deploy to Vercel or other platforms:

```bash
cd examples/[example-name]
vercel
```

## 📊 Example Comparison

| Feature | Cultural Crowdfunding | Next.js Showcase |
|---------|---------------------|------------------|
| **Framework** | React/Next.js | Next.js 14 |
| **Complexity** | ⭐⭐⭐ | ⭐⭐ |
| **Smart Contract** | ✅ Included | ❌ Demo only |
| **Live Deployment** | ✅ Sepolia | ✅ Vercel |
| **Use Case** | Real dApp | Integration patterns |
| **Learning Focus** | Complete workflow | Framework integration |

## 🆘 Troubleshooting

### Common Issues

**1. SDK Not Found**
```bash
# Build SDK first
npm run build:sdk
```

**2. Environment Variables Missing**
```bash
# Copy and configure .env.local
cp .env.example .env.local
```

**3. MetaMask Not Connected**
- Install MetaMask extension
- Switch to Sepolia network
- Ensure you have testnet ETH

**4. Contract Interaction Fails**
- Check contract address in .env.local
- Verify network is Sepolia
- Ensure wallet is connected

### Getting Help

- Check example README files
- Review SDK documentation
- Open GitHub issue
- Contact support team

## 🔗 Additional Resources

- [Main Documentation](../README.md)
- [SDK Documentation](../packages/fhevm-sdk/README.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Video Demo](../DEMO.md)

## 📝 Contributing Examples

Want to add your own example?

1. Create new directory in `examples/`
2. Add package.json and README.md
3. Implement SDK integration
4. Test thoroughly
5. Submit pull request

**Example Template:**
```
examples/your-example/
├── package.json
├── README.md
├── src/
└── ... (your code)
```

## 📄 License

All examples are licensed under MIT License.

---

**Need Help?** Check the individual example READMEs for detailed guides.

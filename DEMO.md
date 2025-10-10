# Video Demo Script - FHEVM Toolkit

## Demo Video: `demo.mp4`

### Duration: 5-7 minutes

## Video Structure

### 1. Introduction (30 seconds)
"Welcome to the FHEVM Toolkit - a universal SDK for building confidential dApps with ease."

**Show:**
- Project repository homepage
- README overview
- Project structure

### 2. SDK Overview (1 minute)
"The toolkit provides a framework-agnostic core with React adapters, following a wagmi-like structure."

**Show:**
- `packages/fhevm-sdk` directory
- Key files: client.ts, provider.tsx, encryption.ts
- README with API documentation

**Highlight:**
- Less than 10 lines to get started
- Works with React, Vue, Next.js, Node.js
- Complete encryption/decryption workflow

### 3. Installation & Setup (1 minute)
"Getting started is incredibly simple."

**Terminal Commands:**
```bash
# Clone repository
git clone https://github.com/your-repo/fhevm-toolkit
cd fhevm-toolkit

# Install dependencies
npm install

# Build SDK
npm run build:sdk
```

**Show:**
- Installation process
- Workspace structure
- Build output

### 4. SDK Usage - React Example (1.5 minutes)
"Let's see how easy it is to use the SDK in a React application."

**Code Walkthrough:**

```tsx
// 1. Provider Setup
import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

<FhevmProvider config={fhevmConfig}>
  <App />
</FhevmProvider>

// 2. Use Hooks
import { useEncrypt, useDecrypt } from "@fhevm-toolkit/sdk/react";

function MyComponent() {
  const { encryptU64 } = useEncrypt();
  const { userDecrypt } = useDecrypt();

  // Encrypt
  const encrypted = await encryptU64(1000n, contractAddress);

  // Decrypt
  const decrypted = await userDecrypt(contractAddress, handle);
}
```

**Show:**
- VS Code with the code
- TypeScript autocomplete
- Type definitions

### 5. Example 1: Cultural Crowdfunding (2 minutes)
"Let's look at our first real-world example - a privacy-preserving crowdfunding platform."

**Show:**
```bash
npm run dev:cultural
```

**Demo the App:**
1. **Homepage** - Show platform statistics
2. **Create Project**
   - Fill in project details
   - Set funding goal
   - Submit transaction
3. **Make Contribution**
   - Select a project
   - Enter contribution amount (encrypted)
   - Add support message
   - Contribute anonymously
4. **View My Contributions**
   - Click "View My Contribution"
   - Decrypt amount with signature
   - Show decrypted value

**Highlight:**
- Encrypted contribution amounts
- Public project progress
- Private individual contributions
- EIP-712 signature for decryption

**Show Contract on Etherscan:**
- Navigate to `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
- Show verified contract
- View recent transactions

### 6. Example 2: Next.js Showcase (1.5 minutes)
"Our Next.js showcase demonstrates multiple integration patterns."

**Show:**
```bash
npm run dev:nextjs
```

**Demo the App:**
1. **Encryption Demo**
   - Connect wallet
   - Initialize FHEVM
   - Encrypt different types (uint32, uint64, bool)
   - Show encrypted output

2. **Decryption Demo**
   - Input encrypted handle
   - User decrypt with signature
   - Public decrypt
   - Display decrypted value

3. **Scenarios**
   - Voting scenario
   - Auction scenario
   - Messaging scenario

**Highlight:**
- Next.js 14 App Router
- Server/Client components
- Tailwind CSS styling
- Multiple use cases

### 7. Framework Flexibility (45 seconds)
"The SDK works with any framework."

**Show Code Examples:**

```typescript
// Vue.js
import { FhevmClient } from "@fhevm-toolkit/sdk";
const client = new FhevmClient(config);

// Node.js
import { FhevmClient } from "@fhevm-toolkit/sdk";
const client = new FhevmClient(config);
await client.initialize(provider);
```

**Highlight:**
- Framework-agnostic core
- React adapters optional
- Same API everywhere

### 8. Documentation & Resources (30 seconds)
"Everything is well documented."

**Show:**
- Main README.md
- SDK package README
- Example READMEs
- API documentation
- TypeScript types

### 9. Conclusion (30 seconds)
"The FHEVM Toolkit provides everything you need to build confidential dApps."

**Summary Points:**
- ✅ Universal SDK package
- ✅ Quick setup (< 10 lines)
- ✅ Complete FHE workflow
- ✅ Multiple examples
- ✅ Framework support
- ✅ Production ready

**Call to Action:**
- "Check out the repository"
- "Try the examples"
- "Build your confidential dApp"

**Show:**
- Repository URL
- Documentation links
- Live deployments

## Recording Tips

### Setup
- Screen resolution: 1920x1080
- Recording software: OBS Studio / Screen Studio
- Microphone: Clear audio quality
- Background: Clean desktop

### During Recording
- Speak clearly and at moderate pace
- Show keyboard shortcuts on screen
- Use cursor highlights
- Zoom in on important code sections
- Add captions for key points

### Editing
- Add intro/outro graphics
- Include timestamps
- Add text overlays for URLs
- Include background music (optional)
- Export in 1080p, 30fps

## Key Messages

1. **Easy to Use** - Less than 10 lines of code to get started
2. **Framework Agnostic** - Works everywhere
3. **Complete Workflow** - Encryption, decryption, contract interaction
4. **Production Ready** - Real examples, live deployments
5. **Well Documented** - Clear guides and API reference

## Demo Checklist

Before Recording:
- [ ] All examples running
- [ ] MetaMask connected to Sepolia
- [ ] Testnet ETH available
- [ ] Clean browser (clear cache, close tabs)
- [ ] IDE configured (font size, theme)
- [ ] Documentation prepared
- [ ] Backup wallet for demo
- [ ] Test run to check timing

During Recording:
- [ ] Start with repository homepage
- [ ] Show project structure
- [ ] Demonstrate installation
- [ ] Show code examples
- [ ] Run Cultural Crowdfunding demo
- [ ] Run Next.js Showcase demo
- [ ] Highlight key features
- [ ] Show documentation
- [ ] Conclude with summary

After Recording:
- [ ] Review footage
- [ ] Add captions/annotations
- [ ] Include links in description
- [ ] Export in high quality
- [ ] Upload and share link

## Additional Content Ideas

### Bonus Segments (if time permits)

**TypeScript Support:**
- Show autocomplete
- Type checking
- Interface definitions

**Error Handling:**
- Try-catch blocks
- Retry logic
- User-friendly messages

**Performance:**
- Fast initialization
- Efficient encryption
- Optimized builds

**Security:**
- EIP-712 signatures
- Permission management
- Best practices

## Links to Include in Description

- Repository: https://github.com/your-repo/fhevm-toolkit
- Live Demo: https://cultural-crowdfunding.vercel.app
- Next.js Demo: https://fhevm-showcase.vercel.app
- Documentation: Link to README
- Zama Docs: https://docs.zama.ai/
- FHEVM: https://github.com/zama-ai/fhevm

## Video Thumbnail Ideas

1. "FHEVM Toolkit" text with encryption icon
2. Code snippet with "< 10 lines" overlay
3. "Universal SDK" with framework logos
4. Split screen: Code + Running app

---

**Goal:** Create an engaging, informative demo that showcases the SDK's ease of use, completeness, and real-world applications.

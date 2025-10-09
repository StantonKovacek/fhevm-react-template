# Frontend Integration Guide - FHEVM SDK

Complete guide for frontend integration with FHEVM SDK in all examples.

## ✅ Integration Status

### Cultural Crowdfunding Example
**Status:** ✅ **Complete with Full SDK Integration**

**Frontend Stack:**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- FHEVM SDK (@fhevm-toolkit/sdk)
- TypeScript

**Components Created:**
1. ✅ `app/layout.tsx` - Root layout with FhevmProvider
2. ✅ `app/page.tsx` - Main dashboard
3. ✅ `app/globals.css` - Global styles with Tailwind
4. ✅ `ConnectWallet.tsx` - Wallet connection with SDK
5. ✅ `ProjectList.tsx` - Display projects with real contract data
6. ✅ `CreateProject.tsx` - Create projects using SDK
7. ✅ `ContributeForm.tsx` - Anonymous contributions with FHE encryption

**SDK Integration Points:**
```tsx
// 1. Provider Setup (app/layout.tsx)
import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

<FhevmProvider config={fhevmConfig}>
  <App />
</FhevmProvider>

// 2. Initialize Client
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";
const { initialize, isInitialized } = useFhevmClient();
await initialize(provider);

// 3. Encrypt Contributions
import { useEncrypt } from "@fhevm-toolkit/sdk/react";
const { encryptU64 } = useEncrypt();
const encrypted = await encryptU64(amount, contractAddress);

// 4. Set Signer
import { useFhevmSigner } from "@fhevm-toolkit/sdk/react";
const { setSigner } = useFhevmSigner();
setSigner(signer);
```

**Features Implemented:**
- ✅ Wallet connection (MetaMask)
- ✅ FHEVM initialization on app load
- ✅ Project browsing with real contract data
- ✅ Project creation with transaction
- ✅ Anonymous contributions with FHE
- ✅ Real-time status updates
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

**Files:**
```
cultural-crowdfunding/
├── app/
│   ├── layout.tsx                      ✅ FhevmProvider setup
│   ├── page.tsx                        ✅ Main dashboard
│   └── globals.css                     ✅ Tailwind styles
├── src/
│   └── components/
│       ├── ConnectWallet.tsx           ✅ Wallet + SDK integration
│       ├── ProjectList.tsx             ✅ Contract reading
│       ├── CreateProject.tsx           ✅ Contract writing
│       └── ContributeForm.tsx          ✅ FHE encryption
├── next.config.js                      ✅ Next.js config
├── tailwind.config.js                  ✅ Tailwind config
└── package.json                        ✅ Dependencies updated
```

### Next.js Showcase Example
**Status:** ✅ **Complete with Full SDK Integration**

**Frontend Stack:**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- FHEVM SDK (@fhevm-toolkit/sdk)
- TypeScript

**Components Created:**
1. ✅ `app/layout.tsx` - Root layout with FhevmProvider
2. ✅ `app/page.tsx` - Feature showcase landing page with wallet connection
3. ✅ `app/encrypt/page.tsx` - Interactive encryption demo (uint32, uint64, bool)
4. ✅ `app/decrypt/page.tsx` - Decryption demo (user vs public decrypt)
5. ✅ `app/globals.css` - Global styles with Tailwind
6. ✅ `next.config.js` - Next.js configuration
7. ✅ `tailwind.config.js` - Tailwind configuration
8. ✅ `postcss.config.js` - PostCSS configuration

**SDK Integration Points:**
```tsx
// 1. Provider Setup (app/layout.tsx)
import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

<FhevmProvider config={fhevmConfig}>
  <App />
</FhevmProvider>

// 2. Encryption Demo (app/encrypt/page.tsx)
import { useEncrypt } from "@fhevm-toolkit/sdk/react";
const { encryptU32, encryptU64, encryptBool } = useEncrypt();
const encrypted = await encryptU32(value, contractAddress);

// 3. Decryption Demo (app/decrypt/page.tsx)
import { useDecrypt } from "@fhevm-toolkit/sdk/react";
const { userDecrypt, publicDecrypt } = useDecrypt();
const decrypted = await userDecrypt(contractAddress, handle);
```

**Features Implemented:**
- ✅ FHEVM initialization on app load
- ✅ Wallet connection (MetaMask)
- ✅ Interactive encryption demo for all types
- ✅ User vs public decryption comparison
- ✅ Status indicators (FHEVM ready, wallet connected)
- ✅ Comprehensive educational content
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ Loading states

**Files:**
```
nextjs-showcase/
├── app/
│   ├── layout.tsx                      ✅ FhevmProvider setup
│   ├── page.tsx                        ✅ Landing page
│   ├── globals.css                     ✅ Tailwind styles
│   ├── encrypt/
│   │   └── page.tsx                    ✅ Encryption demo
│   └── decrypt/
│       └── page.tsx                    ✅ Decryption demo
├── next.config.js                      ✅ Next.js config
├── tailwind.config.js                  ✅ Tailwind config
├── postcss.config.js                   ✅ PostCSS config
├── .env.example                        ✅ Environment variables
└── package.json                        ✅ Dependencies updated
```

## 🎯 SDK Integration Patterns

### Pattern 1: Provider Setup (All Examples)

```tsx
// app/layout.tsx or _app.tsx
"use client";

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

### Pattern 2: Client Initialization

```tsx
// In any component
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";

function MyComponent() {
  const { initialize, isInitialized } = useFhevmClient();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        await initialize(provider);
      }
    };
    init();
  }, []);

  if (!isInitialized) {
    return <div>Initializing FHEVM...</div>;
  }

  return <div>Ready!</div>;
}
```

### Pattern 3: Encryption

```tsx
import { useEncrypt } from "@fhevm-toolkit/sdk/react";

function EncryptDemo() {
  const { encryptU32, encryptU64, encryptBool } = useEncrypt();

  const handleEncrypt = async () => {
    // Encrypt different types
    const enc32 = await encryptU32(42, contractAddress);
    const enc64 = await encryptU64(1000n, contractAddress);
    const encBool = await encryptBool(true, contractAddress);

    // Use in contract
    await contract.someFunction(
      enc64.handles[0],
      enc64.inputProof
    );
  };
}
```

### Pattern 4: Decryption

```tsx
import { useDecrypt } from "@fhevm-toolkit/sdk/react";

function DecryptDemo() {
  const { userDecrypt, publicDecrypt } = useDecrypt();

  const handleDecrypt = async (handle: bigint) => {
    // User decrypt (requires signature)
    const value = await userDecrypt(contractAddress, handle);

    // Or public decrypt (no signature)
    const publicValue = await publicDecrypt(contractAddress, handle);

    return value;
  };
}
```

### Pattern 5: Wallet Connection + Signer

```tsx
import { useFhevmSigner } from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";

function WalletConnect() {
  const { setSigner } = useFhevmSigner();

  const connect = async () => {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    // Set signer in FHEVM client
    setSigner(signer);
  };
}
```

## 📦 Required Dependencies

All examples need these dependencies:

```json
{
  "dependencies": {
    "@fhevm-toolkit/sdk": "workspace:*",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "ethers": "^6.11.0",
    "fhevmjs": "^0.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33"
  }
}
```

## 🚀 Running Examples

### Cultural Crowdfunding

```bash
cd examples/cultural-crowdfunding
npm install
npm run dev
```

Open: http://localhost:3000

### Next.js Showcase

```bash
cd examples/nextjs-showcase
npm install
npm run dev
```

Open: http://localhost:3001

## 🎨 UI Components

### Wallet Connection Button

```tsx
<button onClick={connect} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
  {connected ? `${address.slice(0,6)}...${address.slice(-4)}` : "Connect Wallet"}
</button>
```

### FHEVM Status Indicator

```tsx
<div className="flex items-center space-x-2">
  <div className={`w-2 h-2 rounded-full ${isInitialized ? "bg-green-500" : "bg-yellow-500"}`} />
  <span>FHEVM: {isInitialized ? "✅ Ready" : "⏳ Initializing..."}</span>
</div>
```

### Loading States

```tsx
{isSubmitting && (
  <div className="flex items-center space-x-2">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
    <span>Processing...</span>
  </div>
)}
```

## 🔧 Environment Configuration

Create `.env.local` in each example:

```env
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
NEXT_PUBLIC_KMS_ADDRESS=0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_CROWDFUNDING_CONTRACT=0x659b4d354550ADCf46cf1392148DE42C16E8E8Da
```

## ✅ Integration Checklist

For each example:

- [x] FhevmProvider setup in layout
- [x] Client initialization on mount
- [x] Wallet connection component
- [x] Signer setup after connection
- [x] Encryption in forms
- [x] Contract interaction
- [x] Error handling
- [x] Loading states
- [x] Responsive design
- [x] TypeScript types
- [x] Environment configuration
- [x] Package.json updated

## 🎯 Next Steps

1. ✅ **Cultural Crowdfunding** - Complete
2. ✅ **Next.js Showcase** - Complete
3. 📝 Update example READMEs with frontend details
4. 🎬 Record demo video showing frontend interactions
5. 🚀 Deploy to Vercel

---

**Status:** Both Cultural Crowdfunding and Next.js Showcase fully integrated with FHEVM SDK. All examples now have complete frontend implementations.

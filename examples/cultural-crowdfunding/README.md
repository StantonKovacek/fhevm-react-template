# Cultural Crowdfunding Platform

Privacy-preserving crowdfunding platform for cultural projects using FHE technology.

## Overview

This example demonstrates how to build a confidential crowdfunding platform using the FHEVM SDK. Contributors can make anonymous donations with encrypted amounts, while maintaining full transparency of project operations.

## Features

- 🎨 **10+ Cultural Categories**: Support for arts, music, literature, film, and more
- 🔐 **Private Contributions**: Donation amounts encrypted end-to-end
- 📊 **Public Progress**: Track backer count without revealing amounts
- ⏰ **Time-Limited Campaigns**: 7-90 day funding periods
- 💰 **Automatic Refunds**: Failed projects return funds automatically
- 🛡️ **FHE Security**: Zama's FHE technology ensures privacy

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## SDK Integration

This example uses `@fhevm-toolkit/sdk` for all FHE operations:

### 1. Provider Setup

```tsx
import { FhevmProvider } from "@fhevm-toolkit/sdk/react";

<FhevmProvider config={fhevmConfig}>
  <App />
</FhevmProvider>
```

### 2. Encrypt Contributions

```tsx
import { useEncrypt } from "@fhevm-toolkit/sdk/react";

const { encryptU64 } = useEncrypt();

const contribute = async (amount: bigint) => {
  const encrypted = await encryptU64(amount, CONTRACT_ADDRESS);

  await contract.contributeAnonymously(
    projectId,
    message,
    encrypted.handles[0],
    encrypted.inputProof,
    { value: amount }
  );
};
```

### 3. Decrypt User Data

```tsx
import { useDecrypt } from "@fhevm-toolkit/sdk/react";

const { userDecrypt } = useDecrypt();

const viewMyContribution = async () => {
  const handle = await contract.getMyContribution(projectId);
  const amount = await userDecrypt(CONTRACT_ADDRESS, handle);
  setMyAmount(amount);
};
```

## Smart Contract

The platform uses a Solidity smart contract with FHE capabilities:

```solidity
contract CulturalCrowdfundingPlatform {
    // Encrypted contribution amounts
    mapping(uint32 => mapping(address => euint64)) contributions;

    // Encrypted project funding progress
    mapping(uint32 => euint64) currentAmounts;

    function contributeAnonymously(
        uint32 projectId,
        string calldata message,
        bytes calldata encryptedAmount,
        bytes calldata inputProof
    ) external payable;
}
```

## Architecture

```
┌─────────────────┐
│   Next.js App   │
│                 │
│  ┌───────────┐  │
│  │ FHEVM SDK │  │  ← Universal encryption/decryption
│  └───────────┘  │
│        ↓        │
│  ┌───────────┐  │
│  │  Contract │  │  ← FHE-enabled Solidity
│  └───────────┘  │
└─────────────────┘
```

## Project Structure

```
cultural-crowdfunding/
├── AnonymousCulturalCrowdfunding.sol  # Smart contract
├── app/                                # Next.js app
├── components/                         # React components
├── hooks/                             # Custom hooks
└── utils/                             # Helper functions
```

## Contract Deployment

Contract is deployed on Sepolia testnet:
- **Address**: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da`
- **Network**: Sepolia (Chain ID: 11155111)
- **Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x659b4d354550ADCf46cf1392148DE42C16E8E8Da)

## Usage Examples

### Create a Project

```tsx
const createProject = async () => {
  const tx = await contract.createProject(
    title,
    description,
    category,
    targetAmount,
    fundingPeriod,
    metadataHash
  );
  await tx.wait();
};
```

### Browse Projects

```tsx
const projects = await contract.getPlatformStats();
// Returns: totalProjects, activeProjects, successfulProjects, failedProjects
```

### Contribute with Privacy

```tsx
const encrypted = await encryptU64(contributionAmount, CONTRACT_ADDRESS);

await contract.contributeAnonymously(
  projectId,
  "Supporting this amazing project!",
  encrypted.handles[0],
  encrypted.inputProof,
  { value: contributionAmount }
);
```

## Key Benefits of Using FHEVM SDK

1. **Simple API**: No need to manage fhevmjs directly
2. **React Hooks**: Wagmi-like experience for React developers
3. **Type Safety**: Full TypeScript support
4. **Error Handling**: Built-in retry logic and error management
5. **Best Practices**: Follow Zama's official guidelines

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama Documentation](https://docs.zama.ai/)
- [Contract Source Code](./AnonymousCulturalCrowdfunding.sol)

## License

MIT

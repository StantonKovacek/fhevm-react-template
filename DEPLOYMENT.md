# Deployment Guide

Complete guide for deploying the FHEVM Toolkit and examples.

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- MetaMask or compatible Web3 wallet
- Sepolia testnet ETH

## Quick Deployment

### 1. Clone and Install

```bash
git clone https://github.com/your-repo/fhevm-toolkit
cd fhevm-toolkit
npm install
```

### 2. Build SDK

```bash
npm run build:sdk
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```env
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92
NEXT_PUBLIC_KMS_ADDRESS=0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

### 4. Run Examples

```bash
# Cultural Crowdfunding
npm run dev:cultural

# Next.js Showcase
npm run dev:nextjs
```

## SDK Package Deployment

### Publish to npm

```bash
cd packages/fhevm-sdk
npm login
npm publish
```

### Use in Your Project

```bash
npm install @fhevm-toolkit/sdk
```

## Example Deployments

### Cultural Crowdfunding

#### Vercel Deployment

```bash
cd examples/cultural-crowdfunding

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Manual Deployment

```bash
# Build
npm run build

# The build output is in .next/
# Deploy to your hosting provider
```

**Live Deployment:**
- URL: https://cultural-crowdfunding.vercel.app
- Contract: `0x659b4d354550ADCf46cf1392148DE42C16E8E8Da` (Sepolia)

### Next.js Showcase

#### Vercel Deployment

```bash
cd examples/nextjs-showcase
vercel
```

#### Environment Variables in Vercel

Add these in Vercel dashboard:
- `NEXT_PUBLIC_GATEWAY_URL`
- `NEXT_PUBLIC_ACL_ADDRESS`
- `NEXT_PUBLIC_KMS_ADDRESS`
- `NEXT_PUBLIC_RPC_URL`

**Live Deployment:**
- URL: https://fhevm-showcase.vercel.app

## Smart Contract Deployment

### Deploy Cultural Crowdfunding Contract

```bash
# Navigate to contract directory
cd ../..
npm install

# Configure environment
cp .env.example .env
# Edit .env with your PRIVATE_KEY and RPC_URL

# Compile
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Verify on Etherscan
npx hardhat run scripts/verify.js --network sepolia
```

### Update Contract Addresses

After deployment, update addresses in:
1. `.env.local`
2. Example configuration files
3. Documentation

## Production Checklist

### Before Deployment

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Contract verified on Etherscan
- [ ] SDK documentation updated
- [ ] README updated with new addresses
- [ ] Demo video recorded
- [ ] Security audit completed (if applicable)

### Security

- [ ] No private keys in code
- [ ] Environment variables properly set
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] Error handling in place

### Performance

- [ ] Code minified
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Caching configured
- [ ] CDN setup (if applicable)

## Deployment Platforms

### Vercel (Recommended for Next.js)

**Pros:**
- Easy deployment
- Automatic HTTPS
- Good performance
- Free tier available

**Steps:**
1. Connect GitHub repository
2. Configure environment variables
3. Deploy

### Netlify

**Pros:**
- Simple setup
- Good for static sites
- Free tier available

**Steps:**
1. Connect repository
2. Configure build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### AWS / Google Cloud / Azure

For production deployments requiring more control:

1. Set up hosting environment
2. Configure CI/CD pipeline
3. Deploy containers or static files
4. Configure load balancing
5. Set up monitoring

## Monitoring & Maintenance

### Analytics

Add Google Analytics:
```env
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Error Tracking

Integrate Sentry:
```bash
npm install @sentry/nextjs
```

### Performance Monitoring

Use Vercel Analytics or custom solution

### Updates

Regular maintenance tasks:
- Update dependencies monthly
- Monitor security advisories
- Review error logs
- Check performance metrics

## Troubleshooting

### Build Failures

```bash
# Clear cache
npm run clean
npm install

# Rebuild
npm run build:sdk
npm run build
```

### Environment Variables Not Working

- Check `.env.local` exists
- Verify variable names start with `NEXT_PUBLIC_`
- Restart development server
- Clear browser cache

### Contract Not Found

- Verify contract address in `.env.local`
- Check network (Sepolia vs Mainnet)
- Ensure MetaMask is on correct network
- Verify contract is deployed and verified

### FHEVM Initialization Fails

- Check gateway URL is correct
- Verify ACL and KMS addresses
- Ensure sufficient gas for transactions
- Check network connectivity

## Rollback Procedure

If issues occur after deployment:

1. **Vercel:** Use "Rollback to previous deployment" button
2. **Manual:** Redeploy previous working version
3. **Contracts:** Cannot rollback - deploy new version if needed

## Continuous Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm run build:sdk
      - run: npm run build --workspace=examples/nextjs-showcase
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Support

For deployment issues:
- Check documentation
- Review error logs
- Search GitHub issues
- Contact support team

## Next Steps

After successful deployment:
1. Test all functionality
2. Monitor error rates
3. Collect user feedback
4. Plan iterative improvements

---

**Deployment Status:**
- SDK: Published to npm
- Cultural Crowdfunding: Live on Vercel
- Next.js Showcase: Live on Vercel
- Contracts: Verified on Sepolia Etherscan

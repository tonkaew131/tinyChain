# AkaraCarbon - Carbon Credit Marketplace

A decentralized marketplace for carbon credits using ERC1155 tokens. Developers can mint and sell carbon credits, while buyers can purchase from developers or trade in the secondary market.

## Features

- ERC1155 token standard for carbon credits
- Minting restricted to contract owner (verifier)
- Secondary market with listing and trading functionality
- Platform fee collection (2% default)
- Fee management system
- Real-time event tracking

## Setup

1. Install dependencies:
```bash
bun install
```

2. Configure environment:
- Copy `.env.example` to `.env`
- Add your Alchemy Sepolia API URL
- Add your wallet's private key

3. Compile contracts:
```bash
bun run hh:compile
```

4. Deploy to Sepolia:
```bash
bun run hh:deploy
```

## Contract Details

The `AkaraCarbon2` contract implements:
- Token minting (owner only)
- Token listing and trading
- Platform fee collection
- Event tracking for all operations

### Token Metadata URI
Tokens use the following URI format:
```
https://akaracarbon.athichal.com/api/token/{id}.json
```

## Development

This project uses:
- Hardhat for smart contract development
- OpenZeppelin v5.0.0 for contract standards
- Bun v1.2.1 as the JavaScript runtime

## Network

Currently deployed on Ethereum Sepolia testnet.

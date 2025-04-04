import path from 'node:path';

import { ethers } from 'ethers';

const contractPath =
    './src/contracts/artifacts/AkaraCarbon.sol/AkaraCarbon.json';
const contract = JSON.parse(await Bun.file(path.join(contractPath)).text());

const alchemyProvider = new ethers.AlchemyProvider(
    'sepolia',
    process.env.ALCHEMY_API_KEY
);

if (!process.env.WALLET_PRIVATE_KEY) {
    throw new Error('WALLET_PRIVATE_KEY is not set');
}

const signer = new ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY,
    alchemyProvider
);

if (!process.env.CONTRACT_ADDRESS) {
    throw new Error('CONTRACT_ADDRESS is not set');
}

export const akaraCarbonContract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    contract.abi,
    signer
);

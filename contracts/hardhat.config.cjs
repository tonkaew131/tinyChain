require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const { ALCHEMY_API_URL, WALLET_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.28',
    defaultNetwork: 'sepolia',
    networks: {
        hardhat: {},
        sepolia: {
            url: ALCHEMY_API_URL,
            accounts: [`0x${WALLET_PRIVATE_KEY}`],
            timeout: 500000, // in ms
        },
    },
};

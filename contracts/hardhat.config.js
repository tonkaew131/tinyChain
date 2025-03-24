import dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';

dotenv.config();

const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || '';
const ALCHEMY_SEPOLIA_URL = process.env.ALCHEMY_SEPOLIA_URL || '';

/** @type import('hardhat/config').HardhatUserConfig */
export default {
    solidity: {
        version: '0.8.20',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        sepolia: {
            url: ALCHEMY_SEPOLIA_URL,
            accounts: [SEPOLIA_PRIVATE_KEY]
        }
    }
};

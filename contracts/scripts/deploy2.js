import hardhat from 'hardhat';

async function main() {
    // Get the contract factory
    const AkaraCarbon2Contract = await hardhat.ethers.getContractFactory('AkaraCarbon2');

    // Get the deployer's address to use as initial fee recipient
    const [deployer] = await hardhat.ethers.getSigners();
    
    // Deploy the contract with the deployer as initial fee recipient
    const akaraCarbon = await AkaraCarbon2Contract.deploy(deployer.address);
    await akaraCarbon.deployed();

    console.log('AkaraCarbon2 contract deployed to:', akaraCarbon.address);
    console.log('Initial fee recipient (deployer):', deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

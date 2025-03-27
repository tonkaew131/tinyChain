import hardhat from 'hardhat';

async function main() {
    const AkaraCarbonContract =
        await hardhat.ethers.getContractFactory('AkaraCarbon');

    const akaraCarbon = await AkaraCarbonContract.deploy(
        '0x97026aB36D34E4a10732957CeB155112f3547F5C'
    );
    console.log('Contract deployed to address:', await akaraCarbon.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

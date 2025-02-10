import hardhat from 'hardhat';

async function main() {
    const HelloWorldContract =
        await hardhat.ethers.getContractFactory('HelloWorld');

    const helloWorld = await HelloWorldContract.deploy('Hello World!');
    console.log('Contract deployed to address:', await helloWorld.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

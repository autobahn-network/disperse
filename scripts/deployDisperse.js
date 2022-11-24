require("@nomiclabs/hardhat-web3");

task('deployDisperse', 'Deploys the bulk sender')
  .setAction(async () => {
    console.info('Deploying Disperse...');
    const Disperse = await hre.ethers.getContractFactory('Disperse');
    const disperse = await Disperse.deploy();
    await disperse.deployed();
    console.info(`Deployed Disperse at ${disperse.address}`);
  });

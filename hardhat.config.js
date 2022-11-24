require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ganache');
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require('dotenv').config()

// importing our custom tasks
require('./scripts/deployDisperse');

const AUTOBAHN_RPC_URL = process.env.AUTOBAHN_RPC_URL
const AUTOBAHN_PRIVATE_KEY = process.env.AUTOBAHN_PRIVATE_KEY

const optimizeSettings = {
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000
    }
  }
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  defaultNetwork: 'ganache',
  etherscan: {
    apiKey: {
      autobahn: "no-API-key-needed", // no API key needed
    },
    customChains: [
      {
        network: "autobahn",
        chainId: 45000,
        urls: {
          apiURL: "https://api.autobahn-explorer.com/api",
          browserURL: "https://autobahn-explorer.com",
        },
      },
    ],
  },
  networks: {
    ganache: {
      allowUnlimitedContractSize: true,
      gasLimit: 6721975 * 10, // increase the gas limit by 10
      url: 'http://127.0.0.1:7545'
    },
    autobahn: {
      accounts: [`0x${AUTOBAHN_PRIVATE_KEY}`],
      url: AUTOBAHN_RPC_URL
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.4.25',
        ...optimizeSettings,
      }
    ],
  }
};


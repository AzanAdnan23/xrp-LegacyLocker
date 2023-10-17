require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    evmSidechain: {
      url: 'https://rpc-evm-sidechain.xrpl.org',
      chainId: 1440002,
      gasPrice: 20000000000, // 20 Gwei
      accounts: [
       '36be50660cebf0eb609ee223ccd668648553c12867f03832dd74655c2ba1b338'
      ]
    }
  },
  defaultNetwork: 'evmSidechain'
};

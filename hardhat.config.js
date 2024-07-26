require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */
task("accounts","Prints all the hardhat accounts", async (taskArgs,hre) =>{
  const accounts = await hre.ethers.getSigners()
  
  for(const account of accounts){
    console.log(account.address)
  }
})


const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
module.exports = {
  solidity: "0.8.7",
  networks:{
    sepolia: {
      url : SEPOLIA_RPC_URL,
      accounts : [SEPOLIA_PRIVATE_KEY],
      chainid : 11155111,
    },
    localhost:{
      url : "http://127.0.0.1:8545/",
      // accounts is automatically given from localhost accounts by hardhat.
      chainid : 31337,
    }
  },
  etherscan :{
    apiKey : ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled :true,
    outputFile : "gas-reporter.txt",
    noColors : true,
    currency: "USD",
    gasPrice: 142.128476309,
    coinmarketcap : COINMARKETCAP_API_KEY,
  },
};

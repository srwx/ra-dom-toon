const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
require("dotenv").config({ path: "../.env" })

const compiledFactory = require("../build/CampaignFactory.json")

console.log(process.env.PHRASE, process.env.RINKEBY_API)

provider = new HDWalletProvider(process.env.PHRASE, process.env.RINKEBY_API)

const web3 = new Web3(provider)

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts()

    console.log("Attempting to deploy from account", accounts[0])

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
      .send({ from: accounts[0] })

    console.log("Contract deployed to", result.options.address)

    provider.engine.stop()
  } catch (err) {
    console.log(err)
  }
}

deploy()

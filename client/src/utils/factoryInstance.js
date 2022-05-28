import web3 from "./web3"
import deployedFactory from "../build/CampaignFactory.json"

const deployedAddress = "0xC375eA44e8e9260bdC7278a77Abe4188CB7508ec"

const factoryInstance = new web3.eth.Contract(
  deployedFactory.abi,
  deployedAddress
)

export default factoryInstance

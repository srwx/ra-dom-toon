import web3 from "./web3";
import deployedFactory from "../build/CampaignFactory.json";

const deployedAddress = "0x0E8aD90A3B8af9c39c42572ab8F320295d35876c";

const factoryInstance = new web3.eth.Contract(
  deployedFactory.abi,
  deployedAddress
);

export default factoryInstance;

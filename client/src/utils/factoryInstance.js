import web3 from "./web3";
import deployedFactory from "../build/CampaignFactory.json";

const deployedAddress = "0x101F4E15e03C41Ac985e8Af5b6783504CD508da8";

const factoryInstance = new web3.eth.Contract(
  deployedFactory.abi,
  deployedAddress
);

export default factoryInstance;

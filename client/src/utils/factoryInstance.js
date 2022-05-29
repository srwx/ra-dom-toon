import web3 from "./web3";
import deployedFactory from "../build/CampaignFactory.json";

const deployedAddress = "0xd827Eb57d8B53a5eE1ad8A449E481AfbaBDA893D";

const factoryInstance = new web3.eth.Contract(
  deployedFactory.abi,
  deployedAddress
);

export default factoryInstance;

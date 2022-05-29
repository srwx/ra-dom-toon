import web3 from "./web3";
import deployedFactory from "../build/CampaignFactory.json";

const deployedAddress = "0x550d1284A63845dfa5953D4a65171BD8B8C64906";

const factoryInstance = new web3.eth.Contract(
  deployedFactory.abi,
  deployedAddress
);

export default factoryInstance;

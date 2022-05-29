import web3 from "./web3";
import deployedFactory from "../build/CampaignFactory.json";

const deployedAddress = "0xCCC0A51e54336c6161ba150fb9d9325650ac862F";

const factoryInstance = new web3.eth.Contract(
  deployedFactory.abi,
  deployedAddress
);

export default factoryInstance;

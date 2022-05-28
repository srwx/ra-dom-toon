/* This file return instance of Campaign contract */

import web3 from "./web3"
import Campaign from "../build/Campaign.json"

const campaignInstance = (address) => {
  return new web3.eth.Contract(Campaign.abi, address)
}

export default campaignInstance

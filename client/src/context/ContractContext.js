import React, { useEffect, useState } from "react";
import factoryInstance from "utils/factoryInstance";
import campaignInstance from "utils/campaignInstance";
// import Web3 from "web3";

export const ContractContext = React.createContext();

//extract ethereum object if user have metamask on their website
const { ethereum } = window;

export const ContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [Campaigns, setCampaigns] = useState([]);

  const accountWasChanged = (accounts) => {
    setCurrentAccount(accounts[0]);
    console.log("accountWasChanged");
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        //if user already connected to their metamask
        setCurrentAccount(accounts[0]);
      } else {
        //else poke their metamask pop-up
        ethereum.request({ method: "eth_requestAccounts" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  ethereum.on("accountsChanged", accountWasChanged);

  const fetchCampaigns = async () => {
    const campaignsList = [];
    const res = await factoryInstance.methods.getDeployedCampaigns().call();
    console.log(res);

    for (let i = 0; i < res[0].length; i++) {
      campaignsList.push({ address: res[0][i], name: res[1][i] });
    }
    setCampaigns(campaignsList);
  };

  //handle address user
  //for first time only
  useEffect(() => {
    checkIfWalletIsConnect();
    fetchCampaigns();
  }, []);

  //when change occur

  return (
    <ContractContext.Provider
      value={{ currentAccount, Campaigns, fetchCampaigns }}
    >
      {children}
    </ContractContext.Provider>
  );
};

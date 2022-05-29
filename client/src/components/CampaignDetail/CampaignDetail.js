import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import web3 from "utils/web3";
import styles from "./CampaignDetail.module.css";
import campaignInstance from "utils/campaignInstance";
import { ContractContext } from "context/ContractContext";

const ListItem = ({ title, value }) => (
  <div className={styles.listContainer}>
    <div className={styles.listTitle}>{title}</div>
    <div className={styles.listValue}>{value}</div>
  </div>
);

export default function CampaignDetail() {
  const [campaign, setCampaign] = useState({});
  const [input, setInput] = useState();
  const [isDonating, setIsDonating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTime, setCurrentTime] = useState();
  const { address } = useParams();
  const { currentAccount, fetchCampaigns } = useContext(ContractContext);

  const deployedCampaign = campaignInstance(address);

  const status = () => {
    if (currentTime > campaign.deadline && campaign.isContributed > 0) {
      return <button onClick={handleClaim}>Claim</button>;
    }
    if (campaign.isContributed > 0) {
      return <h4>You already donated</h4>;
    }
    if (currentTime < campaign.deadline && !campaign.isComplete) {
      return (
        <>
          {isDonating ? (
            <div className={styles.loader} />
          ) : (
            <>
              <input
                type="number"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button onClick={handleDonate}>Donate</button>
            </>
          )}
        </>
      );
    }
  };

  const fetchCampaign = async () => {
    const userAccounts = await web3.eth.getAccounts();
    const res = await deployedCampaign.methods.getCampaign().call({
      from: userAccounts[0],
    });

    /* Convert Wei to Ether */
    res[1] = web3.utils.fromWei(res[1], "ether"); /* Campaign balance */
    res[3] = web3.utils.fromWei(res[3], "ether"); /* Required balance */
    res[4] = web3.utils.fromWei(res[4], "ether"); /* Required donation */

    /* Destructuring response from contract to object */
    const data = {
      manager: res[0],
      balance: res[1],
      name: res[2],
      requiredBalance: res[3],
      requiredCost: res[4],
      contributorsCount: res[5],
      isComplete: res[6],
      deadline: res[7],
      isContributed: res[8],
    };
    setCampaign(data);
    setCurrentTime(Math.round(new Date().getTime() / 1000));
  };

  useEffect(() => {
    fetchCampaign();
  }, [currentAccount]);

  const handleDonate = async () => {
    setIsDonating(true);
    const donateWei = web3.utils.toWei(input, "ether");
    try {
      await deployedCampaign.methods.contribute().send({
        from: currentAccount,
        value: donateWei,
      });
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Error: failed to donate");
    }
    setIsDonating(false);
    fetchCampaign();
    fetchCampaigns();
  };

  const handleClaim = async () => {
    try {
      await deployedCampaign.methods.claim().send({
        from: currentAccount,
      });
      console.log("success");
      fetchCampaign();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <ListItem title="Campaign Address" value={address} />
      <ListItem title="Campaign name" value={campaign.name} />
      <ListItem title="Donation" value={campaign.balance} />
      <ListItem title="Goal" value={campaign.requiredBalance} />
      <ListItem title="Contributions" value={campaign.contributorsCount} />
      <div className={styles.errorMessage}>{errorMessage}</div>
      <div className={styles.donateContainer}></div>

      <div>{status()}</div>
    </div>
  );
}

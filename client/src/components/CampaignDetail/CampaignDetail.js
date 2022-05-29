import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import web3 from "utils/web3";
import styles from "./CampaignDetail.module.css";
import campaignInstance from "utils/campaignInstance";

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

  const deployedCampaign = campaignInstance(address);

  useEffect(() => {
    const fetchCampaign = async () => {
      const userAccount = await web3.eth.getAccounts();
      const res = await deployedCampaign.methods.getCampaign().call({
        from: userAccount[0],
      });
      console.log(res);

      /* Convert Wei to Ether */
      res[1] = web3.utils.fromWei(res[1], "ether"); /* Campaign balance */
      res[3] = web3.utils.fromWei(res[3], "ether"); /* Required balance */
      res[4] = web3.utils.fromWei(res[4], "ether"); /* Required donation */

      console.log(res[1]);
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

    fetchCampaign();
  }, []);

  const handleDonate = async () => {
    setIsDonating(true);
    const userAccount = await web3.eth.getAccounts();
    const donateWei = web3.utils.toWei(input, "ether");
    try {
      await deployedCampaign.methods.contribute().send({
        from: userAccount[0],
        value: donateWei,
      });
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Error: failed to donate");
    }
    setIsDonating(false);
  };

  const handleClaim = async () => {
    try {
      const userAccount = await web3.eth.getAccounts();
      await deployedCampaign.methods.claim().send({
        from: userAccount[0],
      });
      console.log("success");
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
      <div className={styles.donateContainer}>
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
      </div>

      <div>
        {currentTime > campaign.deadline && campaign.isContributed > 0 ? (
          <button onClick={handleClaim}>Claim</button>
        ) : null}
      </div>
    </div>
  );
}

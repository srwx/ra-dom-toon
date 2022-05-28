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
  const { address } = useParams();

  const deployedCampaign = campaignInstance(address);

  useEffect(() => {
    const fetchCampaign = async () => {
      const res = await deployedCampaign.methods.getCampaign().call();

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
      };

      setCampaign(data);
    };

    fetchCampaign();
  }, []);

  const handleDonate = async () => {
    const userAccount = await web3.eth.getAccounts();
    const donateWei = web3.utils.toWei(input, "ether");
    await deployedCampaign.methods.contribute(donateWei).send({
      from: userAccount[0],
      value: donateWei,
    });
    console.log("success");
  };

  return (
    <div className={styles.container}>
      <ListItem title="Campaign Address" value={address} />
      <ListItem title="Campaign name" value={campaign.name} />
      <ListItem title="Donation" value={campaign.balance} />
      <ListItem title="Goal" value={campaign.requiredBalance} />
      <ListItem title="Contributions" value={campaign.contributorsCount} />
      <div>
        <input
          type="number"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={handleDonate}>Donate</button>
      </div>
    </div>
  );
}

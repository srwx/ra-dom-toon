import Card from "components/Card";
import Popup from "components/Popup";
import { useState, useEffect } from "react";
import styles from "./Body.module.css";
import factoryInstance from "utils/factoryInstance";

export default function Body() {
  const [modalActive, setModalActive] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsList = [];
      const res = await factoryInstance.methods.getDeployedCampaigns().call();

      for (let i = 0; i < res[0].length; i++) {
        campaignsList.push({ address: res[0][i], name: res[1][i] });
      }
      setCampaigns(campaignsList);
    };

    fetchCampaigns();
  }, []);

  const toggleAddEventPopup = () => {
    setModalActive(!modalActive);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top_bar}>
        <div className={styles.header}>
          <div className={styles.shape} />
          <h2>Trending in RA DOM TOON</h2>
        </div>

        <div className={styles.button} onClick={toggleAddEventPopup}>
          Add event
        </div>
      </div>

      <div className={styles.cards_container}>
        {campaigns.map((campaign, index) => (
          <Card key={index} index={index} campaign={campaign} />
        ))}
      </div>

      {modalActive && <Popup closePopup={toggleAddEventPopup} />}
    </div>
  );
}

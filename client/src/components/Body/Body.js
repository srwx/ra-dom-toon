import Card from "components/Card";
import Popup from "components/Popup";
import { useState, useContext } from "react";
import styles from "./Body.module.css";
import { ContractContext } from "context/ContractContext";

export default function Body() {
  const [modalActive, setModalActive] = useState(false);
  const { campaigns } = useContext(ContractContext);
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

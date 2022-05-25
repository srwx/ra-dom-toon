import Card from "components/Card";
import Popup from "components/Popup";
import { useState } from "react";
import styles from "./Body.module.css";

const cards = ["card1", "card2", "card3"];

export default function Body() {
  const [modalActive, setModalActive] = useState(false);

  const handleAddEvent = () => {
    setModalActive(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top_bar}>
        <div className={styles.header}>
          <div className={styles.shape} />
          <h2>Trending in RA DOM TOON</h2>
        </div>

        <div className={styles.button} onClick={handleAddEvent}>
          Add event
        </div>
      </div>

      <div className={styles.cards_container}>
        {cards.map((card, index) => (
          <Card key={index} index={index} />
        ))}
      </div>

      {modalActive && <Popup />}
    </div>
  );
}

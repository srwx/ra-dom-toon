import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ index, campaign }) {
  return (
    <Link to={`/` + campaign.address}>
      <div
        className={styles.container}
        style={{ "--delay": (index + 1) / 2 + "s" }}
      >
        <img src="https://picsum.photos/96" alt="" className={styles.image} />
        <div className={styles.infos}>
          <div>{campaign.address}</div>
          <div>{campaign.name}</div>
          <div>see more</div>
        </div>
      </div>
    </Link>
  );
}

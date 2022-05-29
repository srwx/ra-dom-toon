import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ index, campaign }) {
  const status = () => {
    if (!campaign.isExpired && !campaign.isCompleted) return;

    if (campaign.isCompleted) {
      return <div className={styles.achieved}>Goal reached!</div>;
    }
    if (campaign.isExpired) {
      return <div className={styles.expired}>Expired</div>;
    }
  };

  const shortenedAddress = `${campaign.address.slice(
    0,
    5
  )}...${campaign.address.slice(campaign.address.length - 4)}`;

  return (
    <Link to={`/` + campaign.address}>
      <div
        className={styles.container}
        style={{ "--delay": (index + 1) / 20 + "s" }}
      >
        <img src="https://picsum.photos/96" alt="" className={styles.image} />

        <div className={styles.infos}>
          <div>{shortenedAddress}</div>
          <div>{campaign.name}</div>
          <div>see more</div>
        </div>

        <div className={styles.status}>{status()}</div>
      </div>
    </Link>
  );
}

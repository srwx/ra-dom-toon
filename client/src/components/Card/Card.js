import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();

  var time =
    date +
    " " +
    month +
    " " +
    year +
    " " +
    ("0" + hour).slice(-2) +
    ":" +
    ("0" + min).slice(-2);
  return time;
}

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
          <div>Deadline: {timeConverter(campaign.deadline)}</div>
        </div>

        <div className={styles.status}>{status()}</div>
      </div>
    </Link>
  );
}

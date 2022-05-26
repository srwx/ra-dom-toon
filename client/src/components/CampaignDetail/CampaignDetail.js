import { useParams } from "react-router-dom";
import styles from "./CampaignDetail.module.css";

const ListItem = ({ title, value }) => (
  <div className={styles.listContainer}>
    <div className={styles.listTitle}>{title}</div>
    <div className={styles.listValue}>{value}</div>
  </div>
);

export default function CampaignDetail() {
  let params = useParams();

  return (
    <div className={styles.container}>
      <ListItem title="Campaign Address" value={params.id} />
      <ListItem title="Campaign name" value={"name"} />
      <ListItem title="Donation" value={"123"} />
      <ListItem title="Goal" value={"456"} />
      <ListItem title="Contributions" value={"none"} />
    </div>
  );
}

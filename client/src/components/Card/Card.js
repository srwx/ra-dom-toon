import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ index, id }) {
  return (
    <Link to={`/` + id}>
      <div
        className={styles.container}
        style={{ "--delay": (index + 1) / 2 + "s" }}
      >
        <img src="https://picsum.photos/96" alt="" className={styles.image} />
        <div className={styles.infos}>
          <div>some title</div>
          <div>some detail</div>
          <div>see more</div>
        </div>
      </div>
    </Link>
  );
}

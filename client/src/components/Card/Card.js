import styles from "./Card.module.css";

export default function Card({ index }) {
  return (
    <div className={styles.container} style={{ "--delay": index + 0.5 + "s" }}>
      <img src="https://picsum.photos/96" alt="" className={styles.image} />
      <div className={styles.infos}>
        <div>some title</div>
        <div>some detail</div>
        <div>see more</div>
      </div>
    </div>
  );
}

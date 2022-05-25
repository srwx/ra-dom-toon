import styles from "./Input.module.css";

export default function Input({ title, type, field, syncFunction }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <input
        type={type}
        onChange={(e) => {
          syncFunction(field, e.target.value);
        }}
      />
    </div>
  );
}

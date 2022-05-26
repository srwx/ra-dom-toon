import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.container}>
      <Link to="/">
        <h1 className={styles.header}>RA DOM TOON</h1>
      </Link>
    </div>
  );
}

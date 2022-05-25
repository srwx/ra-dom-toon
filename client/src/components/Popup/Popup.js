import { createPortal } from "react-dom";
import styles from "./Popup.module.css";

export default function Popup() {
  return createPortal(
    <div className={styles.container}>
      <div>list</div>
    </div>,
    document.getElementById("modal-root")
  );
}

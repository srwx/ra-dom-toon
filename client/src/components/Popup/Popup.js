import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Input from "components/Input";
import styles from "./Popup.module.css";

export default function Popup({ closePopup }) {
  const [formData, setFormData] = useState({});
  const backdropRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const handleInput = (field, value) => {
    const newForm = formData;
    newForm[field] = value;

    setFormData(newForm);
  };

  const handleClose = (e) => {
    if (e.target === backdropRef.current) {
      closePopup();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleClose} ref={backdropRef}>
      <div className={styles.container}>
        <div className={styles.header}>Start radomtoon</div>
        <Input
          title="Campaign name"
          type="text"
          field="name"
          syncFunction={handleInput}
        />
        <Input
          title="Fundraising Goal"
          type="number"
          field="goal"
          syncFunction={handleInput}
        />
        <Input
          title="Minimum donation"
          type="number"
          field="min"
          syncFunction={handleInput}
        />
        <Input
          title="Deadline"
          type="date"
          field="deadline"
          syncFunction={handleInput}
        />
        <Input
          title="Recipient Address"
          type="text"
          field="recipientAddress"
          syncFunction={handleInput}
        />
        <div className={styles.submit_wrapper}>
          <div
            className={styles.submit}
            onClick={() => {
              console.log(formData);
            }}
          >
            submit
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

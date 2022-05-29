import { useEffect, useState, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import Input from "components/Input";
import styles from "./Popup.module.css";
import factoryInstance from "utils/factoryInstance";
import web3 from "utils/web3";
import { ContractContext } from "context/ContractContext";

export default function Popup({ closePopup }) {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backdropRef = useRef(null);
  const { fetchCampaigns } = useContext(ContractContext);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const userAccount = await web3.eth.getAccounts();

    let deadline = new Date(formData.deadline).getTime();
    deadline = Math.round(deadline / 1000);

    try {
      await factoryInstance.methods
        .createCampaign(
          formData.name,
          web3.utils.toWei(formData.goal, "ether") /* Required balance */,
          web3.utils.toWei(formData.min, "ether") /* Required cost */,
          deadline,
          formData.minimumContributor
        )
        .send({
          from: userAccount[0],
        });
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Error creating a campaign");
    }
    setIsSubmitting(false);
    closePopup();
    fetchCampaigns();
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
          title="Minimum contributor"
          type="number"
          field="minnimumContributor"
          syncFunction={handleInput}
        />
        <Input
          title="Deadline"
          type="datetime-local"
          field="deadline"
          syncFunction={handleInput}
        />
        <div className={styles.errorMessage}>{errorMessage}</div>
        <div className={styles.submit_wrapper}>
          {isSubmitting ? (
            <div className={styles.loader} />
          ) : (
            <div className={styles.submit} onClick={handleSubmit}>
              submit
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

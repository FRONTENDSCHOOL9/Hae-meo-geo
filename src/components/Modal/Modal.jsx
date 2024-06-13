import { Button } from "@components/Button/Button";
import modalStore from "@zustand/modalStore.mjs";
import styles from "./Modal.module.css";

function Modal() {
  const { modalWr, act, inner, contWr, buttonWr } = styles;
  const { isShow, data, setModal, toggleModal } = modalStore();

  const formatMessage = (message) => {
    if (!message) return [];
    return message.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const handleClose = () => setModal({});
  const handleConfirm = () => {
    if (data.event) {
      data.event();
      toggleModal();
    } else {
      setModal();
    }
  };

  return (
    <div className={`${modalWr} ${isShow ? act : ""}`}>
      <form className={inner}>
        <div className={contWr}>{formatMessage(data?.message)}</div>
        <div className={buttonWr}>
          {data?.isTwoButtons && (
            <Button size="medium" onClick={handleClose}>
              취소
            </Button>
          )}
          <Button
            size="medium"
            color="primary"
            filled="filled"
            onClick={handleConfirm}
          >
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Modal;

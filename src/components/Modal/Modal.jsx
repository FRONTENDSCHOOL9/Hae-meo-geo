import { Button } from "@components/Button/Button";
import modalStore from "@zustand/modalStore.mjs";
import styles from "./Modal.module.css";

function Modal() {
  const { modalWr, act, inner, closeBtn, contWr, buttonWr } = styles;
  const { isShow, modalContent, toggleModal } = modalStore();

  const handleClose = () => toggleModal();

  return (
    <div className={`${modalWr} ${isShow ? act : ""}`}>
      <div className={inner}>
        <button className={closeBtn} onClick={handleClose}>
          <span className="hidden">닫기</span>
        </button>
        <div className={contWr}>{modalContent}</div>
        <div className={buttonWr}>
          <Button size="medium" onClick={handleClose}>
            취소
          </Button>
          <Button size="medium" color="primary" filled="filled">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

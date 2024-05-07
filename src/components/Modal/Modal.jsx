import { Button } from "@components/Button/Button";
import modalStore from "@zustand/modalStore.mjs";
import styles from "./Modal.module.css";

function Modal() {
  const { modalWr, act, inner, closeBtn, contWr, buttonWr } = styles;
  const { isShow, data, setModal, toggleModal } = modalStore();
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
        {/* <button className={closeBtn} onClick={handleClose}>
          <span className="hidden">닫기</span>
        </button> */}
        <div className={contWr}>{data?.instruction}</div>
        <div className={buttonWr}>
          {data?.event && (
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

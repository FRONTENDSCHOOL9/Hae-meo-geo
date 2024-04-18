import { LinkButton } from "@components/Button/Button";
import PageSide from "./PageSide";
import styles from "@pages/mypage/MyPage.module.css";

function BookMark() {
  return (
    <>
      <div className={styles.page}>
        <PageSide />
        <wrap className={styles.information}>
          <div className={styles.button}>
            <LinkButton
              to={"/mypage/information"}
              color="gray"
              size="large"
              filled="false"
            >
              회원 정보 수정
            </LinkButton>
            <LinkButton
              to={"/mypage/BookMark"}
              color="secondary"
              size="large"
              filled="false"
            >
              나도 해보기 목록
            </LinkButton>
          </div>
          <form>
            <div className={styles.list}>전체</div>
            <hr />
          </form>
        </wrap>
      </div>
    </>
  );
}

export default BookMark;

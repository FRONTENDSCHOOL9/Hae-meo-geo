import { LinkButton } from "@components/Button/Button";
import styles from "@pages/mypage/PageSide.module.css";
import useUserStore from "@zustand/userStore.mjs";

function PageSide() {
  const { user } = useUserStore();

  return (
    <div className={styles.pageside}>
      <wrap className={styles.wrap}>
        <div className={styles.icon}></div>
        <br />
        {user && <p className={styles.user}>{user.name}님 환영합니다.</p>}
      </wrap>
      <LinkButton
        to={"/user/login"}
        color="secondary"
        size="max"
        filled="false"
      >
        로그아웃
      </LinkButton>
    </div>
  );
}

export default PageSide;

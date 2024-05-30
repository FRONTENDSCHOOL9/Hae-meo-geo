import styles from "./MypageMenu.module.css";

function MypageMenu() {
  const currentPath = window.location.pathname;
  return (
    <>
      <div className={styles["menu-box"]}>
        <a
          href="/user/mypage"
          className={currentPath === "/user/mypage" ? styles.active : ""}
        >
          <img src="/img/ico-user.svg" alt="사람 아이콘" />
          회원 정보 수정
        </a>
        <a
          href="/mypage/BookMark"
          className={currentPath === "/mypage/BookMark" ? styles.active : ""}
        >
          <img src="/img/ico-bookmark.svg" alt="북마크 아이콘" />
          나도 해보기 목록
        </a>
      </div>
    </>
  );
}

export default MypageMenu;

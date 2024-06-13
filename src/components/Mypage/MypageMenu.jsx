import styles from "./MypageMenu.module.css";

function MypageMenu() {
  const currentPath = window.location.pathname;
  const isUserMenuActive = currentPath === "/mypage/mypage";
  const isBookmarkMenuActive = currentPath === "/mypage/BookMark";

  return (
    <div className={styles["menu-box"]}>
      <a
        href="/mypage/mypage"
        className={isUserMenuActive ? styles.active : ""}
      >
        <img
          src={
            isUserMenuActive
              ? "/img/ico-user-white.svg"
              : "/img/ico-user-black.svg"
          }
          alt="사람 아이콘"
        />
        회원 정보
      </a>
      <a
        href="/mypage/BookMark"
        className={isBookmarkMenuActive ? styles.active : ""}
      >
        <img
          src={
            isBookmarkMenuActive
              ? "/img/ico-bookmark-white.svg"
              : "/img/ico-bookmark-black.svg"
          }
          alt="북마크 아이콘"
        />
        나도 해보기 목록
      </a>
    </div>
  );
}

export default MypageMenu;

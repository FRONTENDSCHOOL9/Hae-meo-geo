import recentlyViewStore from "@zustand/recentlyViewStore.mjs";
import userStore from "@zustand/userStore.mjs";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const {
    header,
    logo,
    gnb,
    userMenu,
    fixedWr,
    recent,
    toTop,
    hamburgerButton,
    hamburgerMenu,
    recentlyWr,
    recentlyViewList,
  } = styles;

  const { user } = userStore();
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedRecently, setIsClickedRecently] = useState(false);
  const { recentlyView } = recentlyViewStore();

  const handleToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleClickRecent = () => setIsClickedRecently(false);
  const handleNav = (e) => {
    if (e.target.tagName !== "A") return;
    setIsClicked(false);
  };

  const recentlyList = recentlyView?.map((item) => (
    <li key={item.name}>
      <Link to={`/recipe/list/${item.name}`}>
        <img src={item.image} alt={item.name} />
        {item.name}
      </Link>
    </li>
  ));

  return (
    <>
      <header className={header} onClick={(e) => handleNav(e)}>
        <h1 className={logo}>
          <Link to="/">
            <img
              className="pc"
              src="/img/logo.svg"
              alt="해머거"
              width={45}
              height={45}
            />
            <img
              className="mo"
              src="/img/logo-name.svg"
              alt="해머거"
              width={100}
              height={40}
            />
          </Link>
        </h1>
        <div className={`${hamburgerMenu} ${isClicked ? styles.act : ""}`}>
          <nav className={gnb}>
            <ul>
              <li>
                <NavLink to="/today/list">오늘뭐먹지?</NavLink>
              </li>
              <li>
                <NavLink to="/recipe/list">해머거 레시피</NavLink>
              </li>
              <li>
                <NavLink to="/myrecipe/list">나만의 레시피</NavLink>
              </li>
            </ul>
          </nav>
          <ul className={userMenu}>
            <li>
              {user ? (
                <Link className={styles.login} to="/mypage/mypage">
                  <span className="hidden">마이페이지</span>
                </Link>
              ) : (
                <Link className={styles.login} to="/user/login">
                  <span className="hidden">로그인</span>
                </Link>
              )}
            </li>
            <li>
              <button
                className={`${recent} ${isClickedRecently ? styles.act : ""}`}
                onClick={() => {
                  setIsClickedRecently(!isClickedRecently);
                  setIsClicked(false);
                }}
              >
                <span className="hidden">최근 본 레시피</span>
              </button>
            </li>
          </ul>
        </div>
        <button
          className={`mo ${hamburgerButton} ${
            isClicked ? styles.isClicked : ""
          }`}
          onClick={() => setIsClicked(!isClicked)}
        >
          <i></i>
          <i></i>
          <i></i>
          <span className="hidden">메뉴 보기</span>
        </button>

        <div className={fixedWr}>
          <button className={toTop} onClick={handleToTop}>
            <span className="hidden">위로 이동하기</span>
          </button>
        </div>
      </header>

      <div className={`mo ${hamburgerMenu}`}>
        <nav>
          <ul>
            <li>
              <Link to="">로그인</Link>
            </li>
            <li>
              <Link to="">회원가입</Link>
            </li>
            <li>
              <Link to="">개인정보 수정</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={`${recentlyViewList} ${isClickedRecently ? styles.act : ""}`}
        onClick={() => handleClickRecent()}
      >
        <nav>
          <h3>
            최근 본 레시피{" "}
            <button>
              <span className="hidden">닫기</span>
            </button>
          </h3>
          <ul className={recentlyWr}>
            {recentlyList || <li>해머거 레시피를 구경해보세요!</li>}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;

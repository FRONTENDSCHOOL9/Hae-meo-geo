import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const { header, logo, gnb, userMenu, login, search, fixedWr, toTop } = styles;
  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={header}>
      <div className={logo}>
        <Link to="/">
          <img src="/logo.svg" alt="해머거" />
        </Link>
      </div>
      <nav className={gnb}>
        <ul>
          <li>
            <Link to="/today/list">오늘뭐먹지?</Link>
          </li>
          <li>
            <Link to="/recipe/list">해머거 레시피</Link>
          </li>
          <li>
            <Link to="/myRecipe/myRecipeRegister">나만의 레시피</Link>
          </li>
        </ul>
      </nav>
      <ul className={userMenu}>
        <li>
          <Link className={login} to="/user/login">
            <span className="hidden">로그인</span>
          </Link>
        </li>
        <li>
          <button type="button" className={search}>
            <span className="hidden">검색</span>
          </button>
        </li>
      </ul>
      <div className={fixedWr}>
        <button className={toTop} onClick={handleToTop}>
          <span className="hidden">위로 이동하기</span>
        </button>
      </div>
    </header>
  );
}

export default Header;

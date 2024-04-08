import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const { header, logo, gnb, userMenu } = styles;
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
            <Link to="">나만의 레시피</Link>
          </li>
        </ul>
      </nav>
      <ul className={userMenu}>
        <li>
          <Link to="/user/login">로그인</Link>
          <button type="button">검색</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;

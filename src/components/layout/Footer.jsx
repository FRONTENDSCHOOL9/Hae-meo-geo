import styles from "./Footer.module.css";

function Footer() {
  const { footer, info, strong, copyright } = styles;
  return (
    <footer className={footer}>
      <ul className={info}>
        <li>
          <a href="#">이용약관</a>
        </li>
        <li>
          <a href="#">
            <strong>개인정보처리방침</strong>
          </a>
        </li>
        <li>
          <a href="#">FAQ</a>
        </li>
        <li>
          <a href="#">공지사항</a>
        </li>
      </ul>
      <ul className={info}>
        <li className={strong}>해머거(주)</li>
        <li>서울 종로구 종로3길 17, 광화문 D타워 D1동</li>
      </ul>
      <p className={copyright}>copyright 해머거(주). All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;

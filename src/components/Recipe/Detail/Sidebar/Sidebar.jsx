import Bookmark from "@components/Recipe/Detail/Bookmark/Bookmark";
import Share from "@components/Recipe/Detail/Share/Share";
import styles from "./Sidebar.module.css";

function Sidebar({ id }) {
  const { sidebar, bookmark, share } = styles;
  return (
    <ul className={sidebar}>
      <li>
        <Bookmark className={bookmark} id={id}>
          나도
          <br />
          해보기
        </Bookmark>
      </li>
      <li>
        <Share className={share}>공유하기</Share>
      </li>
    </ul>
  );
}

export default Sidebar;

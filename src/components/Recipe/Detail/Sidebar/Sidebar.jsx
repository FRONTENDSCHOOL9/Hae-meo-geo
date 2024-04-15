import Bookmark from "@components/Recipe/Detail/Bookmark/Bookmark";
import Share from "@components/Recipe/Detail/Share/Share";
import styles from "./Sidebar.module.css";

function Sidebar({ id }) {
  const { sidebar, bookmark, share } = styles;
  return (
    <ul className={sidebar}>
      <li>
        <Bookmark className={bookmark} id={id}>
          <span>
            나도
            <br />
            해보기
          </span>
        </Bookmark>
      </li>
      <li>
        <Share className={share}>
          <span>공유하기</span>
        </Share>
      </li>
    </ul>
  );
}

export default Sidebar;

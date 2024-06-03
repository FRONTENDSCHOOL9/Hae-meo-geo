import Bookmark from "@components/Recipe/Detail/Bookmark/Bookmark";
import Share from "@components/Recipe/Detail/Share/Share";
import styles from "./Sidebar.module.css";
import PropTypes from "prop-types";

Sidebar.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string,
};

function Sidebar({ id, name, image, type = "haeRcp" }) {
  const { sidebar, bookmark, share } = styles;
  return (
    <ul className={sidebar}>
      {type === "haeRcp" && (
        <li>
          <Bookmark className={bookmark} id={id}></Bookmark>
        </li>
      )}
      <li>
        <Share className={share} name={name} image={image}></Share>
      </li>
    </ul>
  );
}

export default Sidebar;

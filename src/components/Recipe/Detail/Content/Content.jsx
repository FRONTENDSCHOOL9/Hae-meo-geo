import styles from "./Content.module.css";
import PropTypes from "prop-types";

Content.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

function Content({ children }) {
  const { content } = styles;
  return <div className={content}>{children}</div>;
}

export default Content;

import styles from "./Title.module.css";
import PropTypes from "prop-types";

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

function Title({ children }) {
  const { title } = styles;
  return <h2 className={title}>{children}</h2>;
}

export default Title;

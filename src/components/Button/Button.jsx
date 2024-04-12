import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  filled: PropTypes.string,
};
LinkButton.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  filled: PropTypes.string,
};

export function Button({
  children,
  type = "button",
  color = "gray",
  size = "small",
  filled = "false",
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[color]} ${styles[size]} ${styles[filled]}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  to = "/",
  color = "gray",
  size = "small",
  filled = "false",
}) {
  return (
    <Link
      to={to}
      className={`${styles.button} ${styles[color]} ${styles[size]} ${styles[filled]}`}
    >
      {children}
    </Link>
  );
}

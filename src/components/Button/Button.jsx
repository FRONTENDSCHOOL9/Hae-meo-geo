import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

Button.propTypes = {
  children: PropTypes.string,
};
LinkButton.propTypes = {
  children: PropTypes.string,
};

export function Button({
  children,
  type = "button",
  style = "default",
  size = "small",
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[style]} ${styles[size]}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  to = "/",
  style = "default",
  size = "small",
}) {
  return (
    <Link
      to={to}
      className={`${styles.button} ${styles[style]} ${styles[size]}`}
    >
      {children}
    </Link>
  );
}

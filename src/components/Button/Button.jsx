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
  color = "gray",
  size = "small",
  filled = "false",
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[color]} ${styles[size]} ${styles[filled]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Tag({
  children,
  color = "gray",
  size = "small",
  filled = "false",
  onClick,
}) {
  return (
    <span
      className={`${styles.button} ${styles[color]} ${styles[size]} ${styles[filled]}`}
    >
      {children}
    </span>
  );
}

export function LinkButton({
  children,
  to = "/",
  color = "gray",
  size = "small",
  filled = "false",
  onClick,
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

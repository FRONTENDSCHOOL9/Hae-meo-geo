import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  filled: PropTypes.string,
  disabled: PropTypes.string,
  onClick: PropTypes.func,
};
Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  color: PropTypes.string,
  size: PropTypes.string,
  filled: PropTypes.string,
  onClick: PropTypes.func,
};
LinkButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  to: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  filled: PropTypes.string,
  onClick: PropTypes.func,
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
      className={`${styles.button} ${styles[color]} ${styles[size]} ${!!filled ? styles[filled] : ""}`}
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
      className={`${styles.button} ${styles[color]} ${styles[size]} ${!!filled ? styles[filled] : ""}`}
      onClick={onClick}
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
      className={`${styles.button} ${styles[color]} ${styles[size]} ${!!filled ? styles[filled] : ""}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

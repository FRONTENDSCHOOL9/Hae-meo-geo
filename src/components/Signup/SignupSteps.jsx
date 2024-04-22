import styles from "./SignupSteps.module.css";
import PropTypes from "prop-types";

SignupSteps.propTypes = {
  children: PropTypes.node.isRequired,
};

SignupStepsItem.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
};

export function SignupSteps({ children }) {
  const { steps } = styles;

  return <ul className={steps}>{children}</ul>;
}

export function SignupStepsItem({
  children,
  color = "gray",
  fontWeight = "normal",
}) {
  const { step } = styles;
  return (
    <li className={step} style={{ color: color, fontWeight: fontWeight }}>
      {children}
    </li>
  );
}

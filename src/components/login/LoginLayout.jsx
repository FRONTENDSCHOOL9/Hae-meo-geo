import PropTypes from 'prop-types';
import styles from "./LoginLayout.module.css";

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired
};

function LoginLayout({ children }) {
  const {wrapper} = styles;
  return (
    <>
      <div className={wrapper}>{children}</div>
    </>
  );
}



export default LoginLayout;
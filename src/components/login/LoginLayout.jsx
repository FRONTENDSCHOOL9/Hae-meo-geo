import PropTypes from 'prop-types';
import styles from "./LoginLayout.module.css";

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired
};

function LoginLayout({ children }) {
  const {wrapper, inner} = styles;
  return (
    <>
      <div className={wrapper}>
        <div className={inner}>
          {children}
        </div>
      </div>
    </>
  );
}



export default LoginLayout;
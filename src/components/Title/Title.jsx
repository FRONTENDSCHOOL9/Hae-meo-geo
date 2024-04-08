import styles from "./Title.module.css";

function Title({ children }) {
  const { title } = styles;
  return <h2 className={title}>{children}</h2>;
}

export default Title;

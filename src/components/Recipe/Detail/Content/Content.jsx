import styles from "./Content.module.css";

function Content({ children }) {
  const { content } = styles;
  return <div className={content}>{children}</div>;
}

export default Content;

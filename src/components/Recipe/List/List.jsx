import PropTypes from "prop-types";
import styles from "./List.module.css";

List.propTypes = {
  recipeItem: PropTypes.array.isRequired,
};

function List({ recipeItem }) {
  return <ul className={styles.rcpList}>{recipeItem}</ul>;
}

export default List;

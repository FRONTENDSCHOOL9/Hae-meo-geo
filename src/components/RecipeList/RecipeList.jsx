import PropTypes from "prop-types";
import styles from "./RecipeList.module.css";

RecipeList.propTypes = {
  recipeItem: PropTypes.string.isRequired,
};

function RecipeList({ recipeItem }) {
  return <ul className={styles.rcpList}>{recipeItem}</ul>;
}

export default RecipeList;

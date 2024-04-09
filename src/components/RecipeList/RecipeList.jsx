import styles from "./RecipeList.module.css";

function List({ recipeItem }) {
  return <ul className={styles.rcpList}>{recipeItem}</ul>;
}

export default List;

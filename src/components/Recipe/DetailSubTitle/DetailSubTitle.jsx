import PropTypes from "prop-types";
import styles from "./DetailSubTitle.module.css";

RecipeDetailSubTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

function RecipeDetailSubTitle({ children }) {
  const { RecipeDetailSubTitle } = styles;
  return <h3 className={RecipeDetailSubTitle}>{children}</h3>;
}

export default RecipeDetailSubTitle;

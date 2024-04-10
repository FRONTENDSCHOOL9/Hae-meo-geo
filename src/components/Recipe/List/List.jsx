import PropTypes from "prop-types";
import styles from "./List.module.css";

List.propTypes = {
  recipeItem: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
};

function List({ recipeItem, count, keyword }) {
  return (
    <div className={styles.rcpList}>
      <p>
        총 <span>{count}</span>개의 <span>{keyword}</span> 레시피를 살펴보세요
        :-)
      </p>
      <ul>{recipeItem}</ul>
    </div>
  );
}

export default List;

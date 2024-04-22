import PropTypes from "prop-types";
import styles from "./List.module.css";

List.propTypes = {
  recipeItem: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
};

function List({ recipeItem, totalCount, keyword }) {
  return (
    <div className={styles.rcpList}>
      <p>
        총 <span>{totalCount}</span>개의 <span>{keyword}</span> 레시피를
        준비했어요 :-)
      </p>
      <ul>{recipeItem}</ul>
    </div>
  );
}

export default List;

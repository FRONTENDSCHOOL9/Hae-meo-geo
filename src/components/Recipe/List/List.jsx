import PropTypes from "prop-types";
import styles from "./List.module.css";

List.propTypes = {
  recipeItem: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

function List({ recipeItem, totalCount, keyword, isLoading }) {
  return (
    <div className={styles.rcpList}>
      {isLoading ? (
        <p>
          <span>{keyword}</span> 레시피를 준비하고 있어요 =3
        </p>
      ) : (
        <p>
          총 <span>{totalCount}</span>개의 <span>{keyword}</span> 레시피가
          준비되어있어요 :-)
        </p>
      )}
      <ul>{recipeItem}</ul>
    </div>
  );
}

export default List;

import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
};

function Pagination({ totalCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const totalPage = parseInt(totalCount / limit);
  const currentPage = searchParams.get("page");
  const pageRange = 5;

  const pageList = [];
  for (let page = 1; page <= totalPage; page++) {
    searchParams.set("page", page);
    let search = searchParams.toString();
    pageList.push(
      <li key={page} className={`${page === +currentPage ? styles.act : ""}`}>
        <Link to={`/recipe/list?${search}`}>{page}</Link>
      </li>
    );
    // console.log(+currentPage, page, page === +currentPage);
  }

  return <ul className={styles.pagination}>{pageList}</ul>;
}

export default Pagination;

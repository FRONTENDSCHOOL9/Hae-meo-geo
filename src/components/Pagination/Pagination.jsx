import PropTypes from "prop-types";
import { useRef, useState } from "react";
import styles from "./Pagination.module.css";

Pagination.propTypes = {
  totalCount: PropTypes.number,
  fetchData: PropTypes.func.isRequired,
  current: PropTypes.number,
};

function Pagination({ totalCount, fetchData }) {
  const pagination = useRef();
  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const totalPage = parseInt(totalCount / limit);
  const [currentPage, setCurrentPage] = useState(1);
  const pageRange = 5;

  const pageList = [];
  for (let page = 1; page <= totalPage; page++) {
    pageList.push(
      <li key={page}>
        <button
          className={`${page === currentPage && styles.act}`}
          onClick={() => {
            setCurrentPage(page);
            fetchData(`/${limit * page - limit + 1}/${limit * page}`);
          }}
        >
          {page}
        </button>
      </li>
    );
  }

  return (
    <ul className={styles.pagination} ref={pagination}>
      {pageList}
    </ul>
  );
}

export default Pagination;

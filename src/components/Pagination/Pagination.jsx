import { Button } from "@components/Button/Button";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.css";

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

function Pagination({ totalCount, currentPage, setCurrentPage, link }) {
  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const pageRange = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSet, setPageSet] = useState(Math.ceil(currentPage / pageRange));
  const totalPage = Math.ceil(totalCount / limit);
  const lastPageSet = Math.ceil(totalPage / pageRange);

  const handleClick = (page) => {
    searchParams.set("page", page);
    setCurrentPage(page);
    setSearchParams(searchParams);
  };

  const pageList = [];

  for (
    let page = (pageSet - 1) * pageRange + 1;
    page <= pageSet * pageRange;
    page++
  ) {
    if (page > totalPage) break;
    let search = searchParams.toString();
    pageList.push(
      <li
        key={page}
        className={`${page === +currentPage ? styles.act : ""}`}
        onClick={() => handleClick(page)}
      >
        <Link to={`${link}?${search}`}>{page}</Link>
      </li>,
    );
  }

  useEffect(() => {
    if (searchParams.get("page") != 1) return;
    setPageSet(1);
  }, [totalCount]);

  return (
    <ul className={styles.pagination}>
      <li>
        <Button
          disabled={pageSet === 1 ? `disabled` : ""}
          onClick={() => setPageSet(pageSet - 1)}
        >
          &lt;
          <span className="hidden">이전 페이지로 이동</span>
        </Button>
      </li>
      {pageList}
      <li>
        <Button
          disabled={pageSet === lastPageSet ? `disabled` : ""}
          onClick={() => setPageSet(pageSet + 1)}
        >
          &gt;
          <span className="hidden">이후 페이지로 이동</span>
        </Button>
      </li>
    </ul>
  );
}

export default Pagination;

import PropTypes from "prop-types";
import { Button } from "@components/Button/Button";
import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";

Search.propTypes = {
  setKeyword: PropTypes.func.isRequired,
};

function Search({ setKeyword, setCurrentPage }) {
  const { searchWr, typeWr, type, inputWr } = styles;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON") return false;
    const category = e.target.innerText.split("&")[0];
    searchParams.set("category", category);
    searchParams.set("page", 1);
    searchParams.delete("ingredient");
    setSearchParams(searchParams);
    setKeyword(category);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const ingredient = e.target.firstChild.value;
    searchParams.set("ingredient", ingredient);
    searchParams.set("page", 1);
    searchParams.delete("category");
    setSearchParams(searchParams);
    setKeyword(ingredient);
    setCurrentPage(1);
  };

  return (
    <div className={searchWr}>
      <div className={typeWr}>
        <div className={type}>
          <h3>종류별</h3>
          <nav onClick={(e) => handleClick(e)}>
            <Button size="medium">밥</Button>
            <Button size="medium">국&찌개</Button>
            <Button size="medium">반찬</Button>
            <Button size="medium">일품</Button>
            <Button size="medium">후식</Button>
            <Button size="medium">기타</Button>
          </nav>
        </div>
      </div>
      <form className={inputWr} onSubmit={(e) => handleSearch(e)}>
        <input type="text" placeholder="재료를 검색해보세요." />
        <button type="submit">
          <span className="hidden">검색</span>
        </button>
      </form>
    </div>
  );
}

export default Search;

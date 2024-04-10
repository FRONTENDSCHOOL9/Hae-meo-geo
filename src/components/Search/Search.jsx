import PropTypes from "prop-types";
import { Button } from "@components/Button/Button";
import styles from "./Search.module.css";

Search.propTypes = {
  fetchData: PropTypes.func.isRequired,
  setKeyword: PropTypes.func.isRequired,
};

function Search({ fetchData, setKeyword }) {
  const { search, typeWr, type, inputWr } = styles;

  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON") return false;
    const searchKeyword = e.target.innerText.split("&")[0];
    fetchData(`/1/1001/RCP_PAT2=${searchKeyword}`);
    setKeyword(searchKeyword);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchKeyword = e.target.firstChild.value;
    fetchData(`/1/1001/RCP_PARTS_DTLS=${searchKeyword}`);
    setKeyword(searchKeyword);
  };

  return (
    <div className={search}>
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

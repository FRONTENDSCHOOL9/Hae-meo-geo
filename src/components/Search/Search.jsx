import Type from "@components/Search/Type";
import PropTypes from "prop-types";
import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";

Search.propTypes = {
  setKeyword: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

function Search({ setKeyword, setCurrentPage, type = "haeRcp" }) {
  const { searchWr, inputWr } = styles;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const ingredient = e.target.firstChild.value;
    searchParams.set("RCP_PARTS_DTLS", ingredient);
    searchParams.set("page", 1);
    searchParams.delete("RCP_PAT2");
    searchParams.delete("RCP_NM");
    setSearchParams(searchParams);
    setKeyword(ingredient);
    setCurrentPage(1);
  };

  return (
    <div className={searchWr}>
      {type === "haeRcp" && (
        <Type setKeyword={setKeyword} setCurrentPage={setCurrentPage} />
      )}

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

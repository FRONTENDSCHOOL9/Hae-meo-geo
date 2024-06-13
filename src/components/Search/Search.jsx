import Type from "@components/Search/Type";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.css";

Search.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func,
  setCurrentPage: PropTypes.func,
  type: PropTypes.string,
};

function Search({ keyword, setKeyword, setCurrentPage, type = "haeRcp" }) {
  const { searchWr, inputWr } = styles;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInput = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const ingredient = e.target.firstChild.value;
    searchParams.set("page", 1);
    searchParams.delete("RCP_PAT2");
    searchParams.delete("RCP_NM");

    if (keyword !== "home") {
      // 메인 홈에서 검색하는 경우 제외
      setKeyword(ingredient);
      setCurrentPage(1);
    }
    if (type === "haeRcp") searchParams.set("RCP_PARTS_DTLS", ingredient);
    if (type === "myRcpList") searchParams.set("keyword", ingredient);

    setSearchParams(searchParams);
  };

  return (
    <div className={searchWr}>
      {type === "haeRcp" && (
        <Type
          keyword={keyword}
          setKeyword={setKeyword}
          setCurrentPage={setCurrentPage}
          searchInput={searchInput}
        />
      )}

      <form className={inputWr} onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          placeholder="재료를 검색해보세요."
          ref={searchInput}
        />
        <button type="submit">
          <span className="hidden">검색</span>
        </button>
      </form>
    </div>
  );
}

export default Search;

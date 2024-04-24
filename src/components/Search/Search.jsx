import Type from "@components/Search/Type";
import PropTypes from "prop-types";
import styles from "./Search.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef } from "react";

Search.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func,
  setCurrentPage: PropTypes.func,
  type: PropTypes.string,
};

function Search({ keyword, setKeyword, setCurrentPage, type = "haeRcp" }) {
  const { searchWr, inputWr } = styles;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchInput = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const ingredient = e.target.firstChild.value;
    searchParams.set("RCP_PARTS_DTLS", ingredient);
    searchParams.set("page", 1);
    searchParams.delete("RCP_PAT2");
    searchParams.delete("RCP_NM");

    if (keyword !== "home") {
      setKeyword(ingredient);
      setSearchParams(searchParams);
      setCurrentPage(1);
    }
    if (!type === "myRcpList")
      navigate(`/recipe/list?page=1&RCP_PARTS_DTLS=${ingredient}`);
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

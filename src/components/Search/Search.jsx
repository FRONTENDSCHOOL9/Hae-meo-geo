import { Button } from "@components/Button/Button";
import styles from "./Search.module.css";

function Search({ fetchData }) {
  const { search, typeWr, type, inputWr } = styles;

  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON") return false;
    const searchKeyword = e.target.innerText.split("&")[0];
    fetchData(`/1/1001/RCP_PAT2=${searchKeyword}`);
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
      <form className={inputWr}>
        <input
          type="text"
          placeholder="키워드를 검색하거나 카테고리를 선택해주세요."
        />
        <button type="submit">
          <span className="hidden">검색</span>
        </button>
      </form>
    </div>
  );
}

export default Search;

import { Button } from "@components/Button/Button";
import styles from "./Search.module.css";

function Search() {
  const { search, typeWr, type, inputWr } = styles;
  return (
    <div className={search}>
      <div className={typeWr}>
        <div className={type}>
          <h3>종류별</h3>
          <nav>
            <Button size="medium">밥</Button>
            <Button size="medium">반찬</Button>
            <Button size="medium">후식</Button>
          </nav>
        </div>
        <div className={type}>
          <h3>방법별</h3>
          <nav>
            <Button size="medium">끓이기</Button>
            <Button size="medium">찌기</Button>
            <Button size="medium">굽기</Button>
          </nav>
        </div>
      </div>
      <div className={inputWr}>
        <input
          type="text"
          placeholder="키워드를 검색하거나 카테고리를 선택해주세요."
        />
        <button>
          <span className="hidden">검색</span>
        </button>
      </div>
    </div>
  );
}

export default Search;

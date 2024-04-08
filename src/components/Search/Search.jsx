import { Button } from "@components/Button/Button";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import styles from "./Search.module.css";

function Search() {
  const { search, typeWr, type, inputWr } = styles;
  const axios = useCustomAxios(true);
  const dataFetch = async (searchKeyword, request) =>{
    const res = await axios.get(`VITE_API_SERVER_RCP/1/1000/${request}=${searchKeyword}`)
  }

  const handleClick = (e, request) => {
    if(e.target.tagName !== 'BUTTON') return false;
    const searchKeyword = e.target.innerText;
    console.log(searchKeyword, request)
    dataFetch(searchKeyword, request)
  }

  return (
    <div className={search}>
      <div className={typeWr}>
        <div className={type}>
          <h3>종류별</h3>
          <nav onClick={(e)=>handleClick(e, 'RCP_PAT2')}>
            <Button size="medium">밥</Button>
            <Button size="medium">반찬</Button>
            <Button size="medium">후식</Button>
          </nav>
        </div>
        <div className={type}>
          <h3>방법별</h3>
          <nav onClick={(e)=>handleClick(e, 'RCP_WAY2')}>
            <Button size="medium">끓이기</Button>
            <Button size="medium">찌기</Button>
            <Button size="medium">굽기</Button>
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

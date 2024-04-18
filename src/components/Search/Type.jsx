import { Button } from "@components/Button/Button";
import { useSearchParams } from "react-router-dom";
import styles from "./Type.module.css";
import PropTypes from "prop-types";

Type.propTypes = {
  setKeyword: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

function Type({ setKeyword, setCurrentPage }) {
  const { typeWr, type } = styles;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON") return false;
    const category = e.target.innerText.split("&")[0];
    searchParams.set("RCP_PAT2", category);
    searchParams.set("page", 1);
    searchParams.delete("RCP_PARTS_DTLS");
    setSearchParams(searchParams);
    setKeyword(category);
    setCurrentPage(1);
  };

  return (
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
  );
}

export default Type;

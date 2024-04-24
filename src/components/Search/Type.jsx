import { Button } from "@components/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Type.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

Type.propTypes = {
  keyword: PropTypes.string,
  setKeyword: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

function Type({ keyword, setKeyword, setCurrentPage, searchInput }) {
  const { typeWr, type } = styles;
  const [searchParams, setSearchParams] = useSearchParams();
  const [clickedButton, setClickedButton] = useState(
    searchParams.get("RCP_PAT2") || "",
  );
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON") return false;
    searchInput.current.value = "";

    const category = e.target.innerText.split("&")[0];
    searchParams.set("RCP_PAT2", category);
    searchParams.set("page", 1);
    searchParams.delete("RCP_PARTS_DTLS");
    searchParams.delete("RCP_NM");
    setSearchParams(searchParams);

    if (keyword !== "home") {
      setKeyword(category);
      setCurrentPage(1);
    }

    setClickedButton(category);
    navigate(`/recipe/list?page=1&RCP_PAT2=${category}`);
  };

  useEffect(() => {
    if (searchParams.get("RCP_PARTS_DTLS")) setClickedButton("");
  });

  return (
    <div className={typeWr}>
      <div className={type}>
        <h3>종류별</h3>
        <nav onClick={(e) => handleClick(e)}>
          <Button
            size="medium"
            color={clickedButton === "밥" ? "primary" : "gray"}
          >
            밥
          </Button>
          <Button
            size="medium"
            color={clickedButton === "국" ? "primary" : "gray"}
          >
            국&찌개
          </Button>
          <Button
            size="medium"
            color={clickedButton === "반찬" ? "primary" : "gray"}
          >
            반찬
          </Button>
          <Button
            size="medium"
            color={clickedButton === "일품" ? "primary" : "gray"}
          >
            일품
          </Button>
          <Button
            size="medium"
            color={clickedButton === "후식" ? "primary" : "gray"}
          >
            후식
          </Button>
          <Button
            size="medium"
            color={clickedButton === "기타" ? "primary" : "gray"}
          >
            기타
          </Button>
        </nav>
      </div>
    </div>
  );
}

export default Type;

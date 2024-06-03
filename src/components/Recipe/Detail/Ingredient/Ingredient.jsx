import styles from "./Ingredient.module.css";
import PropTypes from "prop-types";

Ingredient.propTypes = {
  data: PropTypes.object.isRequired,
};

function Ingredient({ data }) {
  const { ingredientWr, ingredient, rightWr, info, infoTitle } = styles;
  const ingredientList = data["RCP_PARTS_DTLS"]
    .split(/,|●|·|•|:|(?<=g\)\s)|(?<=g\s)/)
    .map((item, i) => {
      if (!item) return;
      return <li key={i}>{item}</li>;
    });

  return (
    <div className={ingredientWr}>
      <img src={data["ATT_FILE_NO_MAIN"]} alt={data["RCP_NM"]} />
      <div className={rightWr}>
        <ul className={info}>
          <li>
            <h4 className={infoTitle}>열량</h4>
            {data["INFO_ENG"]}cal
          </li>
          <li>
            <h4 className={infoTitle}>탄수화물</h4>
            {data["INFO_CAR"]}g
          </li>
          <li>
            <h4 className={infoTitle}>단백질</h4>
            {data["INFO_PRO"]}g
          </li>
          <li>
            <h4 className={infoTitle}>지방</h4>
            {data["INFO_FAT"]}g
          </li>
          <li>
            <h4 className={infoTitle}>나트륨</h4>
            {data["INFO_NA"]}g
          </li>
        </ul>
        <div className={ingredient}>
          <h4 className={infoTitle}>재료</h4>
          <ul>{ingredientList}</ul>
        </div>
      </div>
    </div>
  );
}

export default Ingredient;

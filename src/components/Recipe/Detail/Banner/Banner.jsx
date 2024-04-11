import { Tag } from "@components/Button/Button";
import PropTypes from "prop-types";
import styles from "./Banner.module.css";

Banner.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  pat: PropTypes.string,
  way: PropTypes.string,
};

function Banner({ type = "myRcpList", name, pat = "", way = "" }) {
  const { bannerWr, banner } = styles;
  return (
    <>
      {type === "haeRcp" && (
        <div className={`${bannerWr} ${styles[type]}`}>
          <div className={banner}>
            <h2>{name}</h2>
            <ul>
              <li>
                <Tag color="primary">{pat}</Tag>
              </li>
              <li>
                <Tag color="primary">{way}</Tag>
              </li>
            </ul>
          </div>
        </div>
      )}
      {type === "myRcpList" && <div>나만의 레시피 리스트용</div>}
      {type === "myRcpRegister" && (
        <div className={`${bannerWr} ${styles[type]}`}>
          <div className={banner}>
            <h2>나만의 레시피를 올려주세요!</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;

import useScript from "@hooks/useScript.mjs";
import styles from "./Share.module.css";
import PropTypes from "prop-types";
import useKakao from "@hooks/useKaKao.mjs";
import { useEffect } from "react";

Share.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rcpNum: PropTypes.number,
};

function Share({ name, image, rcpNum = "" }) {
  const { share } = styles;
  const { kakaoLoading, initKakao, shareWithKakao } = useKakao();

  const handleShare = () => {
    shareWithKakao(name, image, rcpNum);
  };

  useEffect(() => {
    if (kakaoLoading) initKakao();
  }, []);

  return (
    <button onClick={handleShare} className={share}>
      <span className="pc">공유하기</span>
    </button>
  );
}

export default Share;

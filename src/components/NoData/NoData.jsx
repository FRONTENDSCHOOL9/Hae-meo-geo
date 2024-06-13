import Lottie from "react-lottie";
import animationData from "@/assets/lottie/noData.json";
import styles from "@pages/ErrorPage.module.css";
import PropTypes from "prop-types";

NoData.propTypes = {
  keyword: PropTypes.string.isRequired,
};

function NoData({ keyword }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.aniWr}>
      <p>
        <strong>'{keyword}'</strong> 레시피가 없습니다.
      </p>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}

export default NoData;

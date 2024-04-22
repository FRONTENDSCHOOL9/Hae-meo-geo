import Lottie from "react-lottie";
import animationData from "@/assets/lottie/noData.json";
import styles from "./NoData.module.css";

function NoData({ keyword }) {
  const { noData } = styles;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={noData}>
      <p>
        <strong>'{keyword}'</strong> 레시피가 없습니다.
      </p>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}

export default NoData;

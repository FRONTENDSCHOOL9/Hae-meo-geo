import Lottie from "react-lottie";
import animationData from "@/assets/lottie/loading.json";
import styles from "@pages/ErrorPage.module.css";

function Loading() {
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
      <p>레시피를 준비하고 있어요!</p>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}

export default Loading;

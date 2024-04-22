import Footer from "@components/layout/Footer";
import Header from "@components/layout/Header";
import { useRouteError } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "@/assets/lottie/error.json";
import layoutStyles from "@components/layout/index.module.css";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  const { aniWr } = styles;
  const err = useRouteError();
  const message =
    err.status === 404
      ? "존재하지 않는 페이지입니다."
      : "예상치 못한 에러가 발생했습니다.";
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Header />
      <main className={layoutStyles.container}>
        <div className={aniWr}>
          <p>{message}</p>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ErrorPage;

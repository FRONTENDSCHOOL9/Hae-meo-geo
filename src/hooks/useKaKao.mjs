import useScript from "./useScript.mjs";

const useKakao = () => {
  const [kakaoLoading, kakaoError] = useScript({
    src: "https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js",
    integrity:
      "sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01",
    crossorigin: "anonymous",
  });

  const initKakao = () => {
    const { Kakao } = window;
    try {
      if (Kakao && !Kakao.isInitialized()) {
        Kakao.init(import.meta.env.VITE_KAKAO_KEY);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shareWithKakao = (name, image, rcpNum) => {
    const { Kakao } = window;
    if (!Kakao.isInitialized()) initKakao();
    if (Kakao) {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: name,
          description: `해머거에서 맛있는 '${name}' 레시피를 확인해보세요.`,
          imageUrl: image,
          link: {
            mobileWebUrl: `https://haemeogeo.netlify.app/${rcpNum ? `myrecipe` : "recipe"}/list/${rcpNum || name}`,
            webUrl: `https://haemeogeo.netlify.app/${rcpNum ? `myrecipe` : "recipe"}/list/${rcpNum || name}`,
          },
        },
      });
    }
  };

  return { kakaoLoading, kakaoError, initKakao, shareWithKakao };
};

export default useKakao;

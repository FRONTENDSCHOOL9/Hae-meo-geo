import { Helmet } from "react-helmet-async";

const SEOMetaTag = ({ title, isMain = false }) => {
  return (
    <Helmet>
      <title>
        {isMain ? "1000개가 넘는 맛있는 레시피 - 해머거" : `${title} - 해머거`}
      </title>
      <meta
        name="keywords"
        content="레시피, 레시피 공유, 요리, 요리법, 요리 커뮤니티, 집밥, 간편 요리, 오늘 뭐먹지, 디저트 레시피, 한식, 양식, 중식, 일식, 건강식, 날씨별 요리, 요일별 요리"
      />
      <meta
        name="description"
        content="다양한 레시피를 발견하고 공유해보세요! 초보부터 고수까지 누구나 쉽게 밥 해머거"
      />
      <meta property="og:title" content="해머거" />
      <meta
        property="og:description"
        content="다양한 레시피를 발견하고 공유해보세요! 초보부터 고수까지 누구나 쉽게 밥 해머거"
      />
      <meta property="og:url" content="https://haemeogeo.netlify.app/" />
      <meta property="og:site_name" content="해머거" />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content="해머거" />
      <meta
        name="twitter:description"
        content="다양한 레시피를 발견하고 공유해보세요! 초보부터 고수까지 누구나 쉽게 밥 해머거"
      />
    </Helmet>
  );
};

export default SEOMetaTag;

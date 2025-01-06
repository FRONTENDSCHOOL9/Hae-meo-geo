import { Helmet } from "react-helmet-async";

const SEOMetaTag = ({ title, isMain = false }) => {
  return (
    <Helmet>
      <title>
        {isMain ? "1000개가 넘는 맛있는 레시피 - 해머거" : `${title} - 해머거`}
      </title>
    </Helmet>
  );
};

export default SEOMetaTag;

import styles from "./Share.module.css";
import PropTypes from "prop-types";

Share.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rcpNum: PropTypes.number,
};

function Share({ name, image, rcpNum = "" }) {
  const { share } = styles;
  const handleShare = () => {
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
  };

  return (
    <button onClick={handleShare} className={share}>
      <span className="pc">공유하기</span>
    </button>
  );
}

export default Share;

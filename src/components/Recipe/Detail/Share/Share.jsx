import styles from "./Share.module.css";

function Share({ name, image }) {
  const { share } = styles;
  const handleShare = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: name,
        description: `해머거에서 맛있는 '${name}' 레시피를 확인해보세요.`,
        imageUrl: image,
        link: {
          mobileWebUrl: `http://localhost:5173/recipe/list/${name}`,
          webUrl: `http://localhost:5173/recipe/list/${name}`,
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

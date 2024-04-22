function Share({ name, image }) {
  const handleShare = () => {
    Kakao.init(import.meta.env.VITE_KAKAO_KEY);
    Kakao.isInitialized();

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
    <button onClick={handleShare}>
      <span className="pc">공유하기</span>
    </button>
  );
}

export default Share;

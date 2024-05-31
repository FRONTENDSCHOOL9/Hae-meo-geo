import { Button } from "@components/Button/Button";

function SocialKakao() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <>
      <Button type="button" size="large" color="kakao" onClick={handleLogin}>
        <img src="../../public/img/kakao-icon.png" alt="카카오 로그인 아이콘" />
        카카오 로그인
      </Button>
    </>
  );
}
export default SocialKakao;

import useCustomAxios from "@hooks/useCustomAxios";
import modalStore from "@zustand/modalStore.mjs";
import userStore from "@zustand/userStore.mjs";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Kakao() {
  const [searchParams] = useSearchParams();
  const { setUser } = userStore();
  const code = searchParams.get("code");
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { setModal } = modalStore();
  const location = useLocation();

  useEffect(() => {
    if (code !== null) handleLogin(code);
  }, [code]);

  async function handleLogin(code) {
    try {
      const res = await axios.post("users/login/kakao", {
        code,
        redirect_uri: `${window.location.origin}/auth/kakao`,
      });

      if (res.data.ok === 1) {
        if (res.data.message === "인증 처리중 입니다.") {
          return;
        }

        if (res.data.item && res.data.item._id) {
          setUser({
            _id: res.data.item._id,
            name: res.data.item.name,
            loginType: res.data.item.loginType,
            type: res.data.item.type,
            profile: res.data.item.profileImage,
            token: res.data.item.token,
          });

          setModal({
            message: res.data.item.name + "님 밥 해머거!",
            event: () => {
              const previousPage = location.state?.from || "/";
              if (previousPage === "/user/login") {
                navigate("/");
              } else {
                navigate(previousPage);
              }
            },
          });
        }
      } else {
        console.error("서버 응답 데이터가 올바르지 않습니다:", res.data);
      }
    } catch (err) {
      if (err.response) {
        console.error("서버 응답:", err.response.data);
      } else {
        console.error("에러 메시지:", err.message);
      }
    }
  }
  return <></>;
}

export default Kakao;

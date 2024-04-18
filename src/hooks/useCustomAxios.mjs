import useUserStore from "@zustand/userStore.mjs";
import axios from "axios";

const { VITE_API_SERVER, VITE_API_SERVER_RCP, VITE_CLIENT_ID } = import.meta.env;

function useCustomAxios(type = "likelion") {
  const { user } = useUserStore();
  const instance = axios.create({
    baseURL: type === "rcp" ? VITE_API_SERVER_RCP : VITE_API_SERVER,
    timeout: 1000 * 20,
    headers:
      type === "rcp"
        ? {
            "content-type": "application/json",
            accept: "application/json",
          }
        : {
            "content-type": "application/json",
            accept: "application/json",
            "client-id": VITE_CLIENT_ID,
          },
  });

  // 요청 인터셉터
  instance.interceptors.request.use((config) => {
    if (user && type === "likelion") {
      const accessToken = user.token.accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 응답 인터셉터
    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          // 인증 되지 않음
          const gotoLogin = confirm(
            "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?",
          );
          gotoLogin &&
            navigate("/user/login", { state: { from: location.pathname } });
        } else {
          return Promise.reject(err);
        }
      },
    );

    return config;
  });

  return instance;
}

export default useCustomAxios;

import useUserStore from "@zustand/userStore.mjs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VITE_API_SERVER = import.meta.env.VITE_API_SERVER;
const VITE_API_SERVER_RCP = import.meta.env.VITE_API_SERVER_RCP;
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REFRESH_URL = "/auth/refresh";

function useCustomAxios(type = "likelion") {
  const navigate = useNavigate();
  const location = useLocation();
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
    return config;
  });
  // 응답 인터셉터
  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const { config, response } = err;
      if (response?.status === 401) {
        // 인증 되지 않음
        if (config.url === REFRESH_URL) {
          // refresh 토큰 인증 실패
          const gotoLogin = confirm(
            "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?",
          );
          gotoLogin &&
            navigate("/user/login", { state: { from: location.pathname } });
        } else {
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            // 갱신된 accessToken으로 재요청
            return axios(config);
          }
        }
      } else {
        return Promise.reject(err);
      }
    },
  );
  // accessToken 갱신 요청
  async function getAccessToken(instance) {
    try {
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }
  return instance;
}
export default useCustomAxios;

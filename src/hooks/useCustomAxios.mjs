import modalStore from "@zustand/modalStore.mjs";
import useUserStore from "@zustand/userStore.mjs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_SERVER = import.meta.env.VITE_API_SERVER;
const API_SERVER_RCP = import.meta.env.VITE_API_SERVER_RCP;
const API_SERVER_WEATHER = import.meta.env.VITE_API_SERVER_WEATHER;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REFRESH_URL = "/auth/refresh";

function useCustomAxios(type = "likelion") {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();
  const { setModal } = modalStore();
  const instance = axios.create({
    baseURL:
      type === "rcp"
        ? API_SERVER_RCP
        : type === "weather"
          ? API_SERVER_WEATHER
          : API_SERVER,
    timeout: 1000 * 20,
    headers:
      type === "likelion"
        ? {
            "content-type": "application/json",
            accept: "application/json",
            "client-id": CLIENT_ID,
          }
        : {
            "content-type": "application/json",
            accept: "application/json",
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
          setModal({
            message: `잠깐! 로그인 후 이용할 수 있어요. \n로그인 하러갈까요?`,
            isTwoButtons: true,
            event: () => {
              navigate("/user/login", { state: { from: location.pathname } });
            },
          });
        } else {
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            setUser({ ...user, token: { accessToken } });
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

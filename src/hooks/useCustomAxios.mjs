import axios from "axios";

const { VITE_API_SERVER, VITE_API_SERVER_RCP } = import.meta.env;

function useCustomAxios(rcpApi = false) {
  const instance = axios.create({
    baseURL: rcpApi ? VITE_API_SERVER_RCP : VITE_API_SERVER,
    timeout: 1000 * 20,
    headers: rcpApi
      ? {
          "content-type": "application/json",
          accept: "application/json",
        }
      : {
          "content-type": "application/json",
          accept: "application/json",
          "client-id": "06-haemeogeo",
        },
  });

  return instance;
}

export default useCustomAxios;

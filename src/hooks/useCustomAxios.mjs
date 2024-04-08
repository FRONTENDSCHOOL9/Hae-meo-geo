import axios from "axios";

const { VITE_API_SERVER, VITE_API_SERVER_RCP } = import.meta.env;

function useCustomAxios(rcpApi = false) {
  const instance = axios.create({
    baseURL: rcpApi ? VITE_API_SERVER_RCP : VITE_API_SERVER,
    timeout: 1000 * 10,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      // "client-id": "00-sample",
    },
  });

  return instance;
}

export default useCustomAxios;

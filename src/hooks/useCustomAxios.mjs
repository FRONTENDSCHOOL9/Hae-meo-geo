import axios from "axios";

const API_SERVER = import.meta.env.VITE_API_SERVER;

function useCustomAxios() {
  const instance = axios.create({
    baseURL: API_SERVER,
    timeout: 1000 * 10,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "client-id": "00-sample",
    },
  });

  return instance;
}

export default useCustomAxios;

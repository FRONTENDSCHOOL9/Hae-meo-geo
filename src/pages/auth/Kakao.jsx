import useCustomAxios from "@hooks/useCustomAxios";
import modalStore from "@zustand/modalStore.mjs";
import userStore from "@zustand/userStore.mjs";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Kakao() {
  const [searchParams] = useSearchParams();
  const { setUser } = userStore();
  const code = searchParams.get("code");
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { setModal } = modalStore();

  useEffect(() => {
    if (code !== null) handleLogin(code);
  }, [code]);

  async function handleLogin(code) {
    try {
      const res = await axios.post("users/login/kakao", {
        code,
        redirect_uri: `${window.location.origin}/auth/kakao`,
      });

      setUser({
        _id: res.data.item._id,
        name: res.data.item.name,
        email: res.data.item.email,
        profile: res.data.item.image,
        token: res.data.item.token,
      });

      setModal({
        message: res.data.item.name + "님 밥 해머거!",
        event: () => {
          navigate(-1);
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return <></>;
}

export default Kakao;

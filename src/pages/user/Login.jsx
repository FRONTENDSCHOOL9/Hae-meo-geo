import { Button, LinkButton } from "@components/Button/Button";
import Title from "@components/Title/Title";
import LoginLayout from "@components/login/LoginLayout";

import useCustomAxios from "@hooks/useCustomAxios.mjs";
import useUserStore from "@zustand/userStore.mjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEmailSaved, setIsEmailSaved] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const axios = useCustomAxios();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setIsEmailSaved(true);
    }
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await axios.post("/users/login", formData);
      alert(res.data.item.name + "님 밥 해머거!");

      setUser({
        _id: res.data.item._id,
        name: res.data.item.name,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
      });

      isEmailSaved
        ? localStorage.setItem("savedEmail", formData.email)
        : localStorage.removeItem("savedEmail");

      navigate("/"); // 뒤로가기로 변경해야 함
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };

  const handleCheckboxChange = () => {
    setIsEmailSaved(!isEmailSaved);
  };

  const handleTestLogin = async () => {
    const testEmail = "test@haemeogeo.com";
    const testPassword = "11111111";

    setEmail(testEmail);
    setPassword(testPassword);

    try {
      const res = await axios.post("/users/login", {
        email: testEmail,
        password: testPassword,
      });
      alert(res.data.item.name + "님 밥 해머거!");

      setUser({
        _id: res.data.item._id,
        name: res.data.item.name,
        email: res.data.item.email,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
      });

      isEmailSaved
        ? localStorage.setItem("savedEmail", testEmail)
        : localStorage.removeItem("savedEmail");

      setEmail("");
      setPassword("");

      navigate("/user/MyPage");
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };

  return (
    <>
      <LoginLayout>
        <Title>로그인</Title>
        {user && <p>{user.name}님 밥 해머거!</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="email"
            defaultValue={email}
            placeholder="아이디 또는 이메일 주소"
            {...register("email", {
              required: "아이디(이메일)을 입력하세요.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "이메일 형식이 아닙니다.",
              },
            })}
          />
          <br />
          {errors && <div>{errors.email?.message}</div>}
          <div>
            <input
              type="checkbox"
              id="saveEmail"
              checked={isEmailSaved}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="saveEmail">아이디(이메일) 저장하기</label>
          </div>
          <br />
          <input
            type="password"
            id="password"
            defaultValue={password}
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호는 8자리를 입력해주세요",
              minLength: {
                value: 8,
                message: "8자리를 입력해주세요.",
              },
            })}
          />
          <br />
          {errors && <div>{errors.password?.message}</div>}
          <Button type="submit" color="primary" size="large" filled="filled">
            로그인
          </Button>
          <br />
          <Button
            type="button"
            onClick={(e) => handleTestLogin(e)}
            color="gray"
            size="large"
            filled="false"
          >
            테스트 계정으로 로그인
          </Button>
          <button type="button" onClick={(e) => handleTestLogin(e)}>
            테스트 계정으로 로그인
          </button>
          <br />
          <LinkButton
            to={"/user/signup"}
            color="gray"
            size="large"
            filled="false"
          >
            회원가입
          </LinkButton>
        </form>
      </LoginLayout>
    </>
  );
}

export default Login;

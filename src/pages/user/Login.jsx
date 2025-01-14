import { Button, LinkButton } from "@components/Button/Button";
import Title from "@components/Title/Title";
import LoginLayout from "@components/login/LoginLayout";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import userStore from "@zustand/userStore.mjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import SocialKakao from "@components/socialLogin/SocialKakao";
import modalStore from "@zustand/modalStore.mjs";
import SEOMetaTag from "@/assets/SEOMetaTag";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEmailSaved, setIsEmailSaved] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { form, buttons, save } = styles;
  const { user, setUser } = userStore();
  const { setModal } = modalStore();

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
      setModal({
        message: res.data.item.name + "님 밥 해머거!",
        event: () => {
          const previousPathname = location.state?.from?.pathname;
          if (previousPathname && previousPathname.includes("/user/signup")) {
            navigate("/", { replace: true });
          } else {
            navigate(-1);
          }
        },
      });

      setUser({
        _id: res.data.item._id,
        name: res.data.item.name,
        email: res.data.item.email,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
        birthday: res.data.item.birthday,
      });

      isEmailSaved
        ? localStorage.setItem("savedEmail", formData.email)
        : localStorage.removeItem("savedEmail");
    } catch (err) {
      setModal({ message: err.response?.data.message });
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
      setModal({
        message: res.data.item.name + "님 밥 해머거!",
        event: () => {
          const previousPathname = location.state?.from?.pathname;
          if (previousPathname && previousPathname.includes("/user/signup")) {
            navigate("/", { replace: true });
          } else {
            navigate(-1);
          }
        },
      });

      setUser({
        _id: res.data.item._id,
        name: res.data.item.name,
        email: res.data.item.email,
        profile: res.data.item.profileImage,
        token: res.data.item.token,
        birthday: res.data.item.birthday,
      });

      isEmailSaved
        ? localStorage.setItem("savedEmail", testEmail)
        : localStorage.removeItem("savedEmail");
    } catch (err) {
      setModal({ message: err.response?.data.message });
    }
  };

  return (
    <>
      <SEOMetaTag title="로그인" />
      <LoginLayout>
        <Title>로그인</Title>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${form} ${styles.login}`}
        >
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
            className={errors.email ? "errorMsg" : ""}
          />

          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          <fieldset className={save}>
            <input
              type="checkbox"
              id="saveEmail"
              checked={isEmailSaved}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="saveEmail">아이디(이메일) 저장하기</label>
          </fieldset>

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
            className={errors.password ? "errorMsg" : ""}
          />

          {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}
          <div className={buttons}>
            <Button type="submit" color="primary" size="large" filled="filled">
              로그인
            </Button>

            <SocialKakao />

            <Button
              type="button"
              onClick={(e) => handleTestLogin(e)}
              color="gray"
              size="large"
              filled="false"
            >
              테스트 계정으로 로그인
            </Button>

            <LinkButton
              to={"/user/signup"}
              color="gray"
              size="large"
              filled="false"
            >
              회원가입
            </LinkButton>
          </div>
        </form>
      </LoginLayout>
    </>
  );
}

export default Login;

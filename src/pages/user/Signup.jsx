import { LinkButton } from "@components/Button/Button";
import Title from "@components/Title/Title";
import LoginLayout from "@components/login/LoginLayout";
import styles from "./Signup.module.css";

function Signup() {
  const { subtitle, form } = styles;
  return (
    <>
      <LoginLayout>
        <Title>회원가입</Title>
        <p className={subtitle}>
          배달음식은 그만! 함께 밥 <strong>해머거</strong>요 :-)
        </p>
        <form className={form}>
          <LinkButton
            to={"/user/SignupStepOne"}
            type="button"
            color="primary"
            size="large"
            filled="filled"
          >
            이메일 주소로 회원가입
          </LinkButton>
        </form>
      </LoginLayout>
    </>
  );
}

export default Signup;

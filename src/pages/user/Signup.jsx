import { LinkButton } from "@components/Button/Button";
import Title from "@components/Title/Title";
import LoginLayout from "@components/login/LoginLayout";

function Signup(){
  return (
    <>
      <LoginLayout>
        <Title>회원가입</Title>
        <p>배달음식은 그만! 함께 밥 <strong>해머거</strong>요 :-)</p>
        <form>
          <LinkButton to={'/user/SignupStepOne'} type="button" color="primary" size="large" filled="filled">이메일 주소로 회원가입</LinkButton>
        </form>
      </LoginLayout>
    </>
  )
}

export default Signup;
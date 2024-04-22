import { SignupSteps, SignupStepsItem } from "@components/Signup/SignupSteps";
import Title from "@components/Title/Title";
import LoginLayout from "@components/login/LoginLayout";

function SignupStepThree() {
  return (
    <>
      <LoginLayout>
        <Title>회원가입</Title>

        <SignupSteps>
          <SignupStepsItem>약관동의</SignupStepsItem>
          <SignupStepsItem>계정생성</SignupStepsItem>
          <SignupStepsItem color="black" fontWeight="bold">
            가입완료
          </SignupStepsItem>
        </SignupSteps>
      </LoginLayout>
    </>
  );
}

export default SignupStepThree;

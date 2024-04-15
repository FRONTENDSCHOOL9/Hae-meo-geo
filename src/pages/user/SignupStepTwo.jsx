import { Button } from "@components/Button/Button";
import { SignupSteps, SignupStepsItem } from "@components/Signup/SignupSteps";
import Title from "@components/Title/Title";
import LoginLayout from "@components/login/LoginLayout";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useState } from "react";

function SignupStepTwo() {
  const axios = useCustomAxios();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  }
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  }
 
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      setResult("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axios.get(`/users/email?email=${email}`);
      setResult(res.data.ok === 1 ? "사용할 수 있는 이메일입니다." : "이미 등록된 이메일입니다.");
    } catch (err) {
      setResult(err.response?.data.message || "이메일을 정확히 입력해주세요.");
    }
  }

  return (
    <>
      <LoginLayout>
        <Title>회원가입</Title>

        <SignupSteps>
          <SignupStepsItem>약관동의</SignupStepsItem>
          <SignupStepsItem color="black">계정생성</SignupStepsItem>
          <SignupStepsItem>가입완료</SignupStepsItem>
        </SignupSteps>

        <form onSubmit={onSubmit}>
          <fieldset>
            <label htmlFor="email">아이디(이메일)*</label>
            <input type="text" id="email" value={email} onChange={handleEmailChange} />
            <Button type="submit" color="primary" size="large">확인</Button>
            {result && <p>{result}</p>}
          </fieldset>
          <fieldset>
            <label htmlFor="password">비밀번호*</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </fieldset>
          <fieldset>
            <label htmlFor="confirmPassword">비밀번호 확인*</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {!passwordMatch && <p>비밀번호가 일치하지 않습니다.</p>}
          </fieldset>
          <fieldset>
            <label htmlFor="nickname">닉네임*</label>
            <input type="text" id="nickname" />
          </fieldset>
          <fieldset>
            <label htmlFor="birthdate">생년월일</label>
            <input type="text" id="birthdate" />
          </fieldset>
          <fieldset>
            <label htmlFor="profile">프로필</label>
            <input type="file" id="profile" />
          </fieldset>
          <hr />
          <Button color="gray" size="large" filled="filled">확인</Button>
        </form>
      </LoginLayout>
    </>
  )
}

export default SignupStepTwo;
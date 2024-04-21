import { Button } from "@components/Button/Button";
import { SignupSteps, SignupStepsItem } from "@components/Signup/SignupSteps";
import Title from "@components/Title/Title";
import LoginLayout from "@components/login/LoginLayout";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupStepOne() {
  const [allChecked, setAllChecked] = useState(false);
  const { subtitle, checkbox } = styles;
  const checkboxesRef = useRef([]);
  const navigate = useNavigate();
  const handleAllCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);

    checkboxesRef.current.forEach((checkboxRef) => {
      checkboxRef.checked = isChecked;
    });
  };

  const handleRequiredCheckboxChange = () => {
    const areAllRequiredChecked = Array.from(
      document.querySelectorAll('input[type="checkbox"]'),
    )
      .filter((checkbox) => checkbox.getAttribute("data-required") === "true")
      .every((checkbox) => checkbox.checked);

    setAllChecked(areAllRequiredChecked);
  };

  const handleNextButtonClick = () => {
    const anyCheckboxUnchecked = checkboxesRef.current.some(
      (checkbox) => !checkbox.checked,
    );

    anyCheckboxUnchecked
      ? alert("[필수] 항목에 체크해주세요")
      : navigate("/user/signupStepTwo");
  };

  return (
    <>
      <LoginLayout>
        <Title>회원가입</Title>

        <SignupSteps>
          <SignupStepsItem color="black">약관동의</SignupStepsItem>
          <SignupStepsItem>계정생성</SignupStepsItem>
          <SignupStepsItem>가입완료</SignupStepsItem>
        </SignupSteps>

        <form>
          <fieldset>
            <input
              type="checkbox"
              id="agreeAll"
              checked={allChecked}
              onChange={handleAllCheckboxChange}
            />
            <label htmlFor="agreeAll">전체 동의</label>
          </fieldset>
          <hr />
          <fieldset>
            <input
              type="checkbox"
              id="ageCheck"
              data-required="true"
              ref={(el) => (checkboxesRef.current[0] = el)}
              onChange={handleRequiredCheckboxChange}
            />
            <label htmlFor="ageCheck">[필수] 만 14세 이상 입니다.</label>
          </fieldset>
          <fieldset>
            <input
              type="checkbox"
              id="termsCheck"
              data-required="true"
              ref={(el) => (checkboxesRef.current[1] = el)}
              onChange={handleRequiredCheckboxChange}
            />
            <label htmlFor="termsCheck">[필수] 이용약관 확인</label>
          </fieldset>
          <fieldset>
            <input
              type="checkbox"
              id="privacyCheck"
              data-required="true"
              ref={(el) => (checkboxesRef.current[2] = el)}
              onChange={handleRequiredCheckboxChange}
            />
            <label htmlFor="privacyCheck">[필수] 개인정보처리방침 확인</label>
          </fieldset>
          <p>회원 탈퇴 시까지 회원으로서 자격이 유지됩니다.</p>
          <Button
            onClick={handleNextButtonClick}
            color="gray"
            size="large"
            filled="filled"
          >
            다음
          </Button>
        </form>
      </LoginLayout>
    </>
  );
}

export default SignupStepOne;

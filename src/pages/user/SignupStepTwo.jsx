import { Button } from "@components/Button/Button";
import { SignupSteps, SignupStepsItem } from "@components/Signup/SignupSteps";
import Title from "@components/Title/Title";
import LoginLayout from "@components/login/LoginLayout";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./SignupStepTwo.module.css";
import ReplyStyle from "../../components/Recipe/Detail/Reply/Reply.module.css";
import uploadImage from "@utils/uploadImage.mjs";
import { useEffect } from "react";
import userStore from "@zustand/userStore.mjs";
import modalStore from "@zustand/modalStore.mjs";

function SignupStepTwo() {
  const { form, profilewrapper, flexWr } = styles;
  const [emailAvailability, setEmailAvailability] = useState(null);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const [attachImg, setAttachImg] = useState();
  const { user } = userStore();
  const { setModal } = modalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const file = useRef();
  const { ref } = register("profileImage");
  const email = watch("email");

  const onSubmit = async (formData) => {
    try {
      if (formData.profileImage.length > 0) {
        formData.profileImage = await uploadImage(formData);
      } else {
        formData.profileImage = "no-profile.png";
      }

      formData.type = "user";
      const res = await axios.post("/users", formData);
      setModal({
        message: `${res.data.item.name}님 회원가입 완료 되었습니다! \n로그인 후에 이용하세요.`,
        event: () => {
          navigate("/user/login");
        },
      });
    } catch (err) {
      console.error(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg }),
        );
      } else if (err.response?.data.message) {
        console.error(err);
        setModal({ message: err.response?.data.message });
      }
    }
  };

  const checkEmailAvailability = async () => {
    try {
      const res = await axios.get(`/users/email?email=${email}`);
      if (res && res.data) {
        setEmailAvailability(res.data.ok && "사용 가능한 이메일입니다.");
      }
    } catch (err) {
      setEmailAvailability(
        err.response.data.ok === 0 ? "이미 사용 중인 이메일입니다." : "",
      );
    }
  };

  const handleCheckEmail = async () => {
    email && (await checkEmailAvailability());
  };

  const handleAttachRemove = () => {
    setAttachImg();
    file.current.value = "";
  };

  useEffect(() => {
    if (user) navigate("/");
  });

  return (
    <>
      <LoginLayout>
        <Title>회원가입</Title>
        <SignupSteps>
          <SignupStepsItem>약관동의</SignupStepsItem>
          <SignupStepsItem color="black" fontWeight="bold">
            계정생성
          </SignupStepsItem>
          <SignupStepsItem>가입완료</SignupStepsItem>
        </SignupSteps>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${form} ${styles.steptwo}`}
        >
          <fieldset>
            <label htmlFor="email">아이디(이메일)*</label>
            <div className={flexWr}>
              <input
                placeholder="아이디(이메일)*"
                type="email"
                id="email"
                {...register("email", {
                  required: "이메일을 입력하세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "이메일 형식이 올바르지 않습니다.",
                  },
                })}
                className={errors.email ? "errorMsg" : ""}
              />
              <Button
                type="button"
                onClick={handleCheckEmail}
                color="primary"
                size="large"
                margin="false"
              >
                확인
              </Button>
            </div>
            {errors.email && <p className="errorMsg">{errors.email.message}</p>}

            {emailAvailability && <p>{emailAvailability}</p>}
          </fieldset>
          <fieldset>
            <label htmlFor="password">비밀번호*</label>
            <input
              placeholder="비밀번호*"
              type="password"
              id="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
              })}
            />
            {errors.password && (
              <p className="errorMsg">{errors.password.message}</p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="confirmPassword">비밀번호 확인*</label>
            <input
              placeholder="비밀번호 확인*"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                extra: "confirmPassword",
                required: "비밀번호를 다시 입력하세요.",
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.confirmPassword && (
              <p className="errorMsg">{errors.confirmPassword.message}</p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="name">닉네임*</label>
            <input
              placeholder="닉네임"
              type="text"
              id="name"
              {...register("name", {
                required: "닉네임을 입력하세요.",
                minLength: {
                  value: 2,
                  message: "2글자 이상 입력하세요.",
                },
              })}
            />
            {errors.name && <p className="errorMsg">{errors.name.message}</p>}
          </fieldset>
          <fieldset>
            <label htmlFor="birthday">생일</label>
            <input
              type="text"
              id="birthday"
              placeholder="MM-DD"
              {...register("birthday", {
                extra: "birthday",
                pattern: {
                  value: /^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                  message: "올바른 형식으로 입력하세요. (MM-DD)",
                },
              })}
            />
            {errors.birthday && (
              <p className="errorMsg">{errors.birthday.message}</p>
            )}
          </fieldset>
          <fieldset className={profilewrapper}>
            <label htmlFor="profileImage" className="profilelabel">
              프로필
            </label>
            <div
              className={` ${styles.profile} ${ReplyStyle.attachWr} ${styles.attachWr} ${
                attachImg ? ReplyStyle.act : ""
              }`}
            >
              <label htmlFor="profileImage" className="profilelabel">
                <img src={attachImg} alt="" />
                <span className="hidden">첨부파일 선택</span>
              </label>
              <button type="button" onClick={handleAttachRemove}>
                <span className="hidden">첨부파일 삭제</span>
              </button>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                {...register("profileImage", {
                  onChange: (e) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onloadend = () => {
                      setAttachImg(reader.result);
                    };
                  },
                })}
                ref={(e) => {
                  ref(e);
                  file.current = e;
                }}
              />
            </div>
          </fieldset>
          <hr />
          <Button type="submit" color="gray" size="large" filled="filled">
            회원가입
          </Button>
        </form>
      </LoginLayout>
    </>
  );
}

export default SignupStepTwo;

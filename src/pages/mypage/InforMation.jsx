import { useForm } from "react-hook-form";
import styles from "@pages/mypage/MyPage.module.css";
import useUserStore from "@zustand/userStore.mjs";

import { Button, LinkButton } from "@components/Button/Button";
import PageSide from "./PageSide";
import { useState } from "react";
import useCustomAxios from "@hooks/useCustomAxios.mjs";

function InforMation() {
  const axios = useCustomAxios();
  const {
    register,
    handleSubmit,
    watch,
    handleClick,
    formState: { errors },
  } = useForm();

  const [emailAvailability, setEmailAvailability] = useState(null);
  const email = watch("email");

  const checkEmailAvailability = async () => {
    try {
      const res = await axios.get(`/users/email?email=${email}`);
      setEmailAvailability(res.data.ok && "사용 가능한 이메일입니다.");
    } catch (err) {
      setEmailAvailability(
        err.response.data.ok === 0 ? "이미 사용 중인 이메일입니다." : "",
      );
    }
  };

  const handleCheckEmail = async () => {
    email && (await checkEmailAvailability());
  };
  const { user } = useUserStore();

  return (
    <>
      <div className={styles.page}>
        <PageSide />
        <wrap className={styles.information}>
          <div className={styles.button}>
            <LinkButton
              to={"/mypage/information"}
              color="secondary"
              size="large"
              filled="false"
              onClick={handleClick}
            >
              회원 정보 수정
            </LinkButton>
            <LinkButton
              to={"/mypage/BookMark"}
              color="gray"
              size="large"
              filled="false"
            >
              나도 해보기 목록
            </LinkButton>
          </div>
          <br />
          <form className={styles.form} onSubmit={handleSubmit(onsubmit)}>
            <fieldset className={styles.label}>
              <label htmlFor="email">아이디(이메일)</label>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder={user.email}
                {...register("email", {
                  required: "아이디을 입력하세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "이메일 형식이 아닙니다.",
                  },
                })}
              />
              <Button
                type="button"
                onClick={handleCheckEmail}
                color="primary"
                size="large"
              >
                확인
              </Button>
              {errors.email && <p>{errors.email.message}</p>}
              {emailAvailability && <p>{emailAvailability}</p>}
            </fieldset>

            <fieldset className={styles.label}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                className={styles.input}
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </fieldset>

            <fieldset className={styles.label}>
              <label htmlFor="confirmPassword">비밀번호 확인*</label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.input}
                {...register("confirmPassword", {
                  extra: "confirmPassword",
                  required: "비밀번호를 다시 입력하세요.",
                  validate: (value) =>
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </fieldset>

            <fieldset className={styles.label}>
              <label htmlFor="name">닉네임</label>
              <input
                type="text"
                id="name"
                className={styles.input}
                placeholder={user.name}
                {...register("name", {
                  required: "닉네임을 입력하세요.",
                  minLength: {
                    value: 2,
                    message: "닉네임은 2글자 이상 입력하세요.",
                  },
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </fieldset>

            <fieldset className={styles.label}>
              <label htmlFor="birthdate">생년월일</label>
              <input
                type="text"
                id="birthdate"
                placeholder="YY-MM-DD"
                {...register("birthdate", {
                  extra: "birthdate",
                  pattern: {
                    value: /^\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                    message: "올바른 형식으로 입력하세요. (YY-MM-DD)",
                  },
                })}
              />
              {errors.birthdate && <p>{errors.birthdate.message}</p>}
            </fieldset>

            <fieldset className={styles.label}>
              <label htmlFor="profileImage">프로필 이미지</label>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                className={styles.input}
                {...register("profileImage")}
              />
            </fieldset>
            <hr />
            <Button type="submit" color="primary" size="large" filled="false">
              수정하기
            </Button>
          </form>
          <br />
          <div className={styles.resign}>
            <Button
              type="button"
              color="Transparency"
              size="small"
              filled="false"
            >
              회원 탈퇴하기
            </Button>
          </div>
        </wrap>
      </div>
    </>
  );
}

export default InforMation;

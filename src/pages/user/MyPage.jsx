//import useUserState from "./useUserState.mjs";
import { useForm } from "react-hook-form";
import styles from "./MyPage.module.css";
import { Button } from "@components/Button/Button";
import Submit from "@components/Submit";
// import { Link } from "react-router-dom";

function MyPage() {
  //const { user } = useUserState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.pageside}>
          <div className={styles.icon}>d</div>
          <p>한태희님 환영합니다.</p>
          <Button>로그아웃</Button>
        </div>
        <div className={styles.user}>
          <Button>회원정보 수정</Button>
          <Button>나도 해보기 목록</Button>

          <form className={styles.form} onSubmit={handleSubmit(onsubmit)}>
            <div>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                placeholder="hantaehee12@naver.com"
                {...register("email", {
                  required: "이메일을 입력하세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "이메일 형식이 아닙니다.",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="password">비밀번호 확인</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="name">닉네임</label>
              <input
                type="text"
                id="name"
                placeholder="닉네임을 입력하세요."
                {...register("name", {
                  required: "닉네임을 입력하세요.",
                  minLength: {
                    value: 2,
                    message: "닉네임은 2글자 이상 입력하세요.",
                  },
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="date">생년월일</label>
              <input
                type="date"
                id="date"
                placeholder="생년월일을 입력하세요."
                {...register("date", {
                  required: "생년월일을 입력하세요.",
                })}
              />
              {errors.date && <p>{errors.date.message}</p>}
            </div>

            <div>
              <label htmlFor="profileImage">프로필 이미지</label>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                placeholder="이미지를 선택하세요"
                {...register("profileImage")}
              />
            </div>
            <Submit>수정하기</Submit>
          </form>
          <Button>회원 탈퇴하기</Button>
        </div>
      </div>
    </>
  );
}

export default MyPage;

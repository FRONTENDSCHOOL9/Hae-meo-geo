//import useUserState from "./useUserState.mjs";
import { useForm } from "react-hook-form";
import styles from "./MyPage.module.css";
import { Button } from "@components/Button/Button";
import useUserStore from "@zustand/userStore.mjs";

// import Submit from "@components/Submit";
// import { Link } from "react-router-dom";

function MyPage() {
  //const { user } = useUserState();
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.pageside}>
          <wrap className={styles.wrap}>
            <div className={styles.icon}>{user.profile}</div>
            <p className={styles.user}>{user.name}님 환영합니다.</p>
          </wrap>
          <Button type="button" color="secondary" size="max" filled="false">
            로그아웃
          </Button>
        </div>

        <wrap className={styles.information}>
          <div>
            <Button type="button" color="secondary" size="large" filled="false">
              회원정보 수정
            </Button>
            <Button type="button" color="white" size="large" filled="false">
              나도 해보기 목록
            </Button>
          </div>
          <br />

          <form className={styles.form} onSubmit={handleSubmit(onsubmit)}>
            <div>
              <label htmlFor="email" className={styles.label}>
                아이디(이메일)
              </label>
              <input
                type="email"
                id="email"
                placeholder={user.email}
                className={styles.input}
                {...register("email", {
                  required: "아이디을 입력하세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "이메일 형식이 아닙니다.",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>
                비밀번호 확인
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                {...register("password", {
                  required: "비밀번호를 입력하세요.",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="name" className={styles.label}>
                닉네임
              </label>
              <input
                type="text"
                id="name"
                placeholder={user.name}
                className={styles.input}
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
              <label htmlFor="date" className={styles.label}>
                생년월일
              </label>
              <input
                type="date"
                id="date"
                className={styles.input}
                {...register("date", {
                  required: "생년월일을 입력하세요.",
                })}
              />
              {errors.date && <p>{errors.date.message}</p>}
            </div>

            <div>
              <label htmlFor="profileImage" className={styles.label}>
                프로필 이미지
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                className={styles.input}
                {...register("profileImage")}
              />
            </div>
            <Button type="submit" color="primary" size="large" filled="filled">
              수정하기
            </Button>
          </form>
          <Button>회원 탈퇴하기</Button>
        </wrap>
      </div>
    </>
  );
}

export default MyPage;

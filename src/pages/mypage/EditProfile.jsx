import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import userStore from "@zustand/userStore.mjs";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { Button, LinkButton } from "@components/Button/Button";
import styles from "./MyPage.module.css";
import ReplyStyle from "../../components/Recipe/Detail/Reply/Reply.module.css";
import { useNavigate } from "react-router-dom";
import modalStore from "@zustand/modalStore.mjs";

function EditProfile() {
  const [attachImg, setAttachImg] = useState();
  const [userProfile, setUserProfile] = useState();
  const { user, setUser } = userStore();
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { setModal } = modalStore();
  const isHttpUrl = /^(http|https):\/\//;
  const [emailAvailability, setEmailAvailability] = useState(null);
  const { mypage, myheader, myprofile, modify, profilewrapper, flexWr } =
    styles;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { ref } = register("profileImage");
  const file = useRef();
  const email = watch("email");

  const fetchData = async () => {
    try {
      const res = await axios.get(`/users/${user._id}`);
      const pres = await axios.get(`/users/${user._id}/profileImage`);
      setUserProfile(pres.data.item);
      setUser(res.data.item);
      console.log("User data:", res.data.item);
      console.log("Birthday:", res.data.item.extra?.birthday);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const handleLogout = () => {
    setModal({
      message: "로그아웃 되었습니다.",
      event: () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/user/login");
      },
    });
  };

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

  const handleAttachRemove = () => {
    setAttachImg(null);
    file.current.value = "";
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={mypage}>
      <section className={myheader}>
        <div className={myprofile}>
          {userProfile && (
            <img
              src={
                isHttpUrl.test(userProfile?.profileImage)
                  ? userProfile?.profileImage
                  : `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${userProfile?.profileImage}`
              }
              alt="내 프로필 이미지"
            />
          )}
        </div>
        {user && <p className={styles.user}>{user.name}</p>}

        <div className={styles["logout-box"]}>
          <LinkButton
            to={"/user/login"}
            color="secondary"
            size="large"
            filled="false"
            onClick={handleLogout}
          >
            로그아웃
          </LinkButton>
        </div>
      </section>
      <section className={modify}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <fieldset>
            <label htmlFor="email">아이디(이메일)</label>
            <div className={flexWr}>
              <input
                type="email"
                id="email"
                placeholder={user.email}
                {...register("email", {
                  required: "이메일을 입력하세요.",
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
            </div>
            {errors.email && <p>{errors.email.message}</p>}
            {emailAvailability && <p>{emailAvailability}</p>}
          </fieldset>

          <fieldset>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </fieldset>

          <fieldset>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
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
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </fieldset>

          <fieldset>
            <label htmlFor="name">닉네임</label>
            <input
              type="text"
              id="name"
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

          <fieldset>
            <label htmlFor="birthday">생일</label>
            <input
              type="text"
              id="birthday"
              placeholder={user.extra?.birthday || "MM-DD"}
              {...register("birthday", {
                extra: "birthday",
                pattern: {
                  value: /^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                  message: "올바른 형식으로 입력하세요. (MM-DD)",
                },
              })}
            />
            {errors.birthday && <p>{errors.birthday.message}</p>}
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
          <LinkButton
            to={"/mypage/editprofile"}
            color="primary"
            size="large"
            filled="false"
          >
            수정하기
          </LinkButton>
        </form>
      </section>
    </div>
  );
}

export default EditProfile;

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import userStore from "@zustand/userStore.mjs";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { Button, LinkButton } from "@components/Button/Button";
import styles from "./MyPage.module.css";
import ReplyStyle from "../../components/Recipe/Detail/Reply/Reply.module.css";
import MypageMenu from "@components/Mypage/MypageMenu";

function MyPage() {
  const [attachImg, setAttachImg] = useState();
  const [userInfo, setUserInfo] = useState();
  const { user, setUser } = userStore();
  const axios = useCustomAxios();
  const isHttpUrl = /^(http|https):\/\//;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const file = useRef();
  const { ref } = register("profileImage");

  const fetchData = async () => {
    try {
      const res = await axios.get(`/users/${user._id}`);
      console.log(res);
      setUserInfo(res.data.item);
      if (res.data.item.profileImage) {
        setAttachImg(
          `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${res.data.item.profileImage}`,
        );
      }
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      setUser(null);
      localStorage.removeItem("user");

      navigate("/user/login");
    } else {
    }
  };

  // const handleLogout = () => {
  //   setModal({
  //     message: "로그아웃 되었습니다.",
  //     event: () => {
  //       setUser(null);
  //       localStorage.removeItem("user");
  //       navigate("/user/login");
  //     },
  //   });
  // };

  const handleAttachRemove = () => {
    setAttachImg(null);
    file.current.value = "";
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { mypage, myheader, myprofile, modify, profilewrapper, flexWr } =
    styles;
  return (
    <div className={mypage}>
      <section className={myheader}>
        <div className={myprofile}>
          {userInfo && userInfo.profileImage && (
            <img
              src={
                isHttpUrl.test(userInfo.profileImage)
                  ? userInfo.profileImage
                  : `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${userInfo.profileImage}`
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
        <MypageMenu />
        <form onSubmit={handleSubmit(onsubmit)}>
          <fieldset>
            <label htmlFor="email">아이디(이메일)</label>
            <div className={flexWr}>
              <input
                type="email"
                id="email"
                defaultValue={userInfo?.email}
                disabled
              />
            </div>
          </fieldset>

          <fieldset>
            <label htmlFor="currentPassword">기존 비밀번호</label>
            <input
              type="password"
              id="currentPassword"
              {...register("currentPassword", {
                required: "비밀번호를 입력하세요.",
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </fieldset>
          <fieldset>
            <label htmlFor="newPassword">변경 비밀번호</label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword", {
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
              defaultValue={userInfo?.name}
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
              // defaultValue={userInfo?.extra || "MM-DD"}
              defaultValue={userInfo?.birthday}
              placeholder="MM-DD"
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
          <Button type="submit" color="primary" size="large" filled="false">
            수정하기
          </Button>
        </form>
      </section>
    </div>
  );
}

export default MyPage;

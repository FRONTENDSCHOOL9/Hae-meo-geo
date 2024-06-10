import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userStore from "@zustand/userStore.mjs";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { LinkButton } from "@components/Button/Button";
import styles from "./MyPage.module.css";
import MypageMenu from "@components/Mypage/MypageMenu";
import { useNavigate } from "react-router-dom";
import modalStore from "@zustand/modalStore.mjs";

function MyPage() {
  const { user, setUser } = userStore();
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { setModal } = modalStore();
  const isHttpUrl = /^(http|https):\/\//;
  const { mypage, myheader, myprofile, modify } = styles;
  const { handleSubmit } = useForm();

  const [profile, setProfile] = useState();
  const [birthday, setBirthday] = useState();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/users/${user._id}`);
      setProfile(res.data.item);
      console.log("Profile data:", res.data.item);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const fetchBirthday = async () => {
    try {
      const res = await axios.get(`/users/${user._id}`);
      setBirthday(res.data.item.extra?.birthday);
      console.log("Birthday data:", res.data.item.extra?.birthday);
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

  useEffect(() => {
    fetchProfile();
    fetchBirthday();
  }, []);

  return (
    <div className={mypage}>
      <section className={myheader}>
        <div className={myprofile}>
          {profile && (
            <img
              src={
                isHttpUrl.test(profile?.profileImage)
                  ? profile?.profileImage
                  : `${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${profile?.profileImage}`
              }
              alt="내 프로필 이미지"
            />
          )}
        </div>
        {profile && <p className={styles.user}>{profile.name}</p>}

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
            <input type="email" id="email" placeholder={user.email} readOnly />
          </fieldset>

          <fieldset>
            <label htmlFor="name">닉네임</label>
            <input type="text" id="name" placeholder={profile?.name} readOnly />
          </fieldset>

          <fieldset>
            <label htmlFor="birthday">생일</label>
            <input
              type="text"
              id="birthday"
              placeholder={birthday || "MM-DD"}
              readOnly
            />
          </fieldset>
          <hr />
          <LinkButton
            to={"/mypage/editprofile"}
            type="button"
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

export default MyPage;

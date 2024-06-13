import { useEffect, useState } from "react";
import userStore from "@zustand/userStore.mjs";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { LinkButton } from "@components/Button/Button";
import styles from "./MyPage.module.css";
import MypageMenu from "@components/Mypage/MypageMenu";
import EditProfile from "./EditProfile";
import modalStore from "@zustand/modalStore.mjs";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const [userInfo, setUserInfo] = useState();
  const { user, setUser } = userStore();
  const axios = useCustomAxios();
  const isHttpUrl = /^(http|https):\/\//;
  const { setModal } = modalStore();
  const navigate = useNavigate();
  const { mypage, myheader, myprofile } = styles;

  const fetchData = async () => {
    try {
      const res = await axios.get(`/users/${user._id}`);
      setUserInfo(res.data.item);
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
    fetchData();
  }, []);

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
        {userInfo && <p className={styles.user}>{userInfo.name}</p>}

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
      <section className={styles.modify}>
        <MypageMenu />
        <EditProfile userInfo={userInfo} user={user} setUser={setUser} />
      </section>
    </div>
  );
}

export default MyPage;

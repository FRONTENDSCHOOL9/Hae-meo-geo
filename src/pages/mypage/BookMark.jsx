import MypageMenu from "@components/Mypage/MypageMenu";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import userStore from "@zustand/userStore.mjs";
import { useEffect, useState } from "react";
import styles from "../../components/Recipe/List/List.module.css";
import { Link, useNavigate } from "react-router-dom";
import modalStore from "@zustand/modalStore.mjs";
import bookstyles from "./BookMark.module.css";

function BookMark() {
  const { user } = userStore();
  const axios = useCustomAxios();
  const [bookmarkedPosts, setBookmarkedPosts] = useState();
  const { setModal } = modalStore();
  const navigate = useNavigate();

  const fetchBookmarkedPosts = async () => {
    try {
      const res = await axios.get(`/bookmarks/product`);
      setBookmarkedPosts(res.data.item);
    } catch (err) {
      console.error(err);
    }
  };

  const postItem = bookmarkedPosts?.map((item) => (
    <li key={item._id}>
      <Link to={`/recipe/list/${item.product.name}`}>
        <img src={item.product.image.path} alt={item.product.name} />
        <p>{item.product.name}</p>
      </Link>
    </li>
  ));

  useEffect(() => {
    if (user && user._id) {
      fetchBookmarkedPosts();
    } else {
      console.error(err);
    }
  }, [user]);

  useEffect(() => {
    if (bookmarkedPosts?.length === 0) {
      setModal({
        message: "북마크된 레시피가 없어요. \n북마크 하러 갈까요?",
        isTwoButtons: true,
        event: () => {
          navigate("/recipe/list");
        },
      });
    }
  }, [bookmarkedPosts]);

  return (
    <>
      <MypageMenu />
      {bookmarkedPosts?.length === 0 ? (
        <div className={bookstyles.bookmark}>
          <span>북마크된 레시피가 없습니다.</span>
        </div>
      ) : (
        <div className={styles.rcpList}>
          <ul>{postItem}</ul>
        </div>
      )}
    </>
  );
}

export default BookMark;

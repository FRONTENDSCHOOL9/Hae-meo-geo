import MypageMenu from "@components/Mypage/MypageMenu";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import userStore from "@zustand/userStore.mjs";
import { useEffect, useState } from "react";
import styles from "../../components/Recipe/List/List.module.css";
import { Link } from "react-router-dom";

function BookMark() {
  const { user } = userStore();
  const axios = useCustomAxios();
  const [bookmarkedPosts, setBookmarkedPosts] = useState();

  const fetchBookmarkedPosts = async () => {
    try {
      const res = await axios.get(`/bookmarks/product`);
      setBookmarkedPosts(res.data.item);
      console.log(bookmarkedPosts, res.data.item);
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

  return (
    <>
      <MypageMenu />
      {bookmarkedPosts?.length === 0 ? (
        <p>북마크된 레시피가 없습니다.</p>
      ) : (
        <div className={styles.rcpList}>
          <ul>{postItem}</ul>
        </div>
      )}
    </>
  );
}

export default BookMark;

import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import styles from "./Bookmark.module.css";

function Bookmark({ id }) {
  const { bookmark, bookmarkAct } = styles;
  const axios = useCustomAxios();
  const [isBookmarked, setIsBookmarked] = useState();
  const [bookmarkId, setBookmarkId] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/bookmarks/product`);
      setIsBookmarked(data?.item.some((item) => item.product._id === id));
      if (isBookmarked) {
        data?.item.some((item) => {
          if (item.product._id === id) setBookmarkId(item._id);
        });
      }
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        const { data } = await axios.delete(`/bookmarks/${bookmarkId}`);
        setIsBookmarked(false);
        setBookmarkId();
      } else {
        const { data } = await axios.post(`/bookmarks/product/${id}`);
        setIsBookmarked(true);
        setBookmarkId(data.item._id);
      }
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className={`${bookmark} ${isBookmarked && bookmarkAct}`}
    >
      {isBookmarked ? "저장 완료" : "나도해보기"}
    </button>
  );
}

export default Bookmark;

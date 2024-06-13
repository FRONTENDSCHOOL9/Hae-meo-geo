import useCustomAxios from "@hooks/useCustomAxios.mjs";
import modalStore from "@zustand/modalStore.mjs";
import userStore from "@zustand/userStore.mjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Bookmark.module.css";
import PropTypes from "prop-types";

Bookmark.propTypes = {
  id: PropTypes.number.isRequired,
};

function Bookmark({ id }) {
  const { bookmark, bookmarkAct } = styles;
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const { user } = userStore();
  const { setModal } = modalStore();
  const [data, setData] = useState();
  const [isBookmarked, setIsBookmarked] = useState();
  const [bookmarkId, setBookmarkId] = useState();

  const fetchData = async () => {
    try {
      if (user) {
        const { data } = await axios.get(`/bookmarks/product`);
        setData(data.item);
        setIsBookmarked(data.item.some((item) => item.product._id === id));
      }
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isBookmarked) {
      data.some((item) => {
        if (item.product._id === id) setBookmarkId(item._id);
      });
    }
  }, [data]);

  const handleBookmark = async () => {
    try {
      if (user) {
        if (isBookmarked) {
          const { data } = await axios.delete(`/bookmarks/${bookmarkId}`);
          setIsBookmarked(false);
          setBookmarkId();
          setModal({ message: "나도해보기가 삭제되었습니다." });
        } else {
          const { data } = await axios.post(`/bookmarks/product/${id}`);
          setIsBookmarked(true);
          setBookmarkId(data.item._id);
          setModal({ message: "나도해보기가 등록되었습니다." });
        }
      } else {
        setModal({
          message: `잠깐! 로그인 후 이용할 수 있어요. \n로그인 하러갈까요?`,
          event: () => {
            navigate("/user/login");
          },
          isTwoButtons: true,
        });
      }
    } catch (err) {
      console.error(err, err.response?.data.message);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className={`${bookmark} ${isBookmarked ? bookmarkAct : ""}`}
    >
      <span className="pc">{isBookmarked ? "저장 완료" : "나도해보기"}</span>
    </button>
  );
}

export default Bookmark;

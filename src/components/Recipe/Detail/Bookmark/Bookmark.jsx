import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
// import styles from "./Bookmark.module.css";

function Bookmark({ id }) {
  const axios = useCustomAxios();
  const [bookmark, setBookmark] = useState();

  const fetchData = async (type = "get") => {
    try {
      const { data } = await axios.get(`/bookmarks/product/${id}`);
      console.log(data);
      setBookmark(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookmark = async () => {
    try {
      const { data } = await axios.post(`/bookmarks/product/${id}`);
      console.log(data);
      setBookmark(data.item);
    } catch (err) {
      console.error(err);
    }
  };
  return <button onClick={handleBookmark}>나도해보기</button>;
}

export default Bookmark;

import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import styles from "./List.module.css";

function ReplyList({ id, setRepliesFn, replies }) {
  const { list, rightWr, name, infoWr, time, rating, content } = styles;
  const axios = useCustomAxios();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `/posts?type=qna&custom={"product_id": ${id}}`
      );
      setRepliesFn(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const replyList = replies?.item.map((item) => (
    <article key={item._id}>
      <img src={item.user.profile} alt={item.user.name} />
      <div className={rightWr}>
        <p className={name}>{item.user.name}</p>
        <div className={infoWr}>
          <span className={time}>{item.createdAt}</span>
          <span className={`${rating} ${styles[`n${item.extra?.rating}`]}`}>
            <span className="hidden">{item.extra?.rating}점</span>
          </span>
        </div>
        <p className={content}>{item.content}</p>
      </div>
    </article>
  ));

  return <div className={list}>{replyList}</div>;
}

export default ReplyList;

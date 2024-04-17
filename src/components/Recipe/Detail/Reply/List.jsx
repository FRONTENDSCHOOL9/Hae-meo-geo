import { Button } from "@components/Button/Button";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import useUserStore from "@zustand/userStore.mjs";
import { useEffect } from "react";
import ReplyStyle from "./Reply.module.css";
import styles from "./List.module.css";

function ReplyList({ id, setRepliesFn, replies }) {
  const { list, rightWr, infoWr, time, contentWr, buttonWr, attachWr } = styles;
  const axios = useCustomAxios();
  const { user } = useUserStore();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `/posts?type=qna&custom={"product_id": ${id}}`
      );
      setRepliesFn(data);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = async (postId) => {
    try {
      const { data } = await axios.delete(`/posts/${postId}`);
      fetchData();
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const handleModify = async (postId) => {
    try {
      console.log(postId);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const replyList = replies?.item.map((item) => {
    console.log(`n${item.extra?.rating}`);
    const isMyPost = user && user._id === item.user._id;
    return (
      <article key={item._id} className={ReplyStyle.replyWr}>
        <img
          className={ReplyStyle.profile}
          src={item.user.profile}
          alt={item.user.name}
        />
        <div className={rightWr}>
          <p className={ReplyStyle.name}>{item.user.name}</p>
          <div className={ReplyStyle.flexWr}>
            <span className={time}>{item.createdAt}</span>
            <span
              className={`${ReplyStyle.rating} ${
                ReplyStyle[`n${item.extra?.rating}`]
              }`}
            >
              <span className="hidden">{item.extra?.rating}점</span>
            </span>
          </div>
          <div className={contentWr}>
            <p>{item.content}</p>

            {isMyPost && (
              <div className={buttonWr}>
                <Button onClick={() => handleModify(item._id)} color="primary">
                  수정
                </Button>
                <Button onClick={() => handleRemove(item._id)}>삭제</Button>
              </div>
            )}
          </div>
        </div>

        {item.extra?.image && (
          <div className={ReplyStyle.attachWr}>
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/06-haemeogeo/${
                item.extra?.image
              }`}
              alt="후기 이미지"
            />
          </div>
        )}
      </article>
    );
  });

  return (
    <div className={list}>
      {replies?.item.length ? replyList : <p>아직 작성된 후기가 없습니다.</p>}
    </div>
  );
}

export default ReplyList;

import { Button } from "@components/Button/Button";
import ReplyRegister from "@components/Recipe/Detail/Reply/Register";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import modalStore from "@zustand/modalStore.mjs";
import useUserStore from "@zustand/userStore.mjs";
import { useEffect } from "react";
import styles from "./List.module.css";
import ReplyStyle from "./Reply.module.css";
import PropTypes from "prop-types";

ReplyList.propTypes = {
  id: PropTypes.number.isRequired,
  rcpName: PropTypes.string.isRequired,
  replies: PropTypes.object,
  setRepliesFn: PropTypes.func.isRequired,
  attachImgModify: PropTypes.string,
  setAttachImgModify: PropTypes.func.isRequired,
  postId: PropTypes.number,
  setPostId: PropTypes.func.isRequired,
  ratingModify: PropTypes.number,
  setRatingModify: PropTypes.func.isRequired,
};

function ReplyList({
  id,
  rcpName,
  replies,
  setRepliesFn,
  attachImgModify,
  setAttachImgModify,
  postId,
  setPostId,
  ratingModify,
  setRatingModify,
}) {
  const { list, rightWr, time, contentWr, buttonWr } = styles;
  const axios = useCustomAxios();
  const { user } = useUserStore();
  const { setModal } = modalStore();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `/posts?type=qna&custom={"product_id": ${id}}&sort={"_id":1}`,
      );
      setRepliesFn(data);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const handleRemove = async (postId) => {
    try {
      const { data } = await axios.delete(`/posts/${postId}`);
      fetchData();
      setModal({ message: "후기가 삭제되었습니다." });
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const handleModify = ({ _id, extra: { rating, image } }) => {
    setPostId(_id);
    setRatingModify(Number(rating));
    setAttachImgModify(image);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const replyList = replies?.item.map((item) => {
    const isMyPost = user && user._id === item.user._id;
    return postId && postId === item._id ? (
      <ReplyRegister
        key={postId}
        isModify={true}
        rcpName={rcpName}
        rcpNum={id}
        replies={replies}
        setRepliesFn={setRepliesFn}
        ratingModify={ratingModify}
        setRating={setRatingModify}
        attachImgModify={attachImgModify}
        setAttachImgModify={setAttachImgModify}
        originalContent={item.content}
        postId={postId}
        setPostId={setPostId}
      />
    ) : (
      <article key={item._id} className={ReplyStyle.replyWr}>
        <img
          className={ReplyStyle.profile}
          src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${
            item.user.profile
          }`}
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
                <Button onClick={() => handleModify(item)}>수정</Button>
                <Button color="primary" onClick={() => handleRemove(item._id)}>
                  삭제
                </Button>
              </div>
            )}
          </div>
        </div>

        {item.extra?.image && (
          <div className={ReplyStyle.attachWr}>
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${
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
      {replies?.item.length ? (
        replyList
      ) : (
        <p>
          여러분의 <strong>해머거 후기</strong>를 기다리고 있어요 :-)
        </p>
      )}
    </div>
  );
}

export default ReplyList;

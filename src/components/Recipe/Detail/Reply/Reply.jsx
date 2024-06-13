import ReplyList from "@components/Recipe/Detail/Reply/List";
import ReplyRegister from "@components/Recipe/Detail/Reply/Register";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Register.module.css";

Reply.propTypes = {
  id: PropTypes.number.isRequired,
  replies: PropTypes.object,
  rcpName: PropTypes.string.isRequired,
  setRepliesFn: PropTypes.func.isRequired,
};

function Reply({ id, replies, rcpName, setRepliesFn }) {
  const [rating, setRating] = useState(0);
  const [ratingModify, setRatingModify] = useState(0);
  const [attachImg, setAttachImg] = useState("");
  const [attachImgModify, setAttachImgModify] = useState("");
  const [postId, setPostId] = useState(0);

  return (
    <div>
      <ReplyList
        id={id}
        rcpName={rcpName}
        replies={replies}
        setRepliesFn={setRepliesFn}
        postId={postId}
        setPostId={setPostId}
        ratingModify={ratingModify}
        setRatingModify={setRatingModify}
        attachImgModify={attachImgModify}
        setAttachImgModify={setAttachImgModify}
      />
      <div className={styles.replyRegisterWr}>
        <ReplyRegister
          key={0}
          isModify={false}
          rcpName={rcpName}
          rcpNum={id}
          replies={replies}
          setRepliesFn={setRepliesFn}
          rating={rating}
          setRating={setRating}
          attachImg={attachImg}
          setAttachImg={setAttachImg}
          setPostId={setPostId}
        />
      </div>
    </div>
  );
}

export default Reply;

import ReplyList from "@components/Recipe/Detail/Reply/List";
import ReplyRegister from "@components/Recipe/Detail/Reply/Register";
import { useState } from "react";

function Reply({ id, replies, rcpName, rcpNum, setRepliesFn }) {
  const [rating, setRating] = useState("");
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
        attachImg={attachImg}
        setAttachImg={setAttachImg}
        postId={postId}
        setPostId={setPostId}
        ratingModify={ratingModify}
        setRatingModify={setRatingModify}
        attachImgModify={attachImgModify}
        setAttachImgModify={setAttachImgModify}
      />
      <ReplyRegister
        rcpName={rcpName}
        rcpNum={rcpNum}
        replies={replies}
        setRepliesFn={setRepliesFn}
        rating={rating}
        setRating={setRating}
        ratingModify={ratingModify}
        attachImg={attachImg}
        setAttachImg={setAttachImg}
        attachImgModify={attachImgModify}
        setPostId={setPostId}
      />
    </div>
  );
}

export default Reply;

import ReplyList from "@components/Recipe/Detail/Reply/List";
import ReplyRegister from "@components/Recipe/Detail/Reply/Register";
import { useEffect } from "react";
import { useState } from "react";

function Reply({ id, replies, rcpName, rcpNum, setRepliesFn }) {
  const [rating, setRating] = useState("");
  const [ratingModify, setRatingModify] = useState(0);
  const [attachImg, setAttachImg] = useState("");
  const [modifyId, setModifyId] = useState(0);

  return (
    <div>
      <ReplyList
        id={id}
        replies={replies}
        setRepliesFn={setRepliesFn}
        attachImg={attachImg}
        setAttachImg={setAttachImg}
        modifyId={modifyId}
        setModifyId={setModifyId}
        ratingModify={ratingModify}
        setRatingModify={setRatingModify}
      />
      <ReplyRegister
        rcpName={rcpName}
        rcpNum={rcpNum}
        setRepliesFn={setRepliesFn}
        rating={rating}
        setRating={setRating}
        ratingModify={ratingModify}
        attachImg={attachImg}
        setAttachImg={setAttachImg}
        setModifyId={setModifyId}
      />
    </div>
  );
}

export default Reply;

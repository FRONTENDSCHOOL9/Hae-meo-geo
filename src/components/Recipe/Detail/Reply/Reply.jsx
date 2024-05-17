import ReplyList from "@components/Recipe/Detail/Reply/List";
import ReplyRegister from "@components/Recipe/Detail/Reply/Register";
import { useEffect } from "react";
import { useState } from "react";

function Reply({ id, replies, rcpName, rcpNum, setRepliesFn }) {
  const [rating, setRating] = useState("");
  const [attachImg, setAttachImg] = useState("");
  const [modifyId, setModifyId] = useState("");

  return (
    <div>
      <ReplyList
        id={id}
        replies={replies}
        setRepliesFn={setRepliesFn}
        rating={rating}
        setRating={setRating}
        attachImg={attachImg}
        setAttachImg={setAttachImg}
        modifyId={modifyId}
        setModifyId={setModifyId}
      />
      <ReplyRegister
        rating={rating}
        setRating={setRating}
        attachImg={attachImg}
        setAttachImg={setAttachImg}
        rcpName={rcpName}
        rcpNum={rcpNum}
        setRepliesFn={setRepliesFn}
        setModifyId={setModifyId}
      />
    </div>
  );
}

export default Reply;

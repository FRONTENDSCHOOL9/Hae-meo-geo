import ReplyList from "@components/Recipe/Detail/Reply/List";
import ReplyRegister from "@components/Recipe/Detail/Reply/Register";

function Reply({ id, replies, rcpName, rcpNum, setRepliesFn }) {
  return (
    <div>
      <ReplyList id={id} replies={replies} setRepliesFn={setRepliesFn} />
      <ReplyRegister
        rcpName={rcpName}
        rcpNum={rcpNum}
        setRepliesFn={setRepliesFn}
      />
    </div>
  );
}

export default Reply;

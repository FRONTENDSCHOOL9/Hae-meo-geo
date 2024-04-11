import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import Banner from "@components/Recipe/Detail/Banner/Banner";
import Content from "@components/Recipe/Detail/Content/Content";
import SubTitle from "@components/Recipe/Detail/SubTitle/SubTitle";
import Ingredient from "@components/Recipe/Detail/Ingredient/Ingredient";
import Step from "@components/Recipe/Detail/Step/Step";
import ReplyList from "@components/Recipe/Detail/Reply/List";
import Sidebar from "@components/Recipe/Detail/Sidebar/Sidebar";

function RecipeDetail() {
  const axios = useCustomAxios("rcp");
  const { name } = useParams();
  const [data, setData] = useState();
  const [replyCount, setReplyCount] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await axios(`/1/1001/RCP_NM=${name}`);
      setData(data.COOKRCP01.row[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const setReplyCountFn = (num) => {
    setReplyCount(num);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchData();
  }, []);

  return (
    <>
      {data && (
        <div>
          <Sidebar id={Number(data["RCP_SEQ"])} />
          <Banner
            name={data["RCP_NM"]}
            pat={data["RCP_PAT2"]}
            way={data["RCP_WAY2"]}
            type="haeRcp"
          />
          <Content>
            <SubTitle>재료</SubTitle>
            <Ingredient data={data} />

            <SubTitle>단계별 레시피</SubTitle>
            <Step data={data} />

            <SubTitle>
              요리 후기 <span>({replyCount})</span>
            </SubTitle>
            <ReplyList
              id={Number(data["RCP_SEQ"])}
              setReplyCountFn={setReplyCountFn}
            />
          </Content>
        </div>
      )}
    </>
  );
}

export default RecipeDetail;

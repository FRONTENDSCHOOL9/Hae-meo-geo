import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import Banner from "@components/Recipe/Detail/Banner/Banner";
import Content from "@components/Recipe/Detail/Content/Content";
import SubTitle from "@components/Recipe/Detail/SubTitle/SubTitle";
import Ingredient from "@components/Recipe/Detail/Ingredient/Ingredient";
import Step from "@components/Recipe/Detail/Step/Step";

function RecipeDetail() {
  const { name } = useParams();
  const axios = useCustomAxios(true);
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axios(`/1/1000/RCP_NM=${name}`);
      setData(data.COOKRCP01.row[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    // window.scrollTo({ top: 0 });
  }, []);

  // console.log(data, data["RCP_NM"]);

  return (
    <>
      {data && (
        <div>
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

            <SubTitle>요리 후기</SubTitle>
          </Content>
        </div>
      )}
    </>
  );
}

export default RecipeDetail;

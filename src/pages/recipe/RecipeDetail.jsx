import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import Loading from "@components/Loading/Loading";
import Banner from "@components/Recipe/Detail/Banner/Banner";
import Content from "@components/Recipe/Detail/Content/Content";
import SubTitle from "@components/Recipe/Detail/SubTitle/SubTitle";
import Ingredient from "@components/Recipe/Detail/Ingredient/Ingredient";
import Step from "@components/Recipe/Detail/Step/Step";
import Sidebar from "@components/Recipe/Detail/Sidebar/Sidebar";
import Reply from "@components/Recipe/Detail/Reply/Reply";
import { Button } from "@components/Button/Button";
import styles from "./RecipeDetail.module.css";
import recentlyViewStore from "@zustand/recentlyViewStore.mjs";
import SEOMetaTag from "@/assets/SEOMetaTag";

function RecipeDetail() {
  const axios = useCustomAxios("rcp");
  const { recipeDetail, buttonWr } = styles;
  const { name } = useParams();
  const [data, setData] = useState();
  const [replies, setReplies] = useState();
  const navigate = useNavigate();
  const { setRecentlyView } = recentlyViewStore();

  const fetchData = async () => {
    try {
      const { data } = await axios(`/1/1001/RCP_NM=${encodeURI(name)}`);
      setData(data.COOKRCP01.row[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const setRepliesFn = (data) => setReplies(data);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchData();
  }, [name]);

  useEffect(() => {
    if (!data) return;
    setRecentlyView({ name: data?.RCP_NM, image: data?.ATT_FILE_NO_MAIN });
  }, [data]);

  return (
    <>
      {data ? (
        <>
          <SEOMetaTag title={data["RCP_NM"]} />
          <div className={recipeDetail}>
            <Sidebar
              id={Number(data["RCP_SEQ"])}
              name={data["RCP_NM"]}
              image={data["ATT_FILE_NO_MAIN"]}
            />
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
                요리 후기 <span>({replies?.item.length})</span>
              </SubTitle>

              <Reply
                id={Number(data["RCP_SEQ"])}
                replies={replies}
                rcpName={name}
                setRepliesFn={setRepliesFn}
              />
              <div className={buttonWr}>
                <Button
                  className={styles.buttond}
                  size="large"
                  onClick={() => navigate(-1)}
                >
                  목록으로
                </Button>
              </div>
            </Content>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default RecipeDetail;

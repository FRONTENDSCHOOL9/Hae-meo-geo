import { useParams } from "react-router-dom";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import RecipeDetailTitle from "@components/RecipeDetailTitle/RecipeDetailTitle";
import styles from "./RecipeDetail.module.css";

function RecipeDetail() {
  const { name } = useParams();
  const axios = useCustomAxios(true);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["detail"],
    queryFn: () => axios.get(`/1/1000/RCP_NM=${name}`),
    select: (response) => response.data.COOKRCP01.row[0],
  });

  console.log(data);

  return (
    <>
      {data && (
        <RecipeDetailTitle
          name={data["RCP_NM"]}
          pat={data["RCP_PAT2"]}
          way={data["RCP_WAY2"]}
          type="haeRcp"
        />
      )}
    </>
  );
}

export default RecipeDetail;

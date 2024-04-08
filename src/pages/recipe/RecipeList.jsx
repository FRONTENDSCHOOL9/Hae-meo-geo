import { Button } from "@components/Button/Button";
import List from "@components/List/List";
import Search from "@components/Search/Search";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function RcpList() {
  // crud 테스트
  const axios = useCustomAxios(true);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list"],
    queryFn: () => axios.get("/1/100", {}),
    select: (response) => response.data.COOKRCP01.row,
  });

  const recipeItem = data?.map((item) => (
    <li key={item["RCP_SEQ"]}>
      <Link to="">
        <img src={item["ATT_FILE_NO_MAIN"]} alt={item["RCP_NM"]} />
        <p>{item["RCP_NM"]}</p>
        <Button>{item["RCP_PAT2"]}</Button>
        <Button>{item["RCP_WAY2"]}</Button>
      </Link>
    </li>
  ));

  return (
    <>
      <Title>해머거 레시피</Title>
      <Search />
      <List recipeItem={recipeItem} />
    </>
  );
}

export default RcpList;

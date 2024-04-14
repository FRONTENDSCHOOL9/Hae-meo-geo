import { Tag } from "@components/Button/Button";
import Pagination from "@components/Pagination/Pagination";
import List from "@components/Recipe/List/List";
import Search from "@components/Search/Search";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function RcpList() {
  const axios = useCustomAxios("rcp");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState("");

  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url);
      setData(data.COOKRCP01.row);
      setCount(Number(data.COOKRCP01["total_count"]));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(`/1/${import.meta.env.VITE_PAGINATION_LIMIT}`);
  }, []);

  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["list"],
  //   queryFn: () => axios.get(`/1/${import.meta.env.VITE_PAGINATION_LIMIT}`),
  //   select: (response) => response.data.COOKRCP01.row,

  //   // 설정 추가
  //   suspense: true,
  // });

  console.log(data);

  const recipeItem = data?.map((item) => (
    <li key={item["RCP_SEQ"]}>
      <Link to={`/recipe/list/${item["RCP_NM"]}`}>
        <img src={item["ATT_FILE_NO_MAIN"]} alt={item["RCP_NM"]} />
        <p>{item["RCP_NM"]}</p>
        <Tag>{item["RCP_PAT2"]}</Tag>
        <Tag>{item["RCP_WAY2"]}</Tag>
      </Link>
    </li>
  ));

  return (
    <>
      <Title>해머거 레시피</Title>
      <Search fetchData={fetchData} setKeyword={setKeyword} />
      {/* <Search setKeyword={setKeyword} refetch={refetch} /> */}
      <List recipeItem={recipeItem} count={count} keyword={keyword} />
      <Pagination totalCount={count} fetchData={fetchData} />
      {/* <Pagination totalCount={count} refetch={refetch} /> */}
    </>
  );
}

export default RcpList;

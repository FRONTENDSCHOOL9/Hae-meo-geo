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
  // const [data, setData] = useState([]);
  const axios = useCustomAxios("rcp");
  const [keyword, setKeyword] = useState("");

  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const ingredient = searchParams.get("ingredient");

  console.log(page, category, ingredient);

  // const fetchData = async (url) => {
  //   try {
  //     const { data } = await axios.get(url);
  //     setData(data.COOKRCP01.row);
  //     setCount(Number(data.COOKRCP01["total_count"]));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(`/1/${import.meta.env.VITE_PAGINATION_LIMIT}`);
  // }, []);

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["list", page, category, ingredient],
  //   queryFn: () =>
  //     axios.get(
  //       `/${page * limit - (limit - 1)}/${
  //         page * limit
  //       }/RCP_PAT2=${category}/RCP_PARTS_DTLS=${ingredient}`,
  //       {
  //         params: {
  //           page,
  //           limit: import.meta.env.VITE_POST_LIMIT,
  //           category: searchParams.get("category"),
  //           ingredient: searchParams.get("ingredient"),
  //         },
  //       }
  //     ),
  //   select: (response) => response.data.COOKRCP01.row,
  //   suspense: false,
  // });

  const { data, isLoading, error } = useQuery({
    queryKey: ["list", page, category, ingredient],
    queryFn: () => fetchData(page, category, ingredient),
    select: (response) => response.data.COOKRCP01,
    suspense: false,
  });

  const fetchData = async (page, category, ingredient) => {
    const url = `/${page * limit - (limit - 1)}/${page * limit}`;
    if (category) return axios.get(`${url}/RCP_PAT2=${category}`);
    if (ingredient) return axios.get(`${url}/RCP_PARTS_DTLS=${ingredient}`);
    return axios.get(url);
  };

  const recipeItem = data?.row?.map((item) => (
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
      <Search setKeyword={setKeyword} />
      <List
        recipeItem={recipeItem}
        totalCount={Number(data?.total_count)}
        keyword={keyword}
        isLoading={isLoading}
      />
      <Pagination totalCount={Number(data?.total_count)} />
    </>
  );
}

export default RcpList;

import { Tag } from "@components/Button/Button";
import Loading from "@components/Loading/Loading";
import NoData from "@components/NoData/NoData";
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
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalCount, setTotalCount] = useState(1124);

  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const RCP_PAT2 = searchParams.get("RCP_PAT2");
  const RCP_PARTS_DTLS = searchParams.get("RCP_PARTS_DTLS");
  const RCP_NM = searchParams.get("RCP_NM");

  const { data, isLoading } = useQuery({
    queryKey: ["list", currentPage, RCP_PAT2, RCP_PARTS_DTLS],
    queryFn: () => fetchData(currentPage, RCP_PAT2, RCP_PARTS_DTLS, RCP_NM),
    select: (response) => response.data.COOKRCP01,
  });

  const fetchData = async (page, RCP_PAT2, RCP_PARTS_DTLS, RCP_NM) => {
    let url = `/${page * limit - (limit - 1)}/${page * limit}`;
    if (RCP_PAT2) url = `${url}/RCP_PAT2=${RCP_PAT2}`;
    if (RCP_PARTS_DTLS) url = `${url}/RCP_PARTS_DTLS=${RCP_PARTS_DTLS}`;
    if (RCP_NM) url = `${url}/RCP_NM=${RCP_NM}`;
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

  useEffect(() => {
    if (keyword && data) setTotalCount(Number(data?.total_count));
  }, [keyword, data]);

  useEffect(() => {
    if (RCP_PAT2) setKeyword(RCP_PAT2);
    if (RCP_PARTS_DTLS) setKeyword(RCP_PARTS_DTLS);
    if (RCP_NM) setKeyword(RCP_NM);
    window.scrollTo({ top: 0 });
  }, [searchParams.toString()]);

  return (
    <>
      <Title>해머거 레시피</Title>
      <Search
        keyword={keyword}
        setKeyword={setKeyword}
        setCurrentPage={setCurrentPage}
      />
      {isLoading ? (
        <Loading />
      ) : totalCount ? (
        <>
          <List
            recipeItem={recipeItem}
            totalCount={totalCount}
            keyword={keyword}
          />
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            link="/recipe/list"
          />
        </>
      ) : (
        <NoData keyword={keyword} />
      )}
    </>
  );
}

export default RcpList;

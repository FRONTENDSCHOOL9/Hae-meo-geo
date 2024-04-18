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
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page"));
  const [totalCount, setTotalCount] = useState(1124);

  const limit = import.meta.env.VITE_PAGINATION_LIMIT;
  const RCP_PAT2 = searchParams.get("RCP_PAT2");
  const RCP_PARTS_DTLS = searchParams.get("RCP_PARTS_DTLS");
  const RCP_NM = searchParams.get("RCP_NM");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list", currentPage, RCP_PAT2, RCP_PARTS_DTLS],
    queryFn: () => fetchData(currentPage, RCP_PAT2, RCP_PARTS_DTLS, RCP_NM),
    select: (response) => response.data.COOKRCP01,
    suspense: false,
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

  // useEffect(() => {
  //   refetch();
  // }, [searchParams.toString()]);

  return (
    <>
      <Title>해머거 레시피</Title>
      <Search setKeyword={setKeyword} setCurrentPage={setCurrentPage} />
      <List
        recipeItem={recipeItem}
        totalCount={totalCount}
        keyword={keyword}
        isLoading={isLoading}
      />
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default RcpList;

// 총 카운트 변경 : 카테고리 클릭, 검색 -> 구분하는 변수 만들기
// 페이지네이션 클릭시 총카운트를 저장된 숫자 사용하기
// 상태를 나타내는 불린에 따라 총카운트 변수에 할당하기
// 상태를 나타내는 불린 = useState

// 버튼, 클릭 시 페이지네이션이 리렌더링 되도록 작업하기 (위의껄 해보면 될듯?)

/*

- 처음 통신이 됐을 때 data?.total_count 값 전달
- isTotalCountUpdate가 false면 data?.total_count가 저장된 totalCountStorage 값 
- isTotalCountUpdate가 true면 data?.total_count, totalCountStorage에 data?.total_count값 저장

* 마지막 페이지에서 무조건 1/12 단위로 불러오면 다 불러와짐 ;; 아놔
* 4페이지에서 무조건 다 불러와짐 

*/

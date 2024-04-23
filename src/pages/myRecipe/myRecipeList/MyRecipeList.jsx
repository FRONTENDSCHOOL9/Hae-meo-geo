import { Tag } from "@components/Button/Button";
import Pagination from "@components/Pagination/Pagination";
import List from "@components/Recipe/List/List";
import Search from "@components/Search/Search";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {LinkButton} from "@components/Button/Button";
import styles from "./MyRecipeList.module.css"
import Loading from "@components/Loading/Loading";

function MyRecipeList() {
  const axios = useCustomAxios();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalCount, setTotalCount] = useState(1125);
  const {write} = styles;
  const limit = import.meta.env.VITE_PAGINATION_LIMIT;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list", currentPage],
    queryFn: () => axios.get("/posts", {params: {type:"recipe", keyword}}),
    select: (response) => response.data,
    suspense: false,
  });

  useEffect(() =>{
    console.log("keyword:",keyword);
    refetch();
  }, [keyword]);
  console.log(data);

  const recipeItem = data && data?.item.map((item, index) => (
    <li key={index}>
      <Link to={`/myrecipe/${item._id}`}>
        <img src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${item.image}`} alt={item["title"]} />
        <p>{item["title"]}</p>
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
      <Title>나만의 레시피</Title>
      <Search type="myRcpList" keyword={keyword} setKeyword={setKeyword} setCurrentPage={setCurrentPage} />
      <div className={write}>
        <LinkButton to="/myRecipe/register" type="submit" size="large" color="primary" filled="filled">글쓰기</LinkButton>
      </div>
      {isLoading ? 
        <Loading/>
      : 
        data &&
        <>
          <List
          recipeItem={recipeItem}
          totalCount={data?.item.length}
          keyword={keyword}
          isLoading={isLoading}
          />
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      }
    </>
  );
}

export default MyRecipeList;

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

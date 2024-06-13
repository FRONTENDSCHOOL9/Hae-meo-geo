import List from "@components/Recipe/List/List";
import Search from "@components/Search/Search";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LinkButton } from "@components/Button/Button";
import styles from "./MyRecipeList.module.css";
import Loading from "@components/Loading/Loading";

function MyRecipeList() {
  const axios = useCustomAxios();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalCount, setTotalCount] = useState("");
  const { write } = styles;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list", currentPage],
    queryFn: () => axios.get("/posts", { params: { type: "recipe", keyword } }),
    select: (response) => response.data,
    suspense: false,
  });

  useEffect(() => {
    refetch();
  }, [keyword]);

  const recipeItem =
    data &&
    data?.item.map((item, index) => (
      <li key={index}>
        <Link to={`/myrecipe/list/${item._id}`}>
          <img
            src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${item.image}`}
            alt={item["title"]}
          />
          <p>{item["title"]}</p>
        </Link>
      </li>
    ));

  useEffect(() => {
    if (keyword && data) setTotalCount(Number(data?.total_count));
  }, [keyword, data]);

  return (
    <>
      <Title>나만의 레시피</Title>
      <Search
        type="myRcpList"
        keyword={keyword}
        setKeyword={setKeyword}
        setCurrentPage={setCurrentPage}
      />
      <div className={write}>
        <LinkButton
          to="/myRecipe/register"
          size="large"
          color="primary"
          filled="filled"
        >
          글쓰기
        </LinkButton>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <>
            <List
              recipeItem={recipeItem}
              totalCount={data?.item.length}
              keyword={keyword}
              isLoading={isLoading}
            />
          </>
        )
      )}
    </>
  );
}

export default MyRecipeList;

import List from "@components/Recipe/List/List";
import Search from "@components/Search/Search";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@components/Button/Button";
import styles from "./MyRecipeList.module.css";
import Loading from "@components/Loading/Loading";
import NoData from "@components/NoData/NoData";
import Pagination from "@components/Pagination/Pagination";
import modalStore from "@zustand/modalStore.mjs";
import userStore from "@zustand/userStore.mjs";

function MyRecipeList() {
  const axios = useCustomAxios();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalCount, setTotalCount] = useState(8);
  const { write } = styles;
  const navigate = useNavigate();
  const { setModal } = modalStore();
  const { user } = userStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["list", currentPage],
    queryFn: () =>
      axios.get("/posts", {
        params: {
          page: currentPage,
          limit: import.meta.env.VITE_PAGINATION_LIMIT,
          type: "recipe",
          keyword,
        },
      }),
    select: (response) => response.data,
    suspense: false,
  });

  const handleClick = () => {
    if (user) {
      navigate("/myRecipe/register");
    } else {
      setModal({
        message: `잠깐! 로그인 후 이용할 수 있어요. \n로그인 하러갈까요?`,
        event: () => {
          navigate("/user/login");
        },
        isTwoButtons: true,
      });
    }
  };

  useEffect(() => {
    refetch();
    if (data) setTotalCount(data?.pagination.total);
  }, [keyword, data]);

  const recipeItem =
    data &&
    data.item.map((item, index) => (
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
        <Button
          onClick={handleClick}
          size="large"
          color="primary"
          filled="filled"
        >
          글쓰기
        </Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : totalCount ? (
        data && (
          <>
            <List
              recipeItem={recipeItem}
              totalCount={totalCount}
              keyword={keyword}
              isLoading={isLoading}
            />
            <Pagination
              totalCount={totalCount}
              currentPage={Number(currentPage)}
              setCurrentPage={setCurrentPage}
              link="/myrecipe/list"
            />
          </>
        )
      ) : (
        <NoData keyword={keyword} />
      )}
    </>
  );
}

export default MyRecipeList;

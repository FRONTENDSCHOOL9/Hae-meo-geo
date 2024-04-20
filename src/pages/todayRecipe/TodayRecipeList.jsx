import Pagination from "@components/Pagination/Pagination";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./TodayRecipeList.module.css";

function TodayRecipeList() {
  const { recipeList, textWr } = styles;
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page"));
  const axios = useCustomAxios();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todayRcpList"],
    queryFn: () => axios.get("/posts?type=todayRcp"),
    select: (response) => response.data.item,
    suspense: false,
  });

  const menus = data?.map((item) => (
    <li key={item.sort}>
      <Link to={`/recipe/list?page=1&${item.extra.url}`}>
        <img src={`/img/todayRecipe/${item.extra.image}`} alt="" />
        <div className={textWr}>
          <h3>
            #{item?.content} #{item?.title}
          </h3>
          <span>{item?.title} 보러가기</span>
        </div>
      </Link>
    </li>
  ));

  return (
    <>
      <Title>
        오늘 뭐먹지?
        <p>'오늘 뭐먹지?' 고민되는 당신을 위한 추천 레시피!</p>
      </Title>
      <ul className={recipeList}>{menus}</ul>
    </>
  );
}

export default TodayRecipeList;

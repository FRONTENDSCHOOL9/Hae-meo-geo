import Pagination from "@components/Pagination/Pagination";
import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";
import { Link } from "react-router-dom";
import styles from "./TodayRecipeList.module.css";

function TodayRecipeList() {
  const { recipeList, textWr } = styles;
  const axios = useCustomAxios();

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["todayList"],
    queryFn: ({ pageParam = 1 }) =>
      axios.get(`/posts?type=todayRcp`, {
        params: {
          page: pageParam,
          limit: import.meta.env.VITE_PAGINATION_LIMIT,
          sort: JSON.stringify({ _id: -1 }),
        },
      }),
    select: (response) => {
      response.items = response.pages.map((page) => page.data.item);
      response.totalPages = response.pages.at(-1).data.pagination.totalPages;
      response.page = response.pages.at(-1).data.pagination.page;
      return response;
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;
      let nextPage =
        pagination.page < pagination.totalPages ? pagination.page + 1 : false;
      return nextPage;
    },
  });

  let list = [];
  let hasNext = false;
  if (data) {
    list = _.flatten(data.items).map((item) => {
      return (
        <li key={item._id}>
          <Link to={`/recipe/list?page=1&RCP_NM=${item.title}`}>
            <img src={`/img/todayRecipe/${item.extra?.image}`} alt="" />
            <div className={textWr}>
              <h3>
                #{item.content} #{item.title}
              </h3>
              <span>{item.title} 보러가기</span>
            </div>
          </Link>
        </li>
      );
    });
    hasNext = data.page < data.totalPages;
    console.log(list);
  }

  return (
    <>
      <Title>
        오늘 뭐먹지?
        <p>뭐 먹을지는 해머거가 알려드릴게요 :-)</p>
      </Title>
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchNextPage}
        hasMore={!isFetching && hasNext}
        loader={<p>로딩중</p>}
      >
        <ul className={recipeList}>{list}</ul>
      </InfiniteScroll>
    </>
  );
}

export default TodayRecipeList;

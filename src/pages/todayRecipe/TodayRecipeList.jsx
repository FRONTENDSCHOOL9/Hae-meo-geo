import Title from "@components/Title/Title";
import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";
import { Link } from "react-router-dom";
import styles from "./TodayRecipeList.module.css";
import Loading from "@components/Loading/Loading";

function TodayRecipeList() {
  const { recipeList, textWr } = styles;
  const axios = useCustomAxios();

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
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
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${item.extra?.image}`}
              alt={item.title}
              width={356}
              height={463}
            />
            <div className={textWr}>
              <h3>{item.content}</h3>
              <span>{item.title} 요리 보러가기</span>
            </div>
          </Link>
        </li>
      );
    });
    hasNext = data.page < data.totalPages;
  }

  return (
    <>
      <Title>
        오늘 뭐먹지?
        <p>뭐 먹을지는 해머거가 알려드릴게요 :-)</p>
      </Title>
      {isLoading ? (
        <Loading />
      ) : (
        <InfiniteScroll
          pageStart={1}
          loadMore={fetchNextPage}
          hasMore={!isFetching && hasNext}
          loader={<Loading key={0} />}
        >
          <ul className={recipeList}>{list}</ul>
        </InfiniteScroll>
      )}
    </>
  );
}

export default TodayRecipeList;

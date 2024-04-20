import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Search from "@components/Search/Search";
import styles from "./Home.module.css";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

function Home() {
  const axios = useCustomAxios();
  const axiosRcp = useCustomAxios("rcp");
  const { section, todayMenuSec, bookmarkSec, searchSec } = styles;

  const today = `day${new Date().getDay()}`;
  // const weather = "weather01";
  const [weather, setWeather] = useState();
  const [dataTodayRcp, setDataTodayRcp] = useState();
  const [dataBookmark, setDataBookmark] = useState();
  const [todayMenu, setTodayMenu] = useState();

  const fetchWeather = async () => {
    try {
      const { data } = await axiosRcp.get("/", {
        baseURL:
          "https://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=8986672dd174c444e5cf84cfed53652f&units=metric",
      });
      setWeather(data?.weather[0].main);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const fetchTodayRcp = async () => {
    try {
      const { data } = await axios("/posts?type=todayRcp");
      setDataTodayRcp(data?.item);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const filteredTodayRcp = (TodayRcp) => {
    return TodayRcp?.filter((item) => {
      const condition = item.extra.condition;
      if (condition === today || condition === weather) return item;
    });
  };

  const randomFn = (filteredData) =>
    Math.floor(Math.random() * filteredData?.length);

  const fetchRandomMenu = async () => {
    try {
      if (dataTodayRcp) {
        const filteredData = filteredTodayRcp(dataTodayRcp);
        const todayData = filteredData[randomFn(filteredData)];
        const { data } = await axios(
          `products?keyword=${todayData.title}&page=1&limit=8`,
        );
        setTodayMenu({ info: todayData, data: data.item });
      }
    } catch (err) {
      console.error(err, err.response?.data.message);
    }
  };

  const fetchBookmarkRcp = async () => {
    try {
      const { data } = await axios(
        `/products?page=1&limit=8&sort={"bookmarks": -1}`,
      );
      setDataBookmark(data?.item);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchTodayRcp();
    fetchBookmarkRcp();
    fetchWeather();
  }, []);

  useEffect(() => {
    fetchRandomMenu();
  }, [dataTodayRcp]);

  // 오늘의 추천 메뉴
  const todayMenus = todayMenu?.data.map((item, idx) => (
    <SwiperSlide key={`${idx}${item.name}`}>
      <Link to={`/recipe/list/${item.name}`}>
        <img src={item.image} alt="" />
        <p>{item.name}</p>
      </Link>
    </SwiperSlide>
  ));

  // 인기순(북마크 기준) 메뉴
  const bookmarkMenus = dataBookmark?.map((item, idx) => (
    <SwiperSlide key={idx}>
      <Link to={`/recipe/list/${item.name}`}>
        <img src={item.image} alt="" />
        <p>{item.name}</p>
      </Link>
    </SwiperSlide>
  ));

  return (
    <>
      <section className={`${section} ${todayMenuSec}`}>
        <h2>
          {todayMenu?.info.title} 오늘은 {todayMenu?.info.content} 어때요?
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={4}
            navigation={{ clickable: true }}
          >
            {todayMenus}
          </Swiper>
        </h2>
      </section>

      <section className={`${section} ${bookmarkSec}`}>
        <h2>
          인기 많은 레시피
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={4}
            navigation={{ clickable: true }}
          >
            {bookmarkMenus}
          </Swiper>
        </h2>
      </section>

      <section className={`${section} ${searchSec}`}>
        <h2>찾는 레시피가 없다면 직접 검색해보세요!</h2>
        <Search keyword={"home"} />
      </section>
    </>
  );
}

export default Home;

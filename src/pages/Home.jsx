import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Search from "@components/Search/Search";
import styles from "./Home.module.css";
import "swiper/css";
import "swiper/css/navigation";

function Home() {
  const axios = useCustomAxios();
  const axiosRcp = useCustomAxios("rcp");
  const { section, swiperWr, todayMenuSec, bookmarkSec, searchSec, myRcpSec } =
    styles;

  const today = `day${new Date().getDay()}`;
  const [weather, setWeather] = useState();
  const [dataTodayRcp, setDataTodayRcp] = useState();
  const [dataBookmark, setDataBookmark] = useState();
  const [dataMyRcp, setDataMyRcp] = useState();
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

  const fetchMyRcp = async () => {
    try {
      const { data } = await axios(
        `/posts?type=recipe&limit=6&page=1&sort={"_id": -1}`,
      );
      setDataMyRcp(data?.item);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchTodayRcp();
    fetchBookmarkRcp();
    fetchWeather();
    fetchMyRcp();
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

  // 나만의 레시피 메뉴
  const myRcpMenus = dataMyRcp?.map((item, idx) => (
    <SwiperSlide key={idx}>
      <Link to={`/recipe/list/${item.name}`}>
        <img
          src={`${import.meta.env.VITE_API_SERVER}/files/${import.meta.env.VITE_CLIENT_ID}/${item.image}`}
          alt=""
        />
        <p>{item.title}</p>
      </Link>
    </SwiperSlide>
  ));

  return (
    <>
      <section className={`${section} ${todayMenuSec}`}>
        <h2>
          {todayMenu?.info.content} <br className="mo" />
          오늘은 <span>{todayMenu?.info.title}</span> 어때요?
        </h2>
        <Swiper
          className={swiperWr}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1.4}
          navigation={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {todayMenus}
        </Swiper>
      </section>

      <section className={`${section} ${bookmarkSec}`}>
        <h2>인기 많은 해머거 레시피</h2>
        <Swiper
          className={swiperWr}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1.4}
          navigation={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {bookmarkMenus}
        </Swiper>
      </section>

      <section className={`${section} ${myRcpSec}`}>
        <h2>최근 등록된 나만의 레시피</h2>
        <Swiper
          className={swiperWr}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1.4}
          navigation={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {myRcpMenus}
        </Swiper>
      </section>

      <section className={`${section} ${searchSec}`}>
        <h2>
          찾는 레시피가 없다면 <br className="mo" />
          직접 검색해보세요!
        </h2>
        <Search keyword={"home"} />
      </section>
    </>
  );
}

export default Home;

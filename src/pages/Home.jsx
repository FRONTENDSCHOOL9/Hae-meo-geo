import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Search from "@components/Search/Search";
import styles from "./Home.module.css";
import "swiper/css";
import "swiper/css/navigation";

function Home() {
  const axios = useCustomAxios();
  const axiosRcp = useCustomAxios("rcp");
  const { section, todayMenuSec, bookmarkSec, searchSec } = styles;

  const today = `day${new Date().getDay()}`;
  const weather = "weather01";
  const [dataTodayRcp, setDataTodayRcp] = useState();
  const [dataBookmark, setDataBookmark] = useState();
  const [todayMenu, setTodayMenu] = useState();

  const fetchTodayRcp = async () => {
    try {
      const { data } = await axios("/posts?type=todayRcp");
      setDataTodayRcp(data?.item);
      fetchRandomMenu();
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
      const filteredData = filteredTodayRcp(dataTodayRcp);
      const todayData = filteredData[randomFn(filteredData)];
      const { data } = await axiosRcp(`/1/1001/${todayData?.extra.url}`);
      let randomRcp = data?.COOKRCP01.row;
      if (randomRcp.length > 8) {
        randomRcp.sort(() => Math.random() - 0.5);
        randomRcp = randomRcp.slice(0, 8);
      }
      setTodayMenu({ info: todayData, data: randomRcp });
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
  }, []);

  // 오늘의 추천 메뉴
  const todayMenus = todayMenu?.data.map((item, idx) => (
    <SwiperSlide key={`${idx}${item.RCP_NM}`}>
      <img src={item.ATT_FILE_NO_MAIN} alt="" />
      <p>{item.RCP_NM}</p>
    </SwiperSlide>
  ));

  // 인기순(북마크 기준) 메뉴
  const bookmarkMenus = dataBookmark?.map((item, idx) => (
    <SwiperSlide key={idx}>
      <img src={item.image} alt="" />
      <p>{item.name}</p>
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
          <Swiper spaceBetween={0} slidesPerView={4} pagination={true}>
            {bookmarkMenus}
          </Swiper>
        </h2>
      </section>

      <section className={`${section} ${searchSec}`}>
        <Search keyword={"home"} />
      </section>
    </>
  );
}

export default Home;

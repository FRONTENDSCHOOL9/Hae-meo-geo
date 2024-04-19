import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Search from "@components/Search/Search";

function Home() {
  const axios = useCustomAxios();
  const axiosRcp = useCustomAxios("rcp");

  const today = `day${new Date().getDay()}`;
  const weather = "weather01";
  const [dataTodayRcp, setDataTodayRcp] = useState();
  const [dataBookmark, setDataBookmark] = useState();
  const [todayMenu, setTodayMenu] = useState();

  const fetchTodayRcp = async () => {
    try {
      const { data } = await axios("/posts?type=todayRcp");
      setDataTodayRcp(data?.item);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const filteredTodayRcp = (TodayRcp) => {
    return TodayRcp.filter((item) => {
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
        randomRcp = Array(8)
          .fill("")
          .map((item) => (item = randomRcp[randomFn(randomRcp)]));
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

  useEffect(() => {
    if (!dataTodayRcp) return;
    fetchRandomMenu();
  }, [dataTodayRcp]);

  const todayMenus = todayMenu?.data.map((item, idx) => (
    <SwiperSlide key={`${idx}${item.RCP_NM}`}>
      <img src={item.ATT_FILE_NO_MAIN} alt="" />
      <p>{item.RCP_NM}</p>
    </SwiperSlide>
  ));
  const bookmarkMenus = dataBookmark?.map((item, idx) => (
    <SwiperSlide key={idx}>
      <img src={item.image} alt="" />
      <p>{item.name}</p>
    </SwiperSlide>
  ));

  return (
    <>
      <section>
        <h2>
          {todayMenu?.info.title} 오늘은 {todayMenu?.info.content} 어때요?
          <Swiper spaceBetween={0} slidesPerView={4} pagination={true}>
            {todayMenus}
          </Swiper>
        </h2>
      </section>

      <section>
        <h2>
          인기 많은 레시피
          <Swiper spaceBetween={0} slidesPerView={4} pagination={true}>
            {bookmarkMenus}
          </Swiper>
        </h2>
      </section>

      <section>
        <Search keyword={"home"} />
      </section>
    </>
  );
}

export default Home;

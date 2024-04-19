import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Home() {
  const axios = useCustomAxios();
  const axiosRcp = useCustomAxios("rcp");

  const today = `day${new Date().getDay()}`;
  const weather = "weather01";
  const [dataTodayRcp, setDataTodayRcp] = useState(); // 잘 뜸
  const [todayMenu, setTodayMenu] = useState();

  const fetchTodayRcp = async () => {
    try {
      const { data } = await axios("/posts?type=todayRcp");
      setDataTodayRcp(data?.item);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  const filteredDataFn = (TodayRcp) => {
    return TodayRcp.filter((item) => {
      const condition = item.extra.condition;
      if (condition === today || condition === weather) return item;
    });
  };

  const randomFn = (filteredData) =>
    Math.floor(Math.random() * filteredData?.length);

  const fetchRandomMenu = async () => {
    try {
      const filteredData = filteredDataFn(dataTodayRcp);
      const todayData = filteredData[randomFn(filteredData)];
      console.log(filteredData[randomFn(filteredData)]);
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

  useEffect(() => {
    fetchTodayRcp();
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

  return (
    <>
      <section>
        <h2>
          {todayMenu?.info.value} 오늘은 {todayMenu?.info.menu} 어때요?
          <Swiper spaceBetween={0} slidesPerView={4} pagination={true}>
            {todayMenus}
          </Swiper>
        </h2>
      </section>
    </>
  );
}

export default Home;

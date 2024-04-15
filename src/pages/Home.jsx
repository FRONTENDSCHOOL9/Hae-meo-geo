import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Home() {
  const axios = useCustomAxios();
  const axiosRcp = useCustomAxios("rcp");
  const today = `day${new Date().getDay()}`;
  const weather = "weather01";
  const [data, setData] = useState();
  const [todayMenu, setTodayMenu] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axios("/codes/todayRcp");
      setData(data?.item.todayRcp.codes);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDataFn = (data) =>
    data.filter((item) => {
      if (item.condition === today || item.condition === weather) return item;
    });
  const randomFn = (filteredData) => [
    Math.floor(Math.random() * filteredData?.length),
  ];

  const fetchRandomMenu = async () => {
    try {
      const filteredData = filteredDataFn(data);
      const todayData = filteredData[randomFn(filteredData)];
      const res = await axiosRcp(`/1/1001/${todayData?.url}`);
      let randomRcp = res.data?.COOKRCP01.row;
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
    if (!data) return;
    fetchRandomMenu();
  }, [data]);

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

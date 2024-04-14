import useCustomAxios from "@hooks/useCustomAxios.mjs";
import { useQuery } from "@tanstack/react-query";
import styles from "./TodayRecipeList.module.css";

function TodayRecipeList() {
  const weather = {
    "01": "해가 쨍쨍한",
    "02": "구름이 낀",
    "03": "흐린",
    "04": "비가 오는",
    "05": "눈이 오는",
  };
  const season = {};
  const todayMenu = [
    {
      condition: "비가 오는",
      menu: "부침 가루를 활용한 요리",
      code: `RCP_PARTS_DTLS=부침가루`,
    },
    { condition: "산뜻한 봄,", menu: "봄나물", code: `RCP_NM=나물` },
    { condition: ",", menu: "연어요리", code: `RCP_NM=나물` },
    { condition: "땀이 뻘뻘", menu: "초계요리", code: `RCP_NM=초계` },
    { condition: "땀이 뻘뻘", menu: "시원한 요리", code: `RCP_NM=냉` },
    { condition: "", menu: "", code: `HASH_TAG=삼겹살` },
    {
      condition: "주말 아침에는 가볍게",
      menu: "샐러드",
      code: `RCP_NM=샐러드`,
    },
    {
      condition: "불금 달리셨나요?",
      menu: "해장국",
      code: `RCP_NM=해장국`,
    },
    {
      condition: "목요일은 분위기 있는",
      menu: "파스타",
      code: `RCP_NM=파스타`,
    },
  ];

  // 재료: 스테이크, 삼겹살, 라면
  // 이름: 샌드위치, 계란, 바지락(3월), 주꾸미(3,4월), 전복(여름), 연어(9월), 고등어(12월), 만두, 쌈밥(한입에 털어넣어? 월?)
  //      칼국수(흐린날?), 떡볶이(/)
  // 괜시리 바쁜 월요일, 정신없는 화요일, 아직도 수요일?, 지친 목요일 활력이 필요해, 기분 좋은 금요일, 늘어지는 토요일,
  // 월요일 : 한주의 시작 단백질이 풍부한
  // 화요일 : 매운 요리?
  // 수요일 :

  // 날씨별 https://blog.naver.com/kma_131/222458064479
  // 랜덤 메뉴 추천 사이트 : https://ai-creator.tistory.com/31

  const randomNum = Math.floor(Math.random() * todayMenu.length);

  const axios = useCustomAxios();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["today"],
    queryFn: () => axios.get("/codes"),
    select: (response) => response.data,
  });
  console.log(data);

  // 1. 데이터 호출
  // 2. 데이터 중에 value condition이 맞는 애들만 전역 상태관리 변수에 담기
  // 3. 로컬 스토리지에도 반영하기
  // 4. 업데이트 주기
  // 1) 로컬스토리지에 담긴 날짜와 다른 경우
  // 2) 로컬스토리지에 담긴 시간과 1/2시간 이상 차이나는 경우

  // $(function () {
  //   const weather_1 = `강한 자외선을 차단하기 위해 선글라스, 모자 착용으로 눈을 보호해주세요. <br>높은 기온과 강한 햇빛으로 지친 눈을 위해 충분한 휴식을 취하세요!`;
  //   const weather_2 = `흐린 날이 맑은 날보다 자외선 지수가 더 높다는 사실 알고 계세요? <br>자외선 차단제와 선글라스로 소중한 피부와 눈을 보호해주세요.`;
  //   const weather_3 = `비가 오는 날에는 고온다습한 환경으로 눈 건강 관리에 더 유의하셔야 합니다. <br>렌즈 착용을 삼가하거나, 착용 시 오염에 주의하세요!`;
  //   const weather_4 = `쌓인 눈에서 햇빛이 반사되어 자외선이 유입되지 않도록 눈을 보호해주세요! <br>쌀쌀한 기온과 바람, 건조한 실내 환경으로 안구건조증이 발생할 수 있으니 눈 건강에 유의하세요.`;

  //   $.ajax({
  //     url: "https://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=8986672dd174c444e5cf84cfed53652f&units=metric",

  //     dataType: "json",
  //     type: "GET",
  //     success: function (data) {
  //       const $Icon = data.weather[0].icon.substr(0, 2);
  //       const $Temp = Math.floor(data.main.temp);

  //       $(".weather_ico").append(
  //         `<img src="/img/front/common/weather/${$Icon}.png" width="120" height="78" alt="${data.weather[0].description}" />`
  //       );
  //       $(".temp_num").text($Temp);

  //       switch ($Icon) {
  //         case "01":
  //         case "02":
  //           $(".weather_info").html(weather_1);
  //           break;
  //         case "03":
  //         case "04":
  //         case "50":
  //           $(".weather_info").html(weather_2);
  //           break;
  //         case "09":
  //         case "10":
  //         case "11":
  //           $(".weather_info").html(weather_3);
  //           break;
  //         case "13":
  //           $(".weather_info").html(weather_4);
  //           break;
  //       }
  //     },
  //   });
  // });

  return (
    <div>
      <ul>sdf</ul>
    </div>
  );
}

export default TodayRecipeList;

import moment from "moment";
import axios from "axios";

function getDay(day = 0) {
  return moment().add(day, "days").format("YYYY.MM.DD");
}
function getTime(day = 0, second = 0) {
  return moment()
    .add(day, "days")
    .add(second, "seconds")
    .format("YYYY.MM.DD HH:mm:ss");
}

export const initData = async (nextSeq) => {
  const { data } = await axios.get(
    "https://openapi.foodsafetykorea.go.kr/api/f6e0fedf1c324ab98243/COOKRCP01/json/1/1001",
  );
  const result = await Promise.all(
    data["COOKRCP01"].row.map(async (item) => {
      return {
        _id: Number(item["RCP_SEQ"]),
        name: item["RCP_NM"],
        price: 0,
        quantity: 10,
        buyQuantity: 1,
        content: "",
        image: item["ATT_FILE_NO_MAIN"],
        show: true,
        active: true,
      };
    }),
  );

  return {
    // 회원
    user: [
      {
        _id: await nextSeq("user"),
        email: "test@haemeogeo.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "해머거",
        phone: "01011112222",
        address: "서울시 강남구 역삼동 123",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: "01-01",
        },
      },
      {
        _id: await nextSeq("user"),
        email: "test1@haemeogeo.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "user1",
        phone: "01011112222",
        address: "서울시",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "test2@haemeogeo.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "user2",
        phone: "01011112222",
        address: "서울시",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "test3@haemeogeo.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "user3",
        phone: "01011112222",
        address: "서울시",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "test4@haemeogeo.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "user4",
        phone: "01011112222",
        address: "서울시",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "test5@haemeogeo.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "user5",
        phone: "01011112222",
        address: "서울시",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "test6@haemeogeo.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "user6",
        phone: "01011112222",
        address: "서울시",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "test7@haemeogeo.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "user7",
        phone: "01011112222",
        address: "서울시",
        type: "user",
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
    ],
    // 상품
    product: result,
    // 주문
    order: [],
    // 후기
    reply: [],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 228,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 228,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 3,
        target_id: 228,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 4,
        target_id: 228,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 5,
        target_id: 228,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 6,
        target_id: 228,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 7,
        target_id: 228,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 8,
        target_id: 228,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 3,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 4,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 5,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 6,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 7,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 3,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 4,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 5,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 6,
        target_id: 296,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 3466,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 3466,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 3,
        target_id: 3466,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 4,
        target_id: 3466,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 5,
        target_id: 3466,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 3260,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 3260,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 3,
        target_id: 3260,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 4,
        target_id: 3260,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 305,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 305,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 3,
        target_id: 305,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 226,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 226,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 337,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 3462,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 3462,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 3,
        target_id: 3462,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
    ],
    // QnA, 공지사항, 게시판
    post: [
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "모든게 귀찮은 월요일에는 가볍게,",
        title: "샐러드",
        extra: {
          condition: "day1",
          image: "TR101.webp",
          tag: ["월요일", "간단"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "월요일 스트레스를 다 날려버리는,",
        title: "김치찌개",
        extra: {
          condition: "day1",
          image: "TR102.webp",
          tag: ["월요일", "찌개"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "화요일은 불고기?!",
        title: "불고기",
        extra: {
          condition: "day2",
          image: "TR103.webp",
          tag: ["화요일", "고기"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "화요일엔 간단하게,",
        title: "비빔밥",
        extra: {
          condition: "day2",
          image: "TR104.webp",
          tag: ["화요일", "식사", "밥"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "수요일일은 국수 다먹는 날!",
        title: "국수",
        extra: {
          condition: "day3",
          image: "TR105.webp",
          tag: ["수요일", "식사", "면"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "뽀얀 순두부가 생각나는 날,",
        title: "순두부",
        extra: {
          condition: "day3",
          image: "TR106.webp",
          tag: ["수요일", "식사", "찌개"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "조금만 버티면 목요일!",
        title: "덮밥",
        extra: {
          condition: "day4",
          image: "TR107.webp",
          tag: ["목요일", "식사", "밥", "고기"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "목요일은 내가 카레 요리사 ~!",
        title: "카레",
        extra: {
          condition: "day4",
          image: "TR108.webp",
          tag: ["목요일", "식사", "밥"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "어제 먹은 술이 들깨 ..",
        title: "들깨",
        extra: {
          condition: "day5",
          image: "TR109.webp",
          tag: ["금요일", "해장", "식사"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "벌써 금요일에요!",
        title: "떡볶이",
        extra: {
          condition: "day5",
          image: "TR110.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "불금 달리셨나요? 해장하셔야죠!",
        title: "황태",
        extra: {
          condition: "day6",
          image: "TR111.webp",
          tag: ["토요일", "해장", "식사"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "여유로운 주말,",
        title: "파스타",
        extra: {
          condition: "day6",
          image: "TR112.webp",
          tag: ["토요일", "식사", "면"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "느긋한 일요일 아침,",
        title: "샌드위치",
        extra: {
          condition: "day7",
          image: "TR113.webp",
          tag: ["일요일", "식사", "빵"],
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "한 주를 마무리하며,",
        title: "닭조림",
        extra: {
          condition: "day7",
          image: "TR114.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "비오는 날엔 지글지글,",
        title: "삼겹살",
        extra: {
          condition: "Rain",
          image: "TR201.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "비오는 날엔 기름에 튀긴,",
        title: "탕수",
        extra: {
          condition: "Rain",
          image: "TR202.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "비오는 날엔 바사삭!",
        title: "튀김",
        extra: {
          condition: "Rain",
          image: "TR203.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "비오는 날엔 푹~ 익은,",
        title: "묵은지",
        extra: {
          condition: "Rain",
          image: "TR204.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "비오는 날엔 시원하고 맑은,",
        title: "바지락",
        extra: {
          condition: "Rain",
          image: "TR205.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "흐린 날엔 뜨끈한,",
        title: "라면",
        extra: {
          condition: "Clouds",
          image: "TR301.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "흐린 날에 생각나는,",
        title: "수제비",
        extra: {
          condition: "Clouds",
          image: "TR302.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "흐린 날에 뜨끈한 한그릇,",
        title: "해장국",
        extra: {
          condition: "Clouds",
          image: "TR303.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "흐린 날에 햄가득,",
        title: "부대찌개",
        extra: {
          condition: "Clouds",
          image: "TR304.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "뜨거운 햇빛을 날릴,",
        title: "콩국수",
        extra: {
          condition: "Clear",
          image: "TR401.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "앗 차가! 시원하게,",
        title: "초계",
        extra: {
          condition: "Clear",
          image: "TR402.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "뜨거운 태양 아래 입맛이 없다면..",
        title: "비빔",
        extra: {
          condition: "Clear",
          image: "TR403.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "이열치열이다!",
        title: "매운",
        extra: {
          condition: "Clear",
          image: "TR404.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "recipe",
        title: "매운어묵김밥~~",
        content: `퇴근길~ 저녁을 뭐먹을까 고민중~ 
        냉장고속재료를 생각하니
        불현듯 백종원 매운어묵김밥이 생각나네요
        매콤하고 쫄깃하게 볶은 어묵~~
        아삭식감을 위해 당근을 추가햇어요 
        딸들도 맛잇다고 난리네요`,
        image: "myrcp01.webp",
        extra: {
          writeWay: "simple",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "recipe",
        title: "오징어볶음 만들기 !!",
        content: `오늘은 스뚜레스 만땅 !!!
        정신없이 매운게 땡기는날이네요 
        단짠,맵달의 정석으로 
        오징어볶음을 볶볶햇네요 
        흰쌀밥에 덮밥으로도 최고예요`,
        image: "myrcp02.webp",
        extra: {
          writeWay: "simple",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "recipe",
        title: "육즙 가득한 만두 만들기^^",
        content: `집에서 직접 만두를 만들어봤어요^^ 
        만들어서 바로 먹으니까 진짜 꿀맛이에요!!
        만두소 만들고 남은 재로는 볶아서 볶음밥으로도 먹고,
        다 빚어서 냉동실에 넣어 두고 먹으면 간편하고 좋아요~
        나중에 만둣국 해먹으려구요.
        귀찮아도 한번 만들면 오래 먹을 수 있어서 추천해요`,
        image: "myrcp03.webp",
        extra: {
          writeWay: "simple",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "recipe",
        title: "냉국수 만들기",
        content: `너무 더워서 시원한 국수 만들었어요~
        맛이 없어 보이지만 아주 맛있답니다.
        간단하게 면 삶고 육수 붓고 오이만 넣어봤어요
        날씨도 더워지는데 간단하고 맛있게 먹었어요
        시원하고 좋네요~~~`,
        image: "myrcp04.webp",
        extra: {
          writeWay: "simple",
        },
      },
    ],
    // 코드
    code: [],
    // 설정
    config: [],
  };
};

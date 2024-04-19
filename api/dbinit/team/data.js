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
        quantity: 1,
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
        target_id: 271,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 2,
        target_id: 271,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 3,
        target_id: 271,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        type: "product",
        user_id: 1,
        target_id: 38,
        createdAt: getTime(-3, -60 * 60 * 2),
      },
    ],
    // QnA, 공지사항, 게시판
    post: [
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "다 귀찮은 월요일,",
        title: "샐러드",
        extra: {
          condition: "day1",
          url: "RCP_NM=샐러드",
          image: "TR101.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "김치찌개",
        title: "김치찌개,",
        extra: {
          condition: "day1",
          url: "RCP_NM=김치찌개",
          image: "TR102.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "매운요리",
        title: "🔥요일은 🔥요리,",
        extra: {
          condition: "day2",
          url: "RCP_NM=매운",
          image: "TR103.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "비빔밥",
        title: "비빔밥",
        extra: {
          condition: "day2",
          url: "RCP_NM=비빔밥",
          image: "TR104.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "국수",
        title: "국수",
        extra: {
          condition: "day3",
          url: "RCP_NM=국수",
          image: "TR105.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "순두부",
        title: "순두부",
        extra: {
          condition: "day3",
          url: "RCP_NM=순두부",
          image: "TR106.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "삼겹살",
        title: "삼겹살",
        extra: {
          condition: "day4",
          url: "RCP_NM=삼겹살",
          image: "TR107.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "카레",
        title: "카레",
        extra: {
          condition: "day4",
          url: "RCP_NM=카레",
          image: "TR108.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "들깨",
        title: "들깨",
        extra: {
          condition: "day5",
          url: "RCP_NM=들깨",
          image: "TR109.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "떡볶이",
        title: "떡볶이",
        extra: {
          condition: "day5",
          url: "RCP_NM=떡볶이",
          image: "TR110.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "황태",
        title: "황태",
        extra: {
          condition: "day6",
          url: "RCP_PARTS_DTLS=황태",
          image: "TR111.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "파스타",
        title: "파스타",
        extra: {
          condition: "day6",
          url: "RCP_NM=파스타",
          image: "TR112.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "샌드위치",
        title: "샌드위치",
        extra: {
          condition: "day7",
          url: "RCP_NM=샌드위치",
          image: "TR113.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "묵은지",
        title: "묵은지",
        extra: {
          condition: "day7",
          url: "RCP_NM=묵은지",
          image: "TR114.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "전",
        title: "비가 오는",
        extra: {
          condition: "weather01",
          url: "RCP_PARTS_DTLS=부침가루",
          image: "TR201.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        content: "시원한 요리",
        title: "땀이 뻘뻘",
        extra: {
          condition: "weather01",
          url: "RCP_NM=초계",
          image: "TR202.webp",
        },
      },
    ],
    // 코드
    code: [],
    // 설정
    config: [],
  };
};

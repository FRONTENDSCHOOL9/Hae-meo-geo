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
    bookmark: [],
    // QnA, 공지사항, 게시판
    post: [
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day1",
        content: "다 귀찮은 월요일,",
        title: "샐러드",
        extra: {
          url: "RCP_NM=샐러드",
          image: "TR101.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day1",
        content: "김치찌개",
        title: "김치찌개,",
        extra: {
          url: "RCP_NM=김치찌개",
          image: "TR102.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day2",
        content: "매운요리",
        title: "🔥요일은 🔥요리,",
        extra: {
          url: "RCP_NM=매운",
          image: "TR103.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day2",
        content: "비빔밥",
        title: "비빔밥",
        extra: {
          url: "RCP_NM=비빔밥",
          image: "TR104.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day3",
        content: "국수",
        title: "국수",
        extra: {
          url: "RCP_NM=국수",
          image: "TR105.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day3",
        content: "순두부",
        title: "순두부",
        extra: {
          url: "RCP_NM=순두부",
          image: "TR106.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day4",
        content: "삼겹살",
        title: "삼겹살",
        extra: {
          url: "RCP_NM=삼겹살",
          image: "TR107.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day4",
        content: "카레",
        title: "카레",
        extra: {
          url: "RCP_NM=카레",
          image: "TR108.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day5",
        content: "들깨",
        title: "들깨",
        extra: {
          url: "RCP_NM=들깨",
          image: "TR109.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day5",
        content: "떡볶이",
        title: "떡볶이",
        extra: {
          url: "RCP_NM=떡볶이",
          image: "TR110.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day6",
        content: "황태",
        title: "황태",
        extra: {
          url: "RCP_PARTS_DTLS=황태",
          image: "TR111.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day6",
        content: "파스타",
        title: "파스타",
        extra: {
          url: "RCP_NM=파스타",
          image: "TR112.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day7",
        content: "샌드위치",
        title: "샌드위치",
        extra: {
          url: "RCP_NM=샌드위치",
          image: "TR113.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "day7",
        content: "묵은지",
        title: "묵은지",
        extra: {
          url: "RCP_NM=묵은지",
          image: "TR114.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "weather01",
        content: "전",
        title: "비가 오는",
        extra: {
          url: "RCP_PARTS_DTLS=부침가루",
          image: "TR201.webp",
        },
      },
      {
        _id: await nextSeq("post"),
        type: "todayRcp",
        condition: "weather01",
        content: "시원한 요리",
        title: "땀이 뻘뻘",
        extra: {
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

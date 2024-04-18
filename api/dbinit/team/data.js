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
        type: "notice",
        condition: "day1",
        content: "다 귀찮은 월요일,",
        title: "샐러드",
        url: "RCP_NM=샐러드",
        image: "TR101.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day1",
        title: "김치찌개,",
        menu: "김치찌개",
        url: "RCP_NM=김치찌개",
        image: "TR102.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day2",
        title: "🔥요일은 🔥요리,",
        menu: "매운요리",
        url: "RCP_NM=매운",
        image: "TR103.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day2",
        title: "비빔밥",
        menu: "비빔밥",
        url: "RCP_NM=비빔밥",
        image: "TR104.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day3",
        title: "국수",
        menu: "국수",
        url: "RCP_NM=국수",
        image: "TR105.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day3",
        title: "순두부",
        menu: "순두부",
        url: "RCP_NM=순두부",
        image: "TR106.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day4",
        title: "삼겹살",
        menu: "삼겹살",
        url: "RCP_NM=삼겹살",
        image: "TR107.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day4",
        title: "카레",
        menu: "카레",
        url: "RCP_NM=카레",
        image: "TR108.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day5",
        title: "들깨",
        menu: "들깨",
        url: "RCP_NM=들깨",
        image: "TR109.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day5",
        title: "떡볶이",
        menu: "떡볶이",
        url: "RCP_NM=떡볶이",
        image: "TR110.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day6",
        title: "황태",
        menu: "황태",
        url: "RCP_PARTS_DTLS=황태",
        image: "TR111.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day6",
        title: "파스타",
        menu: "파스타",
        url: "RCP_NM=파스타",
        image: "TR112.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day7",
        title: "샌드위치",
        menu: "샌드위치",
        url: "RCP_NM=샌드위치",
        image: "TR113.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "day7",
        title: "묵은지",
        menu: "묵은지",
        url: "RCP_NM=묵은지",
        image: "TR114.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "weather01",
        title: "비가 오는",
        menu: "전",
        url: "RCP_PARTS_DTLS=부침가루",
        image: "TR201.webp",
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        condition: "weather01",
        title: "땀이 뻘뻘",
        menu: "시원한 요리",
        url: "RCP_NM=초계",
        image: "TR202.webp",
      },
    ],
    // 코드
    code: [],
    // 설정
    config: [],
  };
};

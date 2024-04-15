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
    "https://openapi.foodsafetykorea.go.kr/api/f6e0fedf1c324ab98243/COOKRCP01/json/1/1001"
  );
  const result = await Promise.all(
    data["COOKRCP01"].row.map(async (item) => {
      return {
        _id: Number(item["RCP_SEQ"]),
        name: item["RCP_NM"],
        price: 0,
        quantity: 1,
        content: "",
      };
    })
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
    product: [],
    // 주문
    order: [],
    // 후기
    reply: [],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [],
    // QnA, 공지사항, 게시판
    post: [],
    // 코드
    code: [
      {
        _id: "todayRcp",
        title: "오늘의 메뉴",
        codes: [
          {
            sort: 1,
            code: "TR101",
            condition: "weather01",
            value: "비가 오는",
            menu: "전",
            url: "RCP_PARTS_DTLS=부침가루",
          },
          {
            sort: 2,
            code: "TR102",
            condition: "weather01",
            value: "땀이 뻘뻘",
            menu: "시원한 요리",
            url: "RCP_NM=초계",
          },
          {
            sort: 3,
            code: "TR103",
            condition: "day6",
            value: "불금, 달리셨나요?",
            menu: "황태로 해장",
            url: "RCP_PARTS_DTLS=황태",
          },
          {
            sort: 4,
            code: "TR104",
            condition: "day1",
            value: "다 귀찮은 월요일,",
            menu: "샐러드",
            url: "RCP_NM=샐러드",
          },
        ],
      },
    ],
    // 설정
    config: [],
  };
};

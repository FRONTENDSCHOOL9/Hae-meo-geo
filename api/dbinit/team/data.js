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
async function getData() {
  const { data } = await axios.get(
    "https://openapi.foodsafetykorea.go.kr/api/f6e0fedf1c324ab98243/COOKRCP01/json/1/3"
  );
  const result = data["COOKRCP01"].row.map((item) => ({
    // _id: await nextSeq("product"),
    name: item["RCP_NM"],
    extra: {
      ["RCP_SEQ"]: item["RCP_SEQ"],
    },
  }));
  return result;
}
// getData();

export const initData = async (nextSeq) => {
  const { data } = await axios.get(
    "https://openapi.foodsafetykorea.go.kr/api/f6e0fedf1c324ab98243/COOKRCP01/json/1/1001"
  );
  const result = await Promise.all(
    data["COOKRCP01"].row.map(async (item) => ({
      // _id: await nextSeq("product"),
      _id: item["RCP_SEQ"],
      name: item["RCP_NM"],
      extra: {
        ["RCP_SEQ"]: item["RCP_SEQ"],
      },
      seller_id: 2,
      price: 22800,
      shippingFees: 0,
      show: true,
      active: true,
      quantity: 320,
      buyQuantity: 310,
      mainImages: [
        {
          url: `/files/sample-dog.jpg`,
          fileName: "sample-dog.jpg",
          orgName: "스턴트 독.jpg",
        },
      ],
      content: `
      <div class="product-detail">
        <p></p>
      </div>`,
      createdAt: getTime(-41, -60 * 60 * 2),
      updatedAt: getTime(-40, -60 * 15),
    }))
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
    post: [],
    // 코드
    code: [],
    // 설정
    config: [],
  };
};

import moment from "moment";

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
  return {
    // 회원
    user: [],
    // 상품
    product: [
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 22800,
        shippingFees: 0,
        show: true,
        active: true,
        name: "캥거루 스턴트 독 로봇완구",
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
            <p>캥거루 스턴트 독 로봇완구 상세 설명</p>
          </div>`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          isNew: true,
          isBest: true,
          category: ["PC03", "PC0301"],
          sort: 5,
        },
      },
    ],
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

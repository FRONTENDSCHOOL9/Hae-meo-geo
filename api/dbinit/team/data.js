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
        image: item["ATT_FILE_NO_MAIN"],
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
    code: [
      {
        _id: "todayRcp",
        title: "오늘의 메뉴",
        codes: [
          {
            sort: 1,
            code: "TR101",
            condition: "day1",
            value: "다 귀찮은 월요일,",
            menu: "샐러드",
            url: "RCP_NM=샐러드",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/20210210/20210210110714_1612922834280.jpg",
          },
          {
            sort: 2,
            code: "TR102",
            condition: "day1",
            value: "김치찌개,",
            menu: "김치찌개",
            url: "RCP_NM=김치찌개",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00270_2.png",
          },
          {
            sort: 3,
            code: "TR103",
            condition: "day2",
            value: "🔥요일은 🔥요리,",
            menu: "매운요리",
            url: "RCP_NM=매운",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00383_2.png",
          },
          {
            sort: 4,
            code: "TR104",
            condition: "day2",
            value: "비빔밥",
            menu: "비빔밥",
            url: "RCP_NM=비빔밥",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00230_2.png",
          },
          {
            sort: 5,
            code: "TR105",
            condition: "day3",
            value: "국수",
            menu: "국수",
            url: "RCP_NM=국수",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/20210310/20210310101237_1615338757971.jpg",
          },
          {
            sort: 6,
            code: "TR106",
            condition: "day3",
            value: "순두부",
            menu: "순두부",
            url: "RCP_NM=순두부",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00281_2.png",
          },
          {
            sort: 7,
            code: "TR107",
            condition: "day4",
            value: "삼겹살",
            menu: "삼겹살",
            url: "RCP_NM=삼겹살",
            image:
              "https://www.foodsafetykorea.go.kr/common/ecmFileView.do?ecm_file_no=1NxSkgr946U",
          },
          {
            sort: 8,
            code: "TR108",
            condition: "day4",
            value: "카레",
            menu: "카레",
            url: "RCP_NM=카레",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/20210209/20210209105005_1612835405539.jpg",
          },
          {
            sort: 9,
            code: "TR109",
            condition: "day5",
            value: "들깨",
            menu: "들깨",
            url: "RCP_NM=들깨",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/20210129/20210129102439_1611883479294.jpg",
          },
          {
            sort: 10,
            code: "TR110",
            condition: "day5",
            value: "떡볶이",
            menu: "떡볶이",
            url: "RCP_NM=떡볶이",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/20200317/20200317111752_1584411472208.JPG",
          },
          {
            sort: 11,
            code: "TR111",
            condition: "day6",
            value: "황태",
            menu: "황태",
            url: "RCP_PARTS_DTLS=황태",
            image:
              "http://www.foodsafetykorea.go.kr/uploadimg/20230308/20230308030341_1678255421758.jpg",
          },
          {
            sort: 12,
            code: "TR112",
            condition: "day6",
            value: "파스타",
            menu: "파스타",
            url: "RCP_NM=파스타",
            image:
              "https://www.foodsafetykorea.go.kr/common/ecmFileView.do?ecm_file_no=1NxSkgr9WOj",
          },
          {
            sort: 13,
            code: "TR131",
            condition: "day7",
            value: "샌드위치",
            menu: "샌드위치",
            url: "RCP_NM=샌드위치",
            image:
              "https://www.foodsafetykorea.go.kr/common/ecmFileView.do?ecm_file_no=1NxSkgr9l5l",
          },
          {
            sort: 14,
            code: "TR114",
            condition: "day7",
            value: "묵은지",
            menu: "묵은지",
            url: "RCP_NM=묵은지",
            image:
              "https://www.foodsafetykorea.go.kr/common/ecmFileView.do?ecm_file_no=1NxSkgr99W1",
          },
          {
            sort: 15,
            code: "TR201",
            condition: "weather01",
            value: "비가 오는",
            menu: "전",
            url: "RCP_PARTS_DTLS=부침가루",
            image:
              "https://www.foodsafetykorea.go.kr/common/ecmFileView.do?ecm_file_no=1NxSkgr9ktU",
          },
          {
            sort: 16,
            code: "TR202",
            condition: "weather01",
            value: "땀이 뻘뻘",
            menu: "시원한 요리",
            url: "RCP_NM=초계",
            image:
              "https://www.foodsafetykorea.go.kr/common/ecmFileView.do?ecm_file_no=1NxSkgr9544",
          },
        ],
      },
    ],
    // 설정
    config: [],
  };
};


# 0. 목차
1. [서비스 소개]()
2. [팀원 소개]()
3. [개발 일정]()
4. [개발 환경 및 기술 스택]()
5. [프로젝트 폴더 구조]()
6. [협업 능력]()
7. [기능 소개]()
8. [상세 담당 업무]()
9. [핵심 코드]()
10. [후기]()

---

# 1. 서비스 소개

‘**해머거**’는 밥을 해서 먹으라는 ‘해 먹어’를 귀엽게 발음했습니다. 
무엇을 먹을지 고민하는 사람들을 위해 그 음식의 레시피를 알려주고, 음식을 추천도 해주며 먹은 음식을 올리며 소통하는 사이트 입니다. 무엇을 먹을지 고민 하는 시간을 줄여주고 북마크 해 놓은 음식을 직접 해보고 후기를 남기며 음식을 해서 먹는 즐거움을 줍니다.

---

# 2. 팀원 소개

|[박지성](https://github.com/sasakieiji)|[서진희](https://github.com/sozzi0)|[이소정](https://github.com/s0zzang)|[한태희](https://github.com/taehee1228)|
| :--------: | :--: | :------: | :----: |
|디자인 마스터|노션 마스터|팀장|깃 마스터|

## 👨‍👩‍👧‍👦 2.팀원 소개
| 이소정 | 박지성 | 서진희 | 한태희 |
| :---: | :---: | :---: | :---: |
| <img alt="김나라" src="https://github.com/volunteer-community/volunteer-backend/assets/107487996/779962e3-b1d0-42cb-b251-849816fbdeee" height="100" width="100"> | <img alt="김선미" src="https://github.com/volunteer-community/volunteer-backend/assets/107487996/c9e75bb6-fc16-4a3f-a97d-fadddd36d4a4" height="100" width="100"> | <img alt="김현묵" src="https://github.com/volunteer-community/volunteer-backend/assets/107487996/e68a4c7c-f4b8-412c-b16d-2b7f88924e2d)4334-99c5-cfd48813355c" height="100" width="120"> |
| [@C5D2](https://github.com/C5D2) | [@seon-mikim](https://github.com/seon-mikim) | [@kim-hyun-mook](https://github.com/kim-hyun-mook) |
| **팀장** | **디자인 마스터** | **노션마스터** | **깃 마스터** |

---

# 3. 개발 일정
**2024. 3. 28 ~ 2024. 4. 24**
|기간|내용|
| :----: | :-- |
|3/28~|기획|
|4/10~|UI 디자인|
|4/10~|마크업 및 기능 개발|
|4/23 ~|QA 기간|


---


# 4. 개발 환경 및 기술 스택

## ⚙️기술 스택
### Tools
| Git | Github | Discord | Notion |
| :---: | :---: | :---: | :---: |
| <img alt="git logo" src="https://git-scm.com/images/logos/logomark-orange@2x.png" width="65" height="65" > | <img alt="github logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="65" height="65"> | <img alt="Discord logo" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384e89d1d54d704ece7_3437c10597c1526c3dbd98c737c2bcae.svg" height="65" width="65"> | <div style="display: flex; align-items: flex-start;"><img src="https://github.com/volunteer-community/volunteer-backend/assets/107487996/15b94d68-61bd-48d5-8931-2180b62fb9a6" alt="icon" width="65" height="65" /></div>
### Front-end
| Html | CSS  | React | React-<br>Router  | esLint | Prettier | React-<br>Query | Redux |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| <img alt="Html" src ="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/440px-HTML5_logo_and_wordmark.svg.png" width="65" height="65" /> | <img alt="css" src="https://github.com/volunteer-community/volunteer-backend/assets/107487996/cc90533f-6811-4e1b-84e9-6314c9d01da0" height="70" width="70" > | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /></div> | <img alt="rr" src="https://github.com/volunteer-community/volunteer-backend/assets/107487996/b307f370-9cd4-4dc8-992a-914dd5f45e92" height="65" width="65" > | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /></div> | <img alt="rq" src="https://github.com/volunteer-community/volunteer-backend/assets/107487996/3f49a145-7705-4117-8198-b52fe6b062ea" height="70" width="70" > | <img alt="redux" src="https://github.com/volunteer-community/volunteer-backend/assets/107487996/3ad4326c-87bf-4fdd-afd6-9d35326d1ffb" height="70" width="70" > |


### 개발 환경
|||
| :-------- | :-- |
|개발환경|[FrontEnd] </br> React, Axios, CSS module, Zustand, React-Query </br> [BackEnd] </br> [제공된 API](https://api.frontendschool.shop/apidocs/), [식품의약품안전처 조리식품의 레시피 API](https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=COOKRCP01), [날씨 API](https://openweathermap.org/)


### 컨벤션
- **prettier**
```js
module.exports = {
  singleQuote: false,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 80,
  arrowParens: "always",
  endOfLine: "auto",
};
```

</br>

- **커밋 컨벤션**
 
|||
| :--------: | :-- |
feat | 새로운 기능을 추가할 경우
fix |	버그를 고친 경우
design |		CSS 등 사용자 UI 디자인 변경
style |		코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
!BREAKING CHANGE |		커다란 API 변경의 경우
!HOTFIX |		급하게 치명적인 버그를 고쳐야하는 경우
refactor |		프로덕션 코드 리팩토링
comment |		필요한 주석 추가 및 변경
docs |		문서를 수정한 경우
test |		테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 X)
chore |		빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우 (프로덕션 코드 변경 X)
rename |		파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
remove |		파일을 삭제하는 작업만 수행한 경우

</br>

### 라이브러리 사용 이유
|기술|이유|
| :--: | :-- |
React | 재사용 가능한 컴포넌트 사용하기 위해 사용
Zustand | 단순한 상태 관리와 용이한 유지 보수를 위해 사용
Axios | HTTP 통신 로직을 쉽게 관리하기 위해 사용
CSS Module | 스타일 관리의 복잡성을 줄이고 유지 보수성을 향상 시키기 위해 사용
React Query | 서버 동기화를 간편하게 사용하고 무한 스크롤 구동을 위해 사용

---

# 5. 프로젝트 폴더 구조

---

# 6. 협업능력

> ### [Notion](https://www.notion.so/3d7489dd4e314f3bb52e2e3f67d05838)
  **회의록 작성, 개발 방향, 등등의 정보를 참고하기 용이하게 사용**
  노션 기능을 사용하여 매일 아침과 저녁에 스크럼 회의를 했습니다. 각자의 작업 현황과 어려웠던 점 등을 공유하는 시간을 가졌습니다.

> ### Discord
  **개발 진행시 화면 공유나 그룹 전화를 통해 회의나 원활한 커뮤니케이션을 위해 활용**
  화면 공유 기능을 통해 팀원들과 문제 파악 및 해결을 했습니다.

> ### FIGMA
**디자인 적인 수정사항 파악을 용이하게 하기 위해 사용**
피그마로 와이어 프레임 구성하고 팀원들과 실시간으로 회의하며 작업 현황을 파악하며 수월하게 작업을 했습니다.

> ### GitHub
**깃허브 팀프로젝트 기능을 이용하여 개발버전 관리를 용이하게 사용**
팀 저장소를 포크해서 개인 저장소에서 작업하고 팀프로젝트 dev에 PR을 보내 머지하는 방식으로 작업하여 메인버전에 실수로 머지 할수 있는 경우를 줄여 안정적으로 작업할수 있었습니다.

---
# 7. 기능 소개

### 메인 페이지

| 헤더 | 메인 | 푸터 |
| :--: | :--: | :--: |
|      |      |

### 로그인

| 로그인 |
| :----: |
|        |

### 회원가입

| 회원가입 | 약관동의 | 정보입력 |
| :------: | :------: | :------: |
|          |          |

### 오늘뭐먹지?

| 목록 | 검색 | 무한스크롤 |
| :--: | :--: | :--------: |
|      |      |

### 해머거 레시피

| 목록 | 검색 | 페이지네이션 |
| :--: | :--: | :----------: |
|      |      |

| 상세 | 후기 작성 | 후기 삭제 |
| :--: | :-------: | :-------: |
|      |           |

| 북마크 등록 | 카카오톡 공유 |
| :---------: | :-----------: |
|             |

### 나만의 레시피

| 목록 | 검색 |
| :--: | :--: |
|      |      |

| 상세  | 등록 |
| :--: | :--: |
|      |      |

### 기타

| 404 에러 |
| :---: |
|          |

---

# 8. 상세 담당 업무
### 이소정(팀장)
- 🌟메인 페이지
    - 추천 레시피
      - OpenWeather 날씨 api을 사용하여 현재 날씨를 받아옴
      - 추천 메뉴를 리스트업하여 db에 초기 세팅 후 현재 날씨와 요일에 알맞은 레시피 랜덤 노출
      - 레시피 클릭시 레시피 상세 화면으로 이동
  - 해머거 레시피
      - 북마크가 많은 순서대로 최대 6개 노출
      - 더보기 버튼 클릭시 해머거 레시피 목록으로 이동
  - 나만의 레시피
      - 최근 등록된 순서대로 최대 6개 노출
      - 더보기 버튼 클릭시 나만의 게시물 목록으로 이동
  - 레시피 검색
      - 키워드가 반영된 해머거 레시피 목록으로 이동

- 🌟오늘 뭐먹지?
  - 레시피 추천
      - 날씨/요일별 추천 메뉴를 리스트업하여 db에 저장하여 초기 세팅

- 🌟레시피 목록
  - 카테고리, 검색
      - 조리식품의 레시피 API에서 제공해주는 쿼리스트링 활용하여 데이터 호출
  - 페이지네이션
      - 조리식품의 레시피 API에서 제공하는 레시피의 총 개수를 활용하여 5개씩 페이지네이션이 노출되도록 구현
      
- 🌟레시피 상세
  - 후기
      - 조리식품의 레시피 일련 번호를 상품으로 초기 등록하여 해당 상품의 일련번호에 해당하는 QnA 게시글 호출/등록/삭제
      - 게시글 POST 통신시 [파일 업로드 API](https://api.frontendschool.shop/apidocs/#/%ED%8C%8C%EC%9D%BC/post_files_)를 활용하여 업로드된 파일명을 추출하는 함수 분리(src/utils/uploadImage.mjs)
  - 북마크
      - 조리식품의 레시피 일련 번호를 상품으로 초기 등록하여 해당 상품의 일련번호에 해당하는 상품에 북마크 추가/삭제
  - 공유하기
      - [카카오톡 메시지 전송 API](https://developers.kakao.com/tool/demo/message/kakaolink?message_type=default)를 활용하여 레시피의 이름, 사진, 링크를 카카오톡 메시지로 전달
      
- 🌟공통 컴포넌트
    - 헤더
    - 푸터
    - 로딩 페이지
    - 404에러 페이지

### 박지성
- 🌟난만의 레시피 게시판
    
    - 게시판 목록
        
      - 겔러리형 게시판
      - 검색 기능

    - 게시물 등록
      
      - 메인 이미지, 이름, 재료 설명

    - 게시물 상세
      - 메인 이미지, 이름, 재료(한 번에 보여주기), 작성자



# 9. 핵심 코드

---

# 10. 소감
### 🍚 이소정

```
이 안에 소감 작성
```

### 🍚 박지성

```
이 안에 소감 작성
```

### 🍚 서진희

```
이 안에 소감 작성
```

### 🍚 한태희

```
이 안에 소감 작성
```
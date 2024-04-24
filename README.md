# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

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
10. [트러블 슈팅]()
11. [후기]()

---

# 1. 서비스 소개

‘**해머거**’는 밥을 해서 먹으라는 ‘해 먹어’를 귀엽게 발음했습니다. 
무엇을 먹을지 고민하는 사람들을 위해 그 음식의 레시피를 알려주고, 음식을 추천도 해주며 먹은 음식을 올리며 소통하는 사이트 입니다. 무엇을 먹을지 고민 하는 시간을 줄여주고 북마크 해 놓은 음식을 직접 해보고 후기를 남기며 음식을 해서 먹는 즐거움을 줍니다.

---

# 2. 팀원 소개

|[박지성](https://github.com/sasakieiji)|[서진희](https://github.com/sozzi0)|[이소정](https://github.com/s0zzang)|[한태희](https://github.com/taehee1228)|
| :--------: | :--: | :------: | :----: |
|디자인 마스터|노션 마스터|팀장|깃 마스터|

---

# 3. 개발 일정
**2024. 3. 28 ~ 2024. 4. 24**
|기간|내용|
| :-------- | :-- |
|3/28~|기획|
|4/10~|UI 디자인|
|4/10~|마크업 및 기능 개발|
|4/23 ~|QA 기간|
---
# 4. 개발 환경 및 기술 스택
|||
| :-------- | :-- |
|개발환경|[FrontEnd] </br> React, Axios, CSS module, Zustand, React-Query </br> [BackEnd] </br> [제공된 API](https://api.frontendschool.shop/apidocs/), [식품의약품안전처 조리식품의 레시피 API](https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=COOKRCP01), [날씨 API](https://openweathermap.org/)
버전 및 이슈 관리| Github, Notion
프로젝트 관리|Github Pull requests
컨벤션|prettier, 커밋 컨벤션
디자인|Figma
커뮤니케이션|Notion, Discord
배포|Netlify 


### 컨벤션
**prettier**
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
**커밋 컨벤션**
|||
| :-------- | :-- |
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


### 라이브러리 사용 이유
|기술|이유|
| :-------- | :-- |
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
---

# 8. 상세 담당 업무

---

# 9. 핵심 코드

---

# 10. 소감
# 🌌 ORVION SPACE — NASA APOD 캘린더 웹 서비스

> **NASA 공공 API 기반 천문 데이터 시각화 및 다국어 해석 에디토리얼 웹 앱** > 사용자가 선택한 날짜의 NASA 우주 사진과 천문학적 설명 데이터를 동적으로 렌더링하고, 실시간 한국어 해석 기능을 제공하는 모던 프론트엔드 프로젝트입니다.

<br />

## 🔗 링크 (Links)
* **Live Demo:** [https://space-archive-swart.vercel.app]
* **GitHub Repository:** [https://github.com/nninseoo/SpaceArchive]

<br />

## 🛠️ 기술 스택 (Tech Stack)

| 분류 | 기술 기술 및 라이브러리 |
| :--- | :--- |
| **Frontend** | React.js (v18+), JavaScript (ES6+) |
| **Styling** | Pure CSS3 (Vanilla CSS), BEM 방법론 적용 |
| **Libraries** | react-calendar |
| **Build & Deploy** | Vite, Vercel (지속적 배포, CD) |
| **Data API** | NASA APOD API, MyMemory Translation API |

<br />

## 주요 기능 (Core Features)

1. **에디토리얼 인트로 화면 (Hero Section)**
   * 올 블랙 우주 테마 기반의 모던한 레이아웃 설계.
   * `get advice ↓` 버튼 클릭 시 최신 웹 UX 기법인 자바스크립트 `scrollIntoView()`를 활용하여 하단 캘린더 영역으로 부드럽게 화면을 이동시키는 Smooth Scroll 기능 구현.

2. **NASA APOD API 연동 및 동적 렌더링**
   * `react-calendar` 컴포넌트를 커스텀 다크 테마로 구현.
   * 사용자가 달력에서 날짜를 클릭할 때마다 React `useState` 상태가 변경되며, `useEffect` 훅이 이를 감지하여 NASA 서버로부터 해당 날짜의 고화질 이미지/비디오 데이터와 설명을 비동기(`async/await`)로 호출 및 렌더링.
   * `maxDate={new Date()}` 설정을 통해 미래 날짜 선택을 차단하고, 미래 화살표 버튼 비활성화(`:disabled`) 시 발생하는 외부 라이브러리 기본 CSS 스타일을 오버라이딩하여 UI 일관성 유지.

3. **청킹(Chunking) 기반 실시간 한·영 번역 시스템**
   * 토글 스위치 형태의 번역 버튼을 배치하여 버튼 클릭 시 NASA의 천문학 해설 데이터를 실시간 한국어로 자동 해석.

<br />

## 트러블슈팅 및 예외 처리 (Troubleshooting)

### 1. 무료 번역 API의 글자 수 제한(500자) 제약 조건 극복
* **문제 상황:** NASA의 설명글이 너무 길어 무료 MyMemory API 요청 시 글자 수 초과로 인해 텍스트가 잘리거나 `400 Bad Request` 에러가 발생함.
* **원인 분석:** 단일 요청당 전송할 수 있는 최대 쿼리 데이터 길이를 위반함.
* **해결 방법 (텍스트 청킹 기법):** 긴 문자열을 안전 범위인 400자 단위의 조각(Chunk)으로 쪼개는 자바스크립트 슬라이싱 로직을 구현하였습니다. 이후 `for...of` 비동기 루프를 사용하여 순차적으로 API를 호출한 뒤 결과를 하나로 다시 병합하는 방식을 도입하여 에러를 완벽히 해결하고 긴 문장도 끊김 없이 번역하도록 구현했습니다.

### 2. 하드코딩된 API Key의 보안 취약점 해결
* **문제 상황:** 소스코드 내부에 NASA API Key 문자열을 직접 하드코딩하여 GitHub 원격 저장소 노출 위험 및 보안 경고가 발생함.
* **원인 분석:** 소스코드와 환경 설정/민감 데이터가 분리되지 않음.
* **해결 방법 (환경 변수 아키텍처 도입):** 기존 API Key를 즉시 폐기 및 재발급 처리한 후, Vite 개발 환경의 환경 변수 시스템을 도입하였습니다. 프로젝트 최상위에 `.env.local` 파일을 생성하여 Key를 숨기고, 소스코드 내에서는 `import.meta.env.VITE_NASA_API_KEY`를 통해 동적으로 호출하도록 리팩토링했습니다. Vercel 배포 시에도 `Environment Variables` 설정을 통해 안전한 클라우드 보안 환경을 구축했습니다.

<br />

## 실행 방법 (How to Run)

프로젝트를 로컬 환경에서 실행하려면 아래 명령어를 순서대로 입력하세요.

```bash
# 1. 저장소 클론
git clone [https://github.com/](https://github.com/)[본인_깃허브_아이디]/[저장소_이름].git

# 2. 프로젝트 폴더로 이동
cd [저장소_이름]

# 3. 의존성 패키지 설치
npm install

# 4. 로컬 환경 변수 파일 생성 (.env.local 작성)
# 파일 내용 예시: VITE_NASA_API_KEY=발급받은_NASA_키

# 5. 로컬 개발 서버 실행
npm run dev

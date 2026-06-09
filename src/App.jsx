// App.jsx
// 전체 상태(State)와 API 통신 로직을 관리하는 메인 파일

// import 구문
// React 라이브러리 전체가져오기 .JSX 문법을 쓰려면 반드시 필요
// useState = 상태관리, useEffect = 생명주기 제어
import React, { useState, useEffect } from 'react'; 
// 직접 만든 컴포넌트 경로
import MainSection from './components/MainSection';
import CalendarSection from './components/CalendarSection';
import ApodDisplay from './components/ApodDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer'; 
import './App.css';

function App() {
  // State(상태) 선언
  // : 컴포넌트의 메모리. 값이 바뀌면(변경함수 호출 시) 화면 자동 렌더링. 배열 구조분해할당으로 두 값을 동시에 받음
  // useState 기본 패턴 : const [현재값, 변경함수] = useState(초기값)
  const [date, setDate] = useState(new Date()); // new Date() = 오늘 // 달력에서 날짜 클릭 시 setDate가 호출되어 값이 바뀜.
  const [apodData, setApodData] = useState(null); // NASA API 응답 객체 저장소
  const [isLoading, setIsLoading] = useState(false); // API 요청이 진행 중인지 여부. true이면 LoadingSpinner를 보여줌.
  const [error, setError] = useState(null); // API 실패 시 에러 메세지 저장

  // 날짜 변환 함수 (YYYY-MM-DD)
  // Date 객체를 받아 "YYYY-MM-DD" 문자열로 변환. NASA API의 date 파라미터 형식에 맞춤.
  const formatDate = (dateObj) => {
    const offset = dateObj.getTimezoneOffset() * 60000;
    return new Date(dateObj.getTime() - offset).toISOString().split('T')[0];
  };

  // useEffect + 비동기 API 호출
  // : 컴포넌트의 생명주기(탄생, 변화, 죽음)를 제어하는 Hook
  // 의존성 배열 [date]에 date가 있으므로 처음 렌더링 + 달력에서 날짜를 클릭해 date 상태가 변할 때마다 이 안의 코드가 실행됨.
  // 달력 클릭 → date변경 → useEffect 실행 → API 호출
  useEffect(() => {
    const fetchApodByDate = async () => { // async/await : 비동기 처리 문법. fetch는 시간이 걸리므로 await로 응답이 올 때까지 기다렸다가 다음 줄 실행. 
      setIsLoading(true); // 로딩 시작
      setError(null); // 이전 에러 초기화

      // 에러 처리 3단 구조 
      // try = 정상 실행, catch = 에러 발생 시 메시지 저장, finally = 성공·실패 무관하게 항상 실행 (로딩 상태 false로 초기화)
      try {
        const apiKey = import.meta.env.VITE_NASA_API_KEY;
        const formattedDate = formatDate(date);
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formattedDate}`;
        
        const response = await fetch(url); // API 요청
        
        // HTTP 상태코드 200~299면 true. 아니면 false. false이면 throw로 강제 에러를 일으켜 catch로 넘김
        if (!response.ok) {
          throw new Error('우주 데이터를 불러오는데 실패했습니다.');
        }

        const data = await response.json(); // 서버 응답(Response 객체)을 JS 객체로 변환
        setApodData(data); // 상태 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchApodByDate();
  }, [date]); 

  // JSX 반환 - 조건부 렌더링
  return (
    <div className="app-container">
      {/* 1번째 화면 */}
      <MainSection />

      {/* 2번째 화면: 달력 & 데이터 디스플레이 */}
      <div className="content-section" id="explore-section">
        {/* 부모가 자식 컴포넌트에게 Props로 데이터와 함수를 전달 */}
        <CalendarSection date={date} setDate={setDate} /> 
        
        {/* 조건부 렌더링: 상황에 따라 다른 UI를 보여줌 */}
        {/* && 앞이 true일 때만 뒤가 실행 */}
        {isLoading && <LoadingSpinner />}
        {error && <div className="error-message">{error}</div>}
        
        {/* 세 조건 모두 참일 때만 ApodDisplay 렌더링 */}
        {!isLoading && !error && apodData && (
          // NASA API 응답 객체에서 필요한 필드만 Props로 분리해서 자식 컴포넌트에 전달 
          <ApodDisplay 
            title={apodData.title} 
            url={apodData.url} 
            explanation={apodData.explanation} 
            mediaType={apodData.media_type} // NASA API는 가끔 영상(video)을 주기도 함. media_type으로 사진/영상 구분
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
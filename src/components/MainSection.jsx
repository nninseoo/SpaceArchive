// MainSection.jsx
// 1번째 화면 

import React from 'react';

function MainSection() {
  // 이벤트 핸들러 함수 - 스크롤 이동
  const handleScrollDown = () => {
    // DOM(문서 객체 모델)에서 App.jsx에 달아둔 id="explore-section"인 요소 탐색
    const targetSection = document.getElementById('explore-section');
    
    // 타겟을 성공적으로 찾았다면, 해당 요소로 스크롤을 이동시킵니다.
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth', // 뚝 끊기지 않고 부드럽게 이동
        block: 'start'      // 화면 상단에 맞춰 정렬
      });
    }
  };

  return (
    <section className="main-section">
      
      {/* 1. 상단 영역 (네비게이션) */}
      <header className="main-header">
        <div className="logo-small">Space Archive</div>
        <nav className="main-nav">
          <ul>
            <li><span className="dot">•</span> CONTROL </li>
            <li><span className="dot">•</span> SYSTEM </li>
            <li><span className="dot">•</span> DATASET </li>
            <li><span className="dot">•</span> STATION </li>
          </ul>
        </nav>
      </header>

      {/* 2. 중앙 영역 (메인 타이틀) */}
      {/* Framer Motion 라이브러리 컴포넌트를 사용해 로고가 스르륵 나타나고 커지는 애니메이션 
        페이지 로드 시 부드럽게 나타나는 애니메이션 적용 */}
      <div className="main-title-container">
        <h1 className="giant-title">Space</h1>
        {/* Space 글자가 오른쪽 아래에 걸치도록 배치 */}
        <h2 className="giant-subtitle">Archive</h2>
      </div>

      {/* 3. 하단 설명 & 버튼 영역 */}
      <footer className="main-footer">
        <div className="mission-text">
          <h3>OUR MISSION</h3>
          <p>
            To connect humanity th the cosmic timeline,<br/>
            making decades of space data an interactive journey for everyone.
          </p>
        </div>

        {/* 버튼에 onClick 이벤트를 연결 */}
        <button className="advice-btn" onClick={handleScrollDown}>
          Enter the Archive ↓
        </button>
      </footer>

    </section>
  );
}

export default MainSection;
// Footer.jsx
// Props와 State 없음 : Footer는 항상 같은 내용을 보여줌. 가장 단순한 형태의 컴포넌트 = LoadingSpinner.jsx

import React from 'react';

function Footer() {
  return (
    // <footer> 시맨틱 태그
    // <div> 대신 <footer>를 사용하면 브라우저와 검색엔진(SEO)이 "이 영역이 꼬리말"임을 자동으로 인식 → 접근성·SEO 향상
    <footer className="site-footer">
      
      <div className="footer-top">
        {/* 왼쪽: 로고 */}
        <div className="footer-logo">
            Space Archive
        </div>

        {/* 중앙: 2단 링크 메뉴 */}
        <div className="footer-links">
          <ul>
            <li>CONTROL</li>
            <li>SYSTEM</li>
          </ul>
          <ul>
            <li>DATASET</li>
            <li>STATION</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        {/* 왼쪽 아래 */}
        <div className="privacy">NASA Terms of Use</div>
        {/* 오른쪽 아래 */}
        <div className="cookie">© 2026 Space Archive. All rights reserved.</div>
      </div>

    </footer>
  );
}

export default Footer;
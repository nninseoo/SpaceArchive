// LoadingSpinner.jsx
// 로딩 중일때 띄울 스피너

import React from 'react';

function LoadingSpinner() {
  // Props, State가 없는 순수 표현 컴포넌트 (외부에서 데이터를 받지 않고 항상 같은 UI를 렌더링)
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>우주와 교신 중...</p>
    </div>
  );
}

export default LoadingSpinner;
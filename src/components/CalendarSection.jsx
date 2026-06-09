// 2번째 화면 (달력)

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// 구조 분해 할당(Destructuring): 부모(App.js)가 넘겨준 props 객체에서 필요한 것만 빼서 씀
function CalendarSection({ date, setDate }) {
  return (
    <div className="calendar-container">
      <h2 className="section-title">SELECT COSMIC DATE</h2>
      <Calendar 
        onChange={setDate} // 날짜를 클릭하면 부모의 setDate를 직접 호출해 부모 State 변경 (상태 끌어올리기)
        value={date} // 달력의 선택된 날짜를 부모에서 제어하는 제어 컴포넌트 패턴. 데이터 흐름이 단방향으로 명확해짐.
        maxDate={new Date()} // 미래의 우주 사진은 없으므로 오늘까지만 선택 가능하게 제한
      />
    </div>
  );
}

export default CalendarSection;
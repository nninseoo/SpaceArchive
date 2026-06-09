// ApodDisplay.jsx
// NASA API 데이터(사진, 설명)를 보여주는 영역

import React, { useState } from 'react'; 

function ApodDisplay({ title, url, explanation, mediaType }) {
  // State(상태) 선언 : 번역 기능
  const [isKorean, setIsKorean] = useState(false);         // 현재 언어 모드. false=영어(기본값), true=한국어.
  const [translatedTitle, setTranslatedTitle] = useState(''); // 번역된 제목 저장
  const [translatedText, setTranslatedText] = useState(''); // 번역된 설명글 저장 
  const [isTranslating, setIsTranslating] = useState(false); // 번역 데이터 로딩 상태

  // 이벤트 핸들러 함수
  // 스위치 버튼을 눌렀을 때 실행되는 함수
  const handleTranslateToggle = async () => {
    // 영어->한글로 전환이면서, 기존에 번역해둔 데이터가 없을 때만 API 호출 (캐싱 최적화, 중복 번역 방지)
    if (!isKorean && !translatedText) {
      setIsTranslating(true);
      try {
        // [로직 1] 제목 번역
        const encodedTitle = encodeURIComponent(title);
        const titleResponse = await fetch(`https://api.mymemory.translated.net/get?q=${encodedTitle}&langpair=en|ko`);
        const titleData = await titleResponse.json();
        
        if (titleData.responseData && titleData.responseData.translatedText) {
          setTranslatedTitle(titleData.responseData.translatedText);
        }

        // [로직 2] 설명글 번역 : 글자 수 제한 극복으로 위해 영어 원문을 400자 이하의 조각으로 분할 (마침표 기준으로 분리)
        const sentences = explanation.split('. ');
        const chunks = [];
        let currentChunk = '';

        sentences.forEach(sentence => {
          // 현재 조각에 다음 문장을 붙였을 때 400자가 넘어가면, 지금까지의 조각을 저장하고 새로 시작
          if ((currentChunk + sentence).length > 400) {
            chunks.push(currentChunk); // 현재 조각 저장
            currentChunk = sentence + '. '; // 새 조각 시작
          } else {
            currentChunk += sentence + '. '; // 문장 이어붙이기
          }
        });
        
        if (currentChunk) chunks.push(currentChunk); // 마지막 조각 저장

        // [로직3] 쪼개진 조각들을 순서대로 번역 API에 요청하기
        let finalTranslatedText = '';
        
        // for...of 반복문을 사용하여 번역 요청을 하나씩 순서대로(동기적으로) 처리 
        // forEach는 async/await 사용 불가,  for...of는 await 사용 가능 
        for (const chunk of chunks) {
          const encodedText = encodeURIComponent(chunk); // 텍스트를 URL 안전 형식으로 변환.
          // await fetch(...) : 각 청크마다 번역 API 호출. await가 있으므로 이번 요청 완료 후 다음 청크로 넘어감 -> 순서 보장
          const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|ko`);
          const data = await response.json();
          
          // API가 정상적인 번역 결과를 줬는지 확인하고 텍스트 이어붙이기
          if (data.responseData && data.responseData.translatedText) {
            finalTranslatedText += data.responseData.translatedText + ' ';
          }
        }

        // 3. 하나로 합쳐진 최종 번역본을 State에 저장
        setTranslatedText(finalTranslatedText);
      } catch (error) {
        console.error("번역 실패:", error);
        setTranslatedText("번역을 불러오는 데 실패했습니다.");
      } finally {
        setIsTranslating(false);
      }
    }
    
    // 모드 상태 뒤집기 (true <-> false) (한글 <-> 영어)
    setIsKorean(!isKorean);
  };

  return (
    <div className="apod-container" key={url} // key 값이 바뀌면 React가 컴포넌트를 완전히 새로 생성. 날짜 바뀌면 url도 바뀌므로 → 애니메이션이 처음부터 재실행 
    >

    {/* 1. 제목 및 구분선 (CSS h2 속성에 border-bottom이 있음) */}
    <div className="apod-header">
        <h2>{isKorean ? translatedTitle : title}</h2>
      </div>
      
    {/* 2. 우주 사진 */}
    <div className="apod-visual">
        {/* 사진 대신 유튜브 영상이 올 때를 대비한 방어 코드 */}
        {mediaType === 'video' ? (
          <iframe src={url} title={title} frameBorder="0" allowFullScreen></iframe>
        ) : (
          <img src={url} alt={title} />
        )}
    </div>

    {/* 3. 설명글 
    : 삼항 연산자를 이용한 조건부 렌더링 
    번역 중이면 로딩 문구, 아니면 선택된 언어의 텍스트 보여주기 (번역중 / 한국어 / 영어) */}
    <div className="explanation">
        {isTranslating ? (
          <span className="translating-text"> 해석 중... </span>
        ) : isKorean ? (
          <p>{translatedText}</p>
        ) : (
          <p>{explanation}</p>
        )}
      </div>

    {/* 4. 번역 스위치 버튼 */}
    <div className="apod-actions">
        <button onClick={handleTranslateToggle} className="translate-toggle" disabled={isTranslating} // 번역 중일 때 버튼 비활성화
        >
          {isTranslating ? '해석 중... ' : isKorean ? '🇺🇸 영문으로 보기' : '🇰🇷 한글로 보기'}
        </button>
    </div>

    </div>
  );
}

export default ApodDisplay;
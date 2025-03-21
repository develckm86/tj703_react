import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' //글로벌 스타일(배경,폰트 ..)
import App from './App.jsx'
/*
*StrictMode
*  1) React가 최신문법으로 작성되었는지 검사
*  2) 컴포넌트 함수가 외부 상태나 변수를 참조하지 않는지 검사 (순수함수)
*  3) 불필요한 렌더링(브라우저에 컴포넌트를 출력) 감지
*  4) 컴포넌트가 삭제될때 useEffect의 클린업을 감지
* */
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)

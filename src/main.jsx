import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' //글로벌 스타일(배경,폰트 ..)
import App from './App.jsx'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
/*
*StrictMode
*  1) React가 최신문법으로 작성되었는지 검사
*  2) 컴포넌트 함수가 외부 상태나 변수를 참조하지 않는지 검사 (순수함수)
*  3) 불필요한 렌더링(브라우저에 컴포넌트를 출력) 감지
*  4) 컴포넌트가 삭제될때 useEffect의 클린업을 감지
*  5) 검사때문에 컴포넌트를 2번 렌더링 할 수도 있다.
* */
const queryClient=new QueryClient();
//Provider : 자식 컴포넌트에 props를 전달
//QueryClient : 캐싱(메모리에 데이터 저장)된 데이터 관리
//QueryClientProvider : 캐싱된 데이터를 자식 컴포넌트에 전달
//=> 한번 조회 했던 데이터를 다른 컴포넌트에 전달해줄 수 있다.
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
)

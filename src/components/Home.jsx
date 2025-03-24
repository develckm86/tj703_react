export default function Home(){
    return (
        <>
            <h2>홈입니다!!</h2>
            <hr/>
            <h3>리액트는 SPA(Single Page Application)입니다.</h3>
            <ul>
                <li>SPA : 새로운 페이지를 불러오지 않고 화면 일부만 바꿔서 보여줌</li>
                <li>마치 네이티브 앱처럼 화면전화이 자연스럽습니다.</li>
                <li>CSR : SPA 를 구현하기 위해서는 클라이언트 사이드 렌더링을 이용해야합니다.</li>
            </ul>
            <h3>전통적인 웹 사이트(웹 앱)와 SPA의 차이점</h3>
            <ul>
                <li>전통적인 웹은 각 url이 개별 html 페이지를 의미합니다.(resource : url = 1:1) 동기식 통신</li>
                <li>하지만 SPA 는 하개의 html 에서 화면을 변경합니다.</li>
                <li>때문에 새로고침하거나 직집 url을 입력해도 원하는 화면이 나오지 않을 수 있습니다.(단점)</li>
            </ul>
            <h3>리액트 라운터</h3>
            <ul>
                <li>SPA 인 리액트에서 url로 컴포넌트를 렌더링할 수 있습니다.</li>
                <li>페이지는 한개이지만 마치 여러 페이지가 있는 것 처럼 동작할 수 있습니다.</li>
                <li>BrowserRouter 안에 Routes 를 정의하고 Route 로 특정 url일 때 렌더링 할 컴포넌트를 정의  </li>
                <li>BrowserRouter 안에 Lint.to(href=x) 로 url을 바꾸면 화면전환 없이 컴포넌트를 렌더링합니다.</li>
            </ul>
        </>
    )
}
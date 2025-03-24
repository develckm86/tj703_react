
import './App.css'
import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import L01JSX from "./components/L01JSX.jsx";
import L02Props from "./components/L02Props.jsx"; //컴포넌트와 관련된 스타일


function App() {
  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/study/L01JSX">l01 jsx</Link>
                </li>
                <li>
                    <Link to="/study/L02Props">l02 props</Link>
                </li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/study">
                <Route path="L01JSX" element={<L01JSX></L01JSX>}/>
                <Route path="L02Props" element={<L02Props></L02Props>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
//컴포넌트는 매개변수로 무조건 object를 받는다.
//let {title}= {title:"경민};
//title == props(properties) : 부모 컴포넌트(App)가 전달하는 값으로 prpos를 기반으로 컴포넌트를 렌더링합니다.
// props.children : 부모 컴포넌트가 전달한 JSX
function CustomUl({title,children}) {
    //컴포넌트는 1개의 jsx를 반환
    //<></>==<React.Fragment> : 실제로 구현되지 않는 jsx
    return (
       <>
            <h2>{title}</h2>
            <ul>
                <li>npm run dev : 리액트를 개발자 모드로 실행(HOT reload)</li>
                <li>npm run build : 리액트로 작성된 프로젝트를 배포(컴파일 후 압축)</li>
                <li>npm run preview : 배포한 프로젝트를 실행</li>
                <li>npm run lint : 프로젝트의 코드 스타일과 문법 검사</li>
                {children}
            </ul>
       </>
    )
}


export default App

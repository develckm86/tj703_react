
import './App.css'
import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import L01JSX from "./components/L01JSX.jsx";
import L02Props from "./components/L02Props.jsx";
import L03State from "./components/L03State.jsx";
import L04Counter from "./components/L04Counter.jsx";
import L05Input from "./components/L05Input.jsx";
import L06ToDos from "./components/L06ToDos.jsx";
import H01ToDos from "./components/H01ToDos.jsx";
import L07UseEffect from "./components/L07UseEffect.jsx";
import L08UseEffectClock from "./components/L08UseEffectClock.jsx";
import H02Clock from "./components/H02Clock.jsx";
import L09FetchApi from "./components/L09FetchApi.jsx"; //컴포넌트와 관련된 스타일


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
                <li>
                    <Link to="/study/L03State">l03 컴포넌트의 state</Link>
                </li>
                <li>
                    <Link to="/study/L04Counter">l04 카운터 state</Link>
                </li>
                <li>
                    <Link to="/study/L05Input">l05 input 요소와 state</Link>
                </li>
                <li>
                    <Link to="/study/L06ToDos">l06 할일 목록 만들기</Link>
                </li>
                <li>
                    <Link to="/homework/H01ToDos">h01 할일 목록 과제</Link>
                </li>
                <li>
                    <Link to="/study/L07UseEffect">l07 uesEffect </Link>
                </li>
                <li>
                    <Link to="/study/L08UseEffectClock">l08 uesEffect 시계 </Link>
                </li>
                <li>
                    <Link to="/homework/H02Clock">h02 시계 구현 과제 </Link>
                </li>
                <li>
                    <Link to="/study/L09FetchApi">l09 useEffect 비동기식 통신 </Link>
                </li>
            </ul>
        </nav>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/study">
                <Route path="L01JSX" element={<L01JSX></L01JSX>}/>
                <Route path="L02Props" element={<L02Props></L02Props>}/>
                <Route path="L03State" element={<L03State></L03State>}/>
                <Route path="L04Counter" element={<L04Counter cnt={10}></L04Counter>}/>
                <Route path="L05Input" element={<L05Input></L05Input>}/>
                <Route path="L06ToDos" element={<L06ToDos></L06ToDos>}/>
                <Route path="L07UseEffect" element={<L07UseEffect></L07UseEffect>}/>
                <Route path="L08UseEffectClock" element={<L08UseEffectClock></L08UseEffectClock>}/>
                <Route path="L09FetchApi" element={<L09FetchApi></L09FetchApi>}/>
            </Route>
            <Route path="/homework">
                <Route path="H01ToDos" element={<H01ToDos></H01ToDos>}/>
                <Route path="H02Clock" element={<H02Clock></H02Clock>}/>
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

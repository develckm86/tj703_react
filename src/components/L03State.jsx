import {useState} from "react";

export default function L03State(){
    return (
        <>
            <h2>컴포넌트의 상태 state</h2>
            <hr/>
            <ul>
                <li>hook : user*로 작성된 함수를 hook 이라 부른다.
                    hook 은 리액트에서 제공하는 함수로 함수형 컴포넌트에서만 사용된다.
                </li>
                <li>useSate : 컴포넌트에 state 필드를 생성하고
                    state 의 상태를 변경하는 set 함수를 반환합니다.</li>
                <li>setState : set 함수로 state를 변경하면
                    컴포넌트가 리렌더링 됩니다.</li>
            </ul>
            <hr/>
            <PropsCounter></PropsCounter>
            <hr/>
            <StateCounter></StateCounter>
        </>
    )
}
function StateCounter(){
    let [cnt,setCnt]=useState(0);
    //useState : 컴포넌트에 state 필드를 정의할 수 있는 함수
    //cnt : 컴포넌트에 생성된 state
    //setCnt : cnt state 를 변경하는 함수
    //state 가 변경되면 컴포넌트가 리렌더링 됩니다.
    return (
        <>
            <h3>state 카운터</h3>
            <p>
                {cnt}
                <button onClick={(e)=>{
                    setCnt(cnt+1);
                }}>cnt++</button>
            </p>
        </>
    )
}


function PropsCounter(){
    let cnt = 0;
    console.log(cnt);
    return (
        <>
            <h3>props 카운터</h3>
            <p>
                {cnt}
                <button onClick={(e)=>{
                    cnt++;
                }}>cnt++</button>
            </p>
        </>
    )
}
import {useState} from "react";

export default function L04Counter({cnt}) {
    //useState(매개변수) : 매개변수 초기값=>컴포넌트가 마운트될때만 지정됨
    //컴포넌트의 마운트  : 컴포넌트가 최초로 렌더링되는 시점
    //update : 컴포넌트가 재렌더링될때
    const [count, setCount]=useState(0);
    return(
        <>
            <h2>카운터를 만들어서 state에 대해 알아보자</h2>
            <hr/>
            <p>
                {cnt} :
                <button onClick={
                    (e)=>{
                        cnt++;
                        console.log(cnt)
                    }}>
                    props.cnt++
                </button>
            </p>
            <hr/>
            <p>
                {count} :
                <button onClick={(e)=>{
                    //setCount(count++);
                    setCount(count + 1);
                    console.log(count) //누른즉시 카운트는 증가하지 않는다.
                }}>state.count++</button>
            </p>
            <hr/>
            <Counter/>
        </>
    )
}
function Counter(){

    //const callCountResult=callCount();
    //const [count,setCount]=useState(callCountResult);

    //==const [count,setCount]=useState(callCount());
    //useState 의 초기값으로 함수의 실행을 참조하면
    //컴포넌트가 업데이트될때 마다 함수가 실행된다.
    // (초기값은 마운트될때 한번만 실행되는 것이 맞다.)


    //const [count, setCount]=useState(callCount);
    //useState 의 초기값으로 함수자체를 참조 (함수실행x) 초기에만 함수 실행
    const [count, setCount]=useState(
        ()=>callCount());
    //위 방식과 동일한데 함수를 화살표함수로 하고 반환값으로 함수를 실행

    function callCount(){
        /////계산한 결과를 state의 초기값으로 주고 싶을 때
        console.log("callCount() 호출")
        return -10;
    }


    return (
        <p>
            {count} :
            <button onClick={(e)=>{
                //setCount(count++);
                //state 를 직접 바꾸는 것은 좋은 방법이 아니다.
                //setCount(count + 1);
                //setCount(count + 1);
                //여러번 state를 바꾸기 위해 set을 호출해도
                //모든 set 함수는 바뀌기 전에 state를 참조하기 때문에
                //한번만 바뀐다.
                setCount((prevCount)=>prevCount+1);
                setCount((prevCount)=>prevCount+1);


                console.log(count) //누른즉시 카운트는 증가하지 않는다.
            }}>state.count+2</button>
        </p>
    )
}



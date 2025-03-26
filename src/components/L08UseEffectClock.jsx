import {useState,useEffect,useRef} from "react";

export default function L08UseEffectClock () {
    const [now, setNow] = useState(new Date());
    const intervalRef = useRef(null);
    //let intervalNum=null;
    //useRef : 렌더링되어도 유지되는 데이터로
    // 데이터가 바껴도 렌더링 되지 않는다.
    // (node 개체를 참조할 때, 전역변수 처럼)
    // useRef.current 를 바꾸거나 참조
    //interval==소켓통신
    const clock=()=>{
         intervalRef.current=setInterval(()=>{
            setNow(new Date());
            console.log(intervalRef.current+"인터벌 실행 중..")
        },1000);
    }
    useEffect(()=>{
        clock();
        return ()=>{ //clean up
            //clearInterval : interval을 삭제하는 함수
            clearInterval(intervalRef.current);
        }
    },[]);
    //clock();
    //setNow()호출되면 해당 컴포넌트가 update 되면서
    //다시 clock() 호출 => interval 함수를 한번더 생성
    //2개의  interval 함수가 1초 뒤에 setNow()호출
    //4개 ...
    //...
    return(
        <>
            <h2>useffect 와 타이밍 함수(비동기코드)</h2>
            <hr/>
            <h3>1초마다 실행되는 디지털 시계</h3>
            <p>{now.toLocaleString()}</p>
        </>
    )
}
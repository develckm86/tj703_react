import {useState,useEffect} from "react";

export default function L07UseEffect(){
    const [count,setCount] = useState(0);
    //useEffect(()=>{},[]); :컴포넌트가 마운트 되었을때 1번만 실행
    //useEffect(()=>{
    //   //소켓통신구현
    //   return ()=>{//통신.close() }//cleanup
    // },[]); :컴포넌트가 삭제(Unmount)되었을때 동작
    //useEffect(()=>{},[props,state]);
    // : props나 state가 바뀔때 마다 실행
    //useEffect(()=>{}); :  X 작성이 잘못된 방법
    //컴포넌트의 생명주기(생성,수정,삭제)
    useEffect(()=>{
        init();
        return ()=>{
            console.log("삭제됩니다.!(cleanup 실행)")
        }
    },[]);
    useEffect(() => {
        console.log("마운트+카운트가 바꼈습니다."+count)
    }, [count]); //[] <=읜존성배열, count <= 의존성 변수

    function init(){
        console.log("마운트될때만 실행하는 함수")
    }
    //init()//컴포넌트가 업데이트 될때 마다 실행
    const countHandler = () => {
        setCount(count + 1);
    }
    return(
        <>
            <h2>useEffect 훅으로 컴포넌트가 나타나거나(Mount)
                업데이트 될때 또는 삭제(Unmount)될 때
                특정 작업을 해보자
            </h2>
            <hr/>
            <p>
                {count}
                <button onClick={countHandler}>++</button>
            </p>
        </>
    )
}
import {useEffect, useState} from "react";
const loadToDos=async ()=>{
    await new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },2000)
    })
    try {
        const res=await fetch("/src/data/todos.json");
        //리액트는 잘못된 주소를 호출해도 index.html로 이동
        if(!res.ok) throw Error("통신실패");
        return await res.json()
    }catch(err){
        console.log(err.message)
        throw new Error(err.message);
    }
}

export default function L09FetchApi(){
    const [todos,setTodos]=useState(null);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState(null);
    useEffect(()=>{
        //useEffect의 콜백함수는 async 함수를 사용할 수 없다.
            //const data=await loadToDos();
        loadToDos().then((data)=>{
            setTodos(data);
            setIsLoading(false);
        }).catch((err)=>{
            setError(err);
            setIsLoading(false);
        })

    },[])
    //컴포넌트가 업데이트되는 시점과 fetch가 완료되는 시점이 다르다.(비동기 코드)
    //컴포넌트가 mount => loadToDos() 렌더링완료
    //=>데이터 통신은 렌더링 이후 완료 => setState 로 렌더링 유발
    //=> loadToDos() 실행 => 무한반복
    //loadToDos();
    //왜 데이터 통신은 useEffect와 같이 사용하나요?
    //데이터통신을 하는 모든 함수는 비동기 실행이 되기 때문에
    //렌더링 시점과 통신 완료 시점이 달라서 컴포넌트 렌더링에
    // 문제가 발생할 수 있습니다.
    //

    return (
        <>
            <h2>useEffect로 비동기식 통신(fetch) 구현</h2>
            <p>마운트되었을 때 toDos를 한번 출력</p>
            <hr/>
            <h3>toDos</h3>
            {isLoading && <Loading/>}
            {error && <ErrorComponent msg={error.message}/>}
            <ul>
                { todos && todos.map((todo)=>
                    <li key={todo.id}>
                        {todo.title}&nbsp;
                        {todo.time}&nbsp;
                        <input checked={todo.isDo} type="checkbox"/>
                    </li>
                )}

            </ul>
        </>
    )
}
function Loading(){
    return(
        <p>Loading....</p>
    )
}
function ErrorComponent({msg}){
    return(
        <p style={ {color:"red"} }>{msg}</p>
    )
}
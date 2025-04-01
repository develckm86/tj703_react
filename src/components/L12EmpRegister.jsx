import {useEffect, useRef, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import L12Error from "./L12Error.jsx";
import L12Loading from "./L12Loading.jsx";

async function registerEmp(emp){
    const URL="http://localhost:8888/rest/emp/mutate";
    const res=await fetch(URL,{
        method:"POST",
        body:JSON.stringify(emp),
        headers:{"Content-Type":"application/json"}
    });
    if(!res.ok)throw new Error(res.status+"");
}
async function checkId(empNo){
    await new Promise(resolve=>{
        setTimeout(()=>resolve(),500);
    })
    const URL=`http://localhost:8888/rest/emp/${empNo}/exists`;
    const res=await fetch(URL);
    if(!res.ok)throw new Error(res.status+"");
    const data=await res.text(); //"0" or "1" text
    return Boolean(Number(data));
}


export default function L12EmpRegister(){
    const isMounted = useRef(false);
    const [emp,setEmp]=useState({
        id:"50000",
        firstName:"등록",
        lastName:"테스트",
        birthDate:"1986-05-25",
        hireDate:"2025-05-07",
        gender:"",
    });
    //Debounce : 특정이벤트가 연속적으로 발생할때 마지막 이벤트만
    // 일정 시간 후 실행하는 기법
    //useEffect의 cleanup 을 이용해 구현
    const [idDebounce,setIdDebounce]=useState(null);
    const [idDebounceMsg,setIdDebounceMsg]=useState(null);

    //emp.id 가 입력될때마다 1초 뒤에 setIdDebouce로 idDebouce를 실행
    //만약 emp.id를 1초 안에 연속으로 입력하면 1초 뒤에 실행하는 함수를 지운다.
    //=> emp.id 입력하고 1초를 쉬지 않으면
    // setIdDebounce 가 절대 실행되지 않는다.
    useEffect(()=>{
        setIdDebounceMsg(()=>"입력 중...")
        let num=setTimeout(()=>{
            setIdDebounce(()=>emp.id);
            setIdDebounceMsg(()=>null);
        },1000);
        return () => {
            clearTimeout(num);
        } //cleanup 함수
    },[emp.id])
    //useQuery DQL(SELECT)
    //useMutation DML(DELETE,UPDATE,INSERT)
    const registMutate = useMutation({
        mutationFn: async (mutateEmp)=>registerEmp(mutateEmp),
        onSuccess: ()=>{
            alert("등록성공")
        },
    });
    //useQuery.queryFn  :은 매개변수가 없다.(주의!!)
    //useQuery.enabled(true) : 마운트 되면 바로 조회
    const checkIdQuery=useQuery({
        queryKey:["checkId",emp.id],
        queryFn :async ()=>checkId(emp.id),
        enabled: false, //** 사번을 입력할때만 조회
        staleTime: 1000*60*5,
        cacheTime: 1000*60*10,
        retry: 0
    });
    //마운트되었을때,
    //emp.id가 바꾸다가 1초 멈추면 idDebouce 를 바꿀때 실행
    useEffect(()=>{
        if(!isMounted.current){
            (isMounted.current = true);
            return; //마운트되었을때는 실행하지 않기 위해
        }
        if(idDebounce>0){
            checkIdQuery.refetch();
        }else{
            setIdDebounceMsg(()=>"0보다 큰 수만 입력하세요!");
        }
    },[idDebounce])

    const submitHandler=e=>{
        e.preventDefault();
        registMutate.mutate(emp);
    }
    const inputHandler=e=>{
        const {name,value}=e.target;
        //50 (바뀌기 전에 refetch를 실행)=>51
        //if(name==="id"){checkIdQuery.refetch();}
        setEmp((prevState)=>({
            ...prevState,
            [name]:value
        }));
    }

    return(
        <>
            <h3>사원 등록 폼</h3>
            {registMutate.error && <L12Error error={registMutate.error}/>}
            <form onSubmit={submitHandler}>
                <p><label>사번 : <input onChange={inputHandler} value={emp.id} name="id" type="text"/></label></p>
                {checkIdQuery.isLoading && <L12Loading/>}
                {checkIdQuery.error && <L12Error error={checkIdQuery.error}/>}
                {checkIdQuery.data!=null &&
                    <p style={{color:checkIdQuery.data ?"red":"green"}}>
                        {checkIdQuery.data ?
                            "사용중인 아이디 입니다." :
                            "사용가능한 아이디 입니다."
                        }
                    </p>
                }
                {idDebounceMsg && <p>{idDebounceMsg}</p>}




                <p><label>이름 : <input onChange={inputHandler} value={emp.firstName} name="firstName" type="text"/></label></p>
                <p><label>성씨 : <input onChange={inputHandler} value={emp.lastName} name="lastName" type="text"/></label></p>
                <p><label>생일 : <input onChange={inputHandler} value={emp.birthDate} name="birthDate" type="date"/></label></p>
                <p><label>입사일 : <input onChange={inputHandler} value={emp.hireDate} name="hireDate" type="date"/></label></p>
                <p>성별 :
                    <label>남성 <input onChange={inputHandler} value="M" name="gender" type="radio"/></label>
                    <label>여성 <input onChange={inputHandler} value="F" name="gender" type="radio"/></label>
                </p>
                <p>
                    <button>등록</button>
                </p>
            </form>
            <p style={{marginBottom:"50em"}}> </p>
        </>
    )
}
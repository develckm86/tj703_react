import {useEffect, useRef, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import L12Error from "./L12Error.jsx";

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
    const data=await res.json();
    console.log(data);
    return data;
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
    });
    //마운트되었을때, emp.id가 바꼈을때
    useEffect(()=>{
        if(!isMounted.current){
            (isMounted.current = true);
            return; //마운트되었을때는 실행하지 않기 위해
        }
        checkIdQuery.refetch();
    },[emp.id])

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
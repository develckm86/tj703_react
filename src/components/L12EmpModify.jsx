import {useParams} from "react-router-dom";
import {loadEmp} from "./L12EmpFetch.js";
import {useQuery} from "@tanstack/react-query";
import L12Loading from "./L12Loading.jsx";
import L12Error from "./L12Error.jsx";
import {useEffect, useState} from "react";

export default function L12EmpModify(){
    const {empNo}=useParams();
    const [emp,setEmp]=useState(null);
    //useQuery.data : 조회된 데이터와 컴포넌트를 동기화 하기 위한 state
    //input.state : input의 상태 변화를 동기화 하기 위해 사용
    const{data:empData,isLoading,error}=useQuery({
        queryKey:["emp",empNo],
        queryFn:async ()=>loadEmp(empNo),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*10,
        retry:1,
        enabled: true //컴포넌트가 마운트될 때 조회
    });
    //useEffect(()=>{},[]) :컴포넌트가 마운트 되었을 때
    useEffect(()=>{
        setEmp(empData);
    },[empData]) //컴포넌트가 마운트되고 empData가 수정되었을때
    const inputHandler=(e)=>{
        const {name,value}=e.target;
        setEmp({
                ...emp,
                [name]:value
            });
    }
    const modifyFormSubmitHandler=(e)=>{
        e.preventDefault();
    }
    const removeHandler=()=>{
        console.log(empNo,emp.id,empData.id,"삭제");

    }
    const modifyResetHandler=(e)=>{
        e.preventDefault();
        setEmp(empData); //form data 를 useQuery 의 state로 변경
    }

    return(
        <>
            <h2>사원 수정 양식</h2>
            {isLoading && <L12Loading/>}
            {error && <L12Error error={error}/>}
            {emp &&
                <form onSubmit={modifyFormSubmitHandler}>
                    <p><label>empNo :<input readOnly={true} value={emp.id} type="text"/></label></p>
                    <p><label>firstName :<input onChange={inputHandler} name="firstName" value={emp.firstName} type="text"/></label></p>
                    <p><label>lastName :<input onChange={inputHandler} value={emp.lastName} name="lastName" type="text"/></label></p>
                    <p><label>birthDate :<input onChange={inputHandler} value={emp.birthDate} name="birthDate" type="date"/></label></p>
                    <p><label>hireDate :<input onChange={inputHandler} value={emp.hireDate} name="hireDate" type="date"/></label></p>

                    <p>gender
                        <label>남성 :
                            <input value="M" onChange={inputHandler} checked={emp.gender==="M"} name="gender" type="radio"/>
                        </label>
                        <label>여성 :
                            <input value="F" onChange={inputHandler} checked={emp.gender==="F"} name="gender" type="radio"/>
                        </label>
                    </p>
                    <p>
                        <button type="reset" onClick={modifyResetHandler}>초기화</button> &nbsp;
                        <button type="submit">수정</button> &nbsp;
                        <button type="button" onClick={removeHandler}>삭제</button>
                    </p>
                </form>
            }
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </>
    )
}
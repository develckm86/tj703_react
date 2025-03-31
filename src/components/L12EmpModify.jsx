import {useParams,useNavigate} from "react-router-dom";
import {loadEmp, modifyEmp, removeEmp} from "./L12EmpFetch.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import L12Loading from "./L12Loading.jsx";
import L12Error from "./L12Error.jsx";
import {useEffect, useState} from "react";

//queryClient : 캐싱된 데이터를 보관하는 객체 (JPA EntityManager)
export default function L12EmpModify(){
    const navigate = useNavigate();
    const {empNo}=useParams();
    const [emp,setEmp]=useState(null);
    const queryClient = useQueryClient();
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
    //dml 을 할 때 사용하는 react query (데이터 캐싱이 없다)
    const{mutate}=useMutation({
        mutationFn:async (id)=>await removeEmp(id),
        onSuccess:async (data)=>{
            alert("삭제성공 :"+data);
            //캐싱된 데이터를 삭제
            await queryClient.invalidateQueries({queryKey:["emp",empNo]})
            await queryClient.invalidateQueries({queryKey:["empPage"]})
            navigate("/crud/emp");
        },
        onError:(error)=>{
            alert("삭제실패 :"+error.message);
        }
    })
    const{ mutate:modifyMutate }=useMutation({
        mutationFn : async (mutateEmp)=>await modifyEmp(mutateEmp),
        onSuccess: async ()=>{
            alert("수정성공");
            await queryClient.invalidateQueries({queryKey:["emp",empNo]});
            navigate(`/crud/${empNo}/emp`);
        },
        onError:(error)=>{
            // 415 (Unsupported Media Type) json=>dto파싱 하면서 생기는 오류
            // "1986-05-25"=>LocalDate
            alert("수정실패 :"+error.message);
        }
    })
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
        console.log(emp)
        modifyMutate(emp);

    }
    const removeHandler=()=>{
        mutate(emp.id); //삭제
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
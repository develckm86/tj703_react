import {useParams} from "react-router-dom";
import {loadEmp} from "./L12EmpFetch.js";
import {useQuery} from "@tanstack/react-query";
import L12Loading from "./L12Loading.jsx";
import L12Error from "./L12Error.jsx";

export default function L12EmpModify(){
    const {empNo}=useParams();
    const{data:emp,isLoading,error}=useQuery({
        queryKey:["emp",empNo],
        queryFn:async ()=>loadEmp(empNo),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*10,
        retry:1,
        enabled: true //컴포넌트가 마운트될 때 조회
    });
    return(
        <>
            <h2>사원 수정 양식</h2>
            {isLoading && <L12Loading/>}
            {error && <L12Error error={error}/>}
            {emp &&
                <div>
                    <p><label>empNo :<input value={emp.id} type="text"/></label></p>
                    <p><label>firstName :<input value={emp.firstName} type="text"/></label></p>
                    <p><label>lastName :<input value={emp.lastName} type="text"/></label></p>
                    <p><label>birthDate :<input value={emp.birthDate} type="date"/></label></p>
                    <p><label>hireDate :<input value={emp.hireDate} type="date"/></label></p>
                    <p>gender
                        <label>남성 :
                            <input value="M" checked={emp.gender==="M"} name="gender" type="radio"/>
                        </label>
                        <label>여성 :
                            <input value="F" checked={emp.gender==="F"} name="gender" type="radio"/>
                        </label>
                    </p>
                </div>
            }
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </>
    )
}
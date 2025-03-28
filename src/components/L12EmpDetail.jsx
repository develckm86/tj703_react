import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import L12Loading from "./L12Loading.jsx";
import L12Error from "./L12Error.jsx";

async function loadEmp(empNo){
    const URL=`http://localhost:8888/rest/emp/${empNo}/read`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error(res.status+"");
    const data = await res.json();
    console.log(data);
    return data;
}
export default function L12EmpDetail() {
    //path variable => useParams
    //queryString  => useSearchParams
    const {empNo}=useParams();
    const {data:emp,isLoading,error}=useQuery({
        queryKey: ["emp",empNo],
        queryFn: async ()=>await loadEmp(empNo),
        staleTime: 1000*60*5,
        cacheTime: 1000*60*10,
        retry: 1
    });
    return (
        <>
            <h3>사원 상세</h3>
            <p>
                 <Link to={-1}>이전으로</Link>
            </p>
            {isLoading && <L12Loading/>}
            {error && <L12Error error={error}/>}
            {emp &&
                <div>
                    <p>사번 : {emp.id}</p>
                    <p>이름 : {emp.firstName}</p>
                    <p>성씨 : {emp.lastName}</p>
                    <p>성별 : {emp.gender}</p>
                    <p>생일 : {emp.birthDate}</p>
                    <p>입사 : {emp.hireDate}</p>
                    <p>
                        <Link to={`/crud/emp/${emp.id}/modify`}>수정 페이지로</Link>
                    </p>
                </div>
            }
        </>
    )
}
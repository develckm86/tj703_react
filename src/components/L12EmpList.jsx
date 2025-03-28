import {useQuery} from "@tanstack/react-query";
import L12Loading from "./L12Loading.jsx";
import L12Error from "./L12Error.jsx";
import {Link, useSearchParams, useNavigate} from "react-router-dom";
import L12PageNav from "./L12PageNav.jsx";

async function loadEmps(page,size){
    await new Promise((res)=>{setTimeout(()=>{res()},2000)})
    const URL=`http://localhost:8888/rest/emp/read?page=${page}&size=${size}`;
    const res=await fetch(URL);
    if(!res.ok) throw new Error(res.status+"");
    const data= await res.json();
    console.log(data);
    return data;
}
export default function L12EmpList(){
    const[searchParams,setSearchParmas]=useSearchParams();
    const navigate = useNavigate();
    const page=searchParams.get("page") || 1; //null 일때 1대입
    const size=searchParams.get("size") || 20;
    const {data:empPage,isLoading,error}=useQuery({
        queryKey:["empPage",page,size],
        queryFn:async ()=>loadEmps(page,size),
        staleTime: 1000*60*5,
        cachedTime:1000*60*10,
        retry: 1
    })
    const sizeHandler=(e)=>{
        const size=e.target.value;
        console.log(size);
        //Router.useNavigate => -1 :이전 페이지, url:해당페이지
        navigate("?page=1&size="+size);
    }
    return(
        <>
            <h3>사원 리스트</h3>
            {isLoading && <L12Loading/>}
            {error && <L12Error error={error}/>}
            <p>
                <label>
                    페이지 사이즈&nbsp; : &nbsp;
                    <select onChange={sizeHandler}>
                        <option>선택</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                    </select>
                </label>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>사번</th>
                        <th>이름</th>
                        <th>성씨</th>
                        <th>성별</th>
                        <th>생일</th>
                        <th>상세</th>
                    </tr>
                </thead>
                <tbody>
                {empPage && empPage.content.map((emp)=>
                <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.birthDate}</td>
                    <td>
                        <Link to={`/crud/${emp.id}/emp`}>
                            상세
                        </Link>
                    </td>
                </tr>)}
                </tbody>
            </table>

            {empPage &&
                <L12PageNav number={empPage.number} totalPages={empPage.totalPages} size={size}/>}
        </>
    )
}
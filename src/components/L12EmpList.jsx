import {useQuery} from "@tanstack/react-query";

async function loadEmps(){
    const URL="http://localhost:8888/rest/emp/read";
    const res=await fetch(URL);
    if(!res.ok) throw new Error(res.status+"");
    return res.json();
}
export default function L12EmpList(){
    const {data:empPage}=useQuery({
        queryKey:["empPage"],
        queryFn:async ()=>loadEmps(),
    })

    return(
        <>
            <h3>사원 리스트</h3>
            {empPage && empPage.content.toString()}
        </>
    )
}
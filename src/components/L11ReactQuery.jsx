import {useQuery} from "@tanstack/react-query";

export default function L11ReactQuery(){
    const {data:salaries,isLoading,error,refetch}=useQuery({
        queryKey:["salaries"], //캐싱할 데이터의 id
        staleTime: 1000*60*5, //캐싱된 데이터가 유요한 시간
        cacheTime: 1000*60*10, //캐시 메모리에 저장되는 시간
        retry: 1, //조회할때 오류가 발생하면 다시 시도
        queryFn : async ()=>{
            const URL="http://localhost:8888/salary/10010/read.do";
            try {
                await new Promise(resolve => {setTimeout(()=>{resolve();},2000);});
                console.log("호출")
                const res=await fetch(URL);
                if(!res.ok) throw new Error(res.status+"");
                return res.json()
            }catch(error){
                throw new Error(error);
            }
        }
    });
    //staleTime : 해당 기간안에 salaries 를 컴포넌트가 마운트 될때 호출하면
    // 캐싱된 데이터를 전달, 기간이 자나서 salaries를 호출하면 다시 조회
    return (
      <>
          <h2>React Query(TanStack)로 조회한 데이터를 캐싱하자</h2>
          <p><button onClick={()=>{refetch()}}>급여리스트 새로고침</button></p>
          {isLoading && <Loading />}
          {error && <ErrorComponent msg={error.message}/>}
          <table>
              <thead>
              <tr>
                  <th>사번</th>
                  <th>급여</th>
                  <th>fromDate</th>
                  <th>toDate</th>
              </tr>
              </thead>
              <tbody>
              {salaries && salaries.map((s)=>
                  <tr key={s.empNo+"-"+s.fromDate}>
                      <td>{s.empNo}</td>
                      <td>{s.salary}</td>
                      <td>{s.fromDate}</td>
                      <td>{s.toDate}</td>
                  </tr>)}
              </tbody>
          </table>
          <hr/>
          <h3>ReactQuery 설정</h3>
          <ol>
              <li>npm i @tanstack/react-query 설치</li>
              <li>main.jsx 에 QueryClient 생성 후 Provider 작성</li>
          </ol>
      </>  
    );
}
function Loading(){
    return(<p>Loading...</p>)
}
function ErrorComponent({msg}){
    return(<p style={{color:"red"}}>{msg}</p>)
}



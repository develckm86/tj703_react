import {useEffect, useState} from "react";

export default function L10SalaryFetch() {
    // http://localhost:5173/study/L10SalaryFetch
    // http://localhost:8888/salary/10001/read.do
    //Same-Origin Policy 정책을 위반 CORS(Cross Origin Resource Share)
    //예) 카카오 -> 네이버리스소 (위반)
    //스프링에서(localhost:8888) 다른 서버에서
    // 요청이 오는 것을 막아서 발생하는 오류
    const [salaries, setSalaries] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        (async ()=>{
            try {
                await new Promise(resolve=>{
                    setTimeout(()=>{
                        resolve();
                    },2000)
                })
                const res=await fetch(" http://localhost:8888/salary/10001/read.do")
                if(!res.ok) throw new Error(res.status);
                const data=await res.json();
                setSalaries(data);
            } catch (e) {
                console.log(e)
                setError(e);
            }finally{ //오류가 발생하던 하지 않던 무조건 한번 실행
                setIsLoading(false);
            }

        })(); //생성한 함수를 바로 실행
    },[])
    return (
        <>
            <h2>Spring 에서 Employees.salaries 비동기 조회</h2>
            {isLoading && <Loading />}
            {error && <ErrorComponent msg={error.message} />}
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
            <h3>개발 설정 순서(CORS 문제 해결)</h3>
            <ol>
                <li>Spring boot 를 실행 (주소확인)</li>
                <li>react 를 실행하는 vite 의 port 고정 (vite.config.js port:3000) </li>
                <li>Spring 에서 다른 서버의 요청을 허용
                    (Controller 에서 요청이 오는 다른 서버를 지정)
                </li>
            </ol>
            <h3>CORS(Cross-Origin Resource Sharing) 문제 해결</h3>
            <p>웹 브라우저에서 보안을 위해 다른 출처(origin)의 리소스 요청을 제한하는 정책</p>
            <p>리액트 개발 시 핫리로딩을 위해 개발 서버를 실행하는데, API 서버와 출처가 다르면 CORS 정책을 위반하게 됩니다.</p>

            <h4> CORS 발생 원인</h4>
            <ul>
                <li>웹 브라우저는 보안을 위해 <b>Same-Origin Policy</b>를 적용하여, 다른 출처의 요청을 차단합니다.</li>
                <li>리액트 개발 서버(`http://localhost:3000`)에서 스프링 백엔드(`http://localhost:8080`)로 요청 시, 출처(origin)가 다르므로 CORS 정책에 의해 차단됩니다.</li>
            </ul>

            <h4> CORS 해결 방법</h4>
            <ul>
                <li>백엔드에서 CORS 설정을 추가하여 허용해야 합니다.</li>
                <li>개별 컨트롤러에서 `@CrossOrigin(origins = "http://localhost:3000")`을 추가합니다.</li>
                <li>전역 설정을 위해 `CorsConfiguration`을 생성하여 모든 요청에 적용할 수도 있습니다.</li>
            </ul>

            <h4> 추가 설정: 리액트 개발 서버의 포트 고정</h4>
            <ul>
                <li>Vite를 사용할 경우, 실행할 때마다 포트가 바뀌는 것을 방지하기 위해 `vite.config.js` 파일을 수정합니다.</li>
                <li>아래와 같이 설정하면 개발 서버 포트가 3000으로 고정됩니다.</li>
            </ul>

        </>
    )
}
function Loading() {
    return (<p>Loading...</p>);
}
function ErrorComponent({msg}) {
    return(
        <p style={{color:"red"}}>{msg}</p>
    )
}

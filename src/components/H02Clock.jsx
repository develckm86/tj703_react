export default function H02Clock(){
    return (
     <>
        <h2>useEffect 로 디지털시계 구현</h2>
         <ul>
             <li>마운트 되었을 때 시계 동작</li>
             <li>삭제되었을 때 interval clean up</li>
             <li>멈춤버튼으로 interval 삭제</li>
             <li>재시작으로 interval 재생성</li>
             <li>동작 중인데 재시작 못하게 구현</li>
         </ul>
     </>
    )
}
export const httpStatusMsg={
    200: "성공",
    201: "저장 성공",
    202: "삭제 성공",
    204: "수정 성공",
    400: "잘못된 요청",
    404: "리소스가 없습니다.",
    409: "이미 리소스가 존재합니다. 저장실패!",
    422: "양식의 데이터를 확인하세요!",
    500: "서버에 문제가 발생했습니다. 다시시도하세요.",
    507: "잘못된 리소스를 참조했습니다. 저장 실패!"
}

export default function L12Error({error}){
    return (
        <p style={{color:"red"}}>{
            error.message>99 ?
                httpStatusMsg[Number(error.message)] :
                error.message
        }</p>
    )
}
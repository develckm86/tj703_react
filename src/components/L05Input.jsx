import {useState} from "react";

export default function L05Input(){
    let idVal="경민";
    const [id,setId]=useState("state경민");
    const [isVisible,setIsVisible]=useState(false);
    return(
        <>
            <h2>input 요소와 state 의 관계를 알아보자</h2>
            <hr/>
            <p>
                <input type="text" value={idVal}
                    onChange={(e)=>{
                        idVal = e.target.value;
                    }}
                />
            </p>
            <p>
                <input type="text" value={id}
                    onChange={(e)=>{
                        setId(e.target.value)
                    }}
                />
            </p>
            {/*컴포넌트를 조건으로 출력하는 예제*/}
            { isVisible && <p>당신이 입력한 아이디는 {id}</p> }
            <p>
                <label htmlFor="isVisiable">활성화</label>
                <input type="checkbox" id="isVisiable"
                    onChange={(e)=>{
                        //setIsVisible(!isVisible);
                        setIsVisible(e.target.checked)
                    }}
                />
            </p>
        </>
    )

}
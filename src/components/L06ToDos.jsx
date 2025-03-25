import {useState} from "react";

function callToDos(){
    return [
        {
            id: 10,
            title : "양치",
            time :"07:00",
            isTodo : false
        }, {
            id: 11,
            title : "출근",
            time :"08:00",
            isTodo : false
        }, {
            id: 12,
            title : "점심",
            time :"13:00",
            isTodo : true
        }
    ];
}
export default function L06ToDos(){
    const [toDos,setToDos]=useState(callToDos);

    function toDoCheckHandler(checked,toDoId){
        console.log(checked,toDoId);
        const newToDos=toDos.map((toDo)=>{
            if(toDo.id===toDoId) toDo.isTodo=checked;
            return toDo;
        });
        setToDos(newToDos);
    }

    return (
        <>
            <h2>할일 목록 만들기 수업</h2>
            <ul>
                {toDos.map((toDo)=>{
                    return (
                        <li key={toDo.id} style={
                          toDo.isTodo ?
                              {textDecoration:'line-through'} :
                              {}
                        }>
                            {toDo.title}
                            &nbsp;{toDo.time}
                            &nbsp;<input type="checkbox"
                                         checked={toDo.isTodo}
                                        onChange={(e)=>{
                                            toDoCheckHandler(e.target.checked,toDo.id)
                                        }}/>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
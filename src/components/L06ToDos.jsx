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
    //let title=""; //변수는 생성된 컴포넌트 내에서 불변데이터=>input x
    //state.toDos : 컴포넌트 내에서는 불변이지만 update 될때 set에 의해 바뀐 데이터를 받는다.
    const [title,setTitle]=useState("퇴근");
    const [id,setId]=useState(13);
    const [time,setTime]=useState("18:20");
    function titleHandler(e){
        setTitle(e.target.value); //이벤트로 input을 바꾼 값
    }
    function timeHandler(e){
        setTime(e.target.value);
    }
    function idHandler(e){
        setId(e.target.value);
    }
    function removeToDo(id){
        const newTodos=toDos.filter((toDo)=>{
            return toDo.id!==id;
        });
        setToDos(newTodos);
    }

    function toDoCheckHandler(checked,toDoId){
        console.log(checked,toDoId);
        const newToDos=toDos.map((toDo)=>{
            if(toDo.id===toDoId) toDo.isTodo=checked;
            return toDo;
        });
        setToDos(newToDos);
    }
    const toDoPostSubmitHandler=(e)=>{
        e.preventDefault();
        // const newToDos=[
        //     ...toDos,
        //     { "title": title, "id":id, "time":time}
        // ];
        const newToDos=toDos.slice();
        newToDos.push({ "title": title, "id":id, "time":time});
        //Array.sort : 기존 배열을 변경하기 때문에 꼭 배열을 복사해야한다.!
        newToDos.sort((toDo1,toDo2)=>{
            return toDo1.time.localeCompare(toDo2.time);
        })
        setToDos(newToDos)
        //state는 update되면서 데이트가 바뀌지 컴포넌트 내에서는 불변이다.
        //push=> list 를 바꾸는 함수기 때문에 동작하지 않는다.
        // toDos.push({ "title": title, "id":id, "time":time})
        // setToDos(toDos)
    }

    return (
        <>
            <h2>할일 목록 만들기 수업</h2>

            <form onSubmit={toDoPostSubmitHandler}>
                <h3>할일 목록 등록</h3>

                <p><label>id<input type="number" onChange={idHandler} value={id}/></label></p>
                <p><label>title<input type="text" onChange={titleHandler} value={title}/></label></p>
                <p><label>time<input type="time" onChange={timeHandler} value={time}/></label></p>
                <p>
                    <button type="submit">등록</button>
                </p>
            </form>
            <ul>
                {toDos.map((toDo)=>{
                    return (
                        <li key={toDo.id} style={
                          toDo.isTodo ?
                              {textDecoration:'line-through'} :
                              {}
                        }>
                            {toDo.title}&nbsp;
                            {toDo.time}&nbsp;
                            <input type="checkbox"
                                   checked={toDo.isTodo}
                                   onChange={(e)=>{
                                       toDoCheckHandler(e.target.checked,toDo.id)
                            }}/>&nbsp;
                            <button
                                onClick={()=>removeToDo(toDo.id)}
                            >X</button>

                        </li>
                    )
                })}
            </ul>
        </>
    )
}
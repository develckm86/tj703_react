export default function L02Props() {
    return (
        <>
            <h2>컴포넌트의 Properties(Props)</h2>
            <hr/>
            <ul>
                <li>props는 부모컴포넌트가 자식 컴포넌트에게 전달하는 값</li>
                <li>만약 부모가 props를 변경하면
                    자식 컴포넌트는 바뀐 props를 반영하기 위해 리렌더링 됩니다.</li>
                <li>props.children 은 자식에게 전달하는 jsx이고
                    children 은 fragment 가 필요없다.</li>
                <li>자신의 props를 변경해도 리렌더링 되지 않는다. </li>
            </ul>

            <CustomPanel title="안녕안녕!!!"></CustomPanel>
            <hr/>
            <CustomUl list={['수박','딸기','사과']}>
                <>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </>
            </CustomUl>
        </>
    )
}
function CustomUl({list,children}) {
    const lis=[<li>안녕</li>,<li>배열</li>];
    return(
        <ul>
            {/*{children}*/}
            {/*{list}*/}
            {list.map((f)=><li>{f}</li>)}
            <li>...</li>
            {lis}
            <li>...</li>
            {children}
        </ul>
    )
}
function CustomPanel({title}) {
    return(
        <p>{title}</p>
    )
}


export default function L02Props() {
    return (
        <>
            <h2>컴포넌트의 Properties(Props)</h2>
            <hr/>
            <CustomPanel title="안녕안녕!!!"></CustomPanel>
            <hr/>
            <CustomUl list={['수박','딸기','사과']}>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
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


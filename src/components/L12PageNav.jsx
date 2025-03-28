import {Link} from "react-router-dom";

export default function L12PageNav({number,totalPages,size}){

    const pages=[];
    for(let p=(number-2); p<=(number+4); p++){
        if(p>0 && p<=totalPages){
            pages.push(p);
        }
    }
    console.log(pages);

    return (
        <>
            {/*http://localhost:3000/crud/emp?page=3  ?쿼리스트링 == 라이터 searchParam*/}
            <nav>
                <ul>
                    <li>
                        <Link to={`?page=1&size=${size}`}>first</Link>
                    </li>
                    {pages.map((p)=>
                        <li key={p}>
                            <Link to={`?page=${p}&size=${size}`}>{p}</Link>
                        </li>
                    )}
                    <li>
                        <Link to={`?page=${totalPages}&size=${size}`}>last</Link>
                    </li>

                </ul>
            </nav>

        </>
    )
}
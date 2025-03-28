import {Link, Outlet} from "react-router-dom";

export default function L12EmpCRUD(){
    return (
        <>
            <h2>사원 CRUD 구현</h2>
            <nav>
                <ul>
                    <li><Link to={"./emp"}>리스트</Link></li>
                    <li><Link to={"./emp/register"}>사원등록</Link></li>
                </ul>
            </nav>
            <hr/>
            <Outlet></Outlet>
        </>
    )
}







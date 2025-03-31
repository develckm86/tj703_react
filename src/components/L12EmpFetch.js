export async function loadEmp(empNo){
    const URL=`http://localhost:8888/rest/emp/${empNo}/read`;
    const res = await fetch(URL);
    if (!res.ok) throw new Error(res.status+"");
    const data = await res.json();
    console.log(data);
    return data;
}
export async function loadEmps(page,size){
    await new Promise((res)=>{setTimeout(()=>{res()},2000)})
    const URL=`http://localhost:8888/rest/emp/read?page=${page}&size=${size}`;
    const res=await fetch(URL);
    if(!res.ok) throw new Error(res.status+"");
    const data= await res.json();
    console.log(data);
    return data;
}



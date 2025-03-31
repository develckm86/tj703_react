export async function modifyEmp(emp){
    const URL=`http://localhost:8888/rest/emp/mutate`;
    const res=await fetch(URL,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(emp)
    });
    if(!res.ok) throw new Error(res.status+"");
    return res.ok;
}


export async function removeEmp(empNo){
    const URL=`http://localhost:8888/rest/emp/${empNo}/mutate`;
    const res=await fetch(URL,{
        method:"DELETE"
    })
    if(!res.ok) throw new Error(res.status+"");
    return true;
}


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



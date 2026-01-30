import { useEffect, useState } from "react";
const UseEffectWithIssue = () => {
    useEffect(()=>{
        // not causing issue because no commit is happening due to output react dom is same
        // setVal("hello")
        setVal((prev)=> prev + "l");
        
        console.log("useEffect")
    });
    const [val, setVal] = useState("hi")
    return (<>{val}</>)
}

export default UseEffectWithIssue;
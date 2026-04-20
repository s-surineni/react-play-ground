import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
export default function ProgressBar2() {
    const [progressBars, setProgressBars] = useState([]);
    return (<>
    <button onClick={()=>(setProgressBars([...progressBars, ProgressBar]))}>Add</button>
        {progressBars.map((progressBar, index) => (
            <ProgressBar />))}
    </>)
}
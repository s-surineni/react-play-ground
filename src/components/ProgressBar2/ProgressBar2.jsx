import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
export default function ProgressBar2() {
    const [progressBars, setProgressBars] = useState([]);
    const addProgressBar = () => {
        setProgressBars([...progressBars, ProgressBar]);
    }
    return (<>
    <button onClick={addProgressBar}>Add</button>
        {progressBars.map((progressBar, index) => (
            <ProgressBar />))}
    </>)
}
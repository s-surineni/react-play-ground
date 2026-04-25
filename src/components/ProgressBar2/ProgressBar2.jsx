import { useState } from "react";
import ProgressBar3 from "../ProgressBar3/ProgressBar3";
import styles from "./ProgressBar2.module.css";

export default function ProgressBar2() {
    const [progressBars, setProgressBars] = useState([]);
    function addProgressBar() {
        setProgressBars([...progressBars, ProgressBar3]);
        // fillProgressBar(progressBars.length - 1);
    }

    return (<>
        <button onClick={addProgressBar}>Add</button>
        <div className={styles["progress-bars-container"]}>
            {progressBars.map((progressBar, index) => (
                <ProgressBar3 key={index} />))}
        </div>
    </>)
}
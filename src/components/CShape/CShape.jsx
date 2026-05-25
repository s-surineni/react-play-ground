// https://medium.com/womenintechnology/commonly-asked-machine-coding-problem-in-front-end-interviews-e16042ab1e10
// https://www.youtube.com/watch?v=sAF7Km_znjA
import styles from './CShape.module.css'
function Light() {
    return <div className={styles.light}></div>
}
export default function CShape() {
    const lightSetup = [[1, 1, 1],
    [1, 0, 1], 
    [1, 1, 1]]
    const convertIdx = (rIdx, cIdx, len) => {
        return (rIdx * len) + cIdx
    }
    return (<div className={styles["light-grid"]}>
        { lightSetup.map((row, rowIdx) => {
            return row.map((cellVal, colIdx) => {
                return cellVal? <Light key={convertIdx(rowIdx, colIdx, lightSetup.length)}
                className={styles.light}>{convertIdx(rowIdx, colIdx, lightSetup.length)}</Light>: <span></span>
            })
        })}
    </div>);
}   
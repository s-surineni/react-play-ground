import styles from "./TempPlayground.module.css"
export default function TempPlayground() {
  return (<>
    <ProgressBar fillPercentage={50} />
  </>)
}

function ProgressBar({ fillPercentage }) {
  return (
    <div className={styles["progress-bar"]}>
      <div className={styles["progress-fill"]} style={{
        width: `${fillPercentage}%`
      }}>{fillPercentage}%</div>
    </div>
  )
}
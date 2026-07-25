import styles from './TempPlayground.module.css';
const TempPlayground = () => {
  return <><ProgressBar percent={30} />
  <ProgressBar />
  </>
}

const ProgressBar = ({percent=20}) => {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className={styles['progress-bar']}>
      <div className={styles['progress-bar-fill']}
      style={{width: `${clamped}%`}}> {`${clamped}%`} </div>
    </div>
  )
}
export default TempPlayground;
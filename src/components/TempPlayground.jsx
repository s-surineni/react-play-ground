import styles from './TempPlayground.module.css'
import {useState} from 'react'
const lightConfig = [[1, 1, 1],
[1, 0, 1],
[1, 1, 1]]
export default function TempPlayground() {
  const [order, setOrder] = useState([])
  const handleClick = (key) => {
    setOrder([...order, key])
  }
  return (<div className={styles['light-box']}>{
    lightConfig.map((row, rId) => {
      return row.map((lightVal, cId) => {
        const key = `${rId}-${cId}`
        return <div className={order.includes(key)?`${styles['light']} ${styles['light-activated']}`: `${styles['light']}`}
        onClick={() => handleClick(key)}
        key={key}>{key}</div>
      })
    })}</div>)
}
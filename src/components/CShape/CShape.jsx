// https://medium.com/womenintechnology/commonly-asked-machine-coding-problem-in-front-end-interviews-e16042ab1e10
// https://www.youtube.com/watch?v=sAF7Km_znjA
import { current } from '@reduxjs/toolkit'
import styles from './CShape.module.css'
import { useState } from 'react'
function Light({onClick, filled}) {
    return <div className={filled?`${styles.light} ${styles['light-on']}`: `${styles.light}`}
    onClick={onClick}></div>
}
export default function CShape() {
    const lightSetup = [[1, 1, 1],
    [1, 0, 1], 
    [1, 1, 1]]
    const lightsLen = lightSetup.reduce((total, row) => {
        return total + row.reduce((rowCount, val) => {
            return val + rowCount
        }, 0)
    }, 0)
    console.log('lightslen', lightsLen)
    const convertIdx = (rIdx, cIdx) => {
        return `${rIdx}-${cIdx}`
    }
    const [order, setOrder] = useState([]);
    const switchOn = (lightId) => {
        const newOrder = [...order, lightId];
        console.log('newOrder', newOrder)
        setOrder(newOrder)
        if (newOrder.length === lightsLen) {
            switchOffLights();
        }
    }

    const switchOffLights =() => {
        const timer = setInterval(()=> {
            setOrder(prev => {
                if (prev.length === 0) {
                    clearInterval(timer)
                    return [];
                } else {
                    const current = [...prev]
                    current.pop()
                    return current
                }
            })
        }, 2000)
    }
    return (<div className={styles["light-grid"]}>
        { lightSetup.map((row, rowIdx) => {
            return row.map((cellVal, colIdx) => {
                const lightId = convertIdx(rowIdx, colIdx);
                return cellVal? <Light onClick={() => switchOn(lightId)}
                filled={order.includes(lightId)}
                key={lightId}
                className={styles.light}></Light>: <span key={lightId}></span>
            })
        })}
    </div>);
}   
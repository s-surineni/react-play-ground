import styles from './ProgressBar3.module.css'
import { useEffect, useState } from 'react'

export default function ProgressBar3() {
    const [startTransition, setStartTransition] = useState(false)
    useEffect(() => {
        if (startTransition) {
            return
        }
        setStartTransition(true)
    }, [])
    return (
        <div>
            <div className={styles['progress-bar']}>
                <div className={startTransition ? `${styles['progress-fill']} ${styles['progress-filled']}` : styles['progress-fill']}>
                </div>
            </div>
        </div>
    );
}

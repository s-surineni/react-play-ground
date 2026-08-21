import { useState } from 'react'
import style from './TempPlayground.module.css'

const ROWS = 6
const COLS = 6

function TempPlayground() {
  const [board, setBoard] = useState(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  )
  const [player, setPlayer] = useState('red')

  return (
    <div className={style.board}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <div key={`${r}-${c}`} className={style.cell} />
        ))
      )}
    </div>
  )
}

export default TempPlayground
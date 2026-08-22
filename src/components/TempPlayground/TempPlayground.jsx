import { useState } from 'react'
import style from './TempPlayground.module.css'

const ROWS = 6
const COLS = 6

function TempPlayground() {
  const [board, setBoard] = useState(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  )
  const [player, setPlayer] = useState('red')

  const handleCellClick = (r, c) => {
    if (board[r][c]) return

    const nextBoard = board.map((row) => [...row])
    nextBoard[r][c] = player
    setBoard(nextBoard)
    setPlayer(player === 'red' ? 'blue' : 'red')
  }

  return (
    <div className={style.board}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`${style.cell} ${cell ? style[cell] : ''}`}
            onClick={() => handleCellClick(r, c)}
          />
        ))
      )}
    </div>
  )
}

export default TempPlayground
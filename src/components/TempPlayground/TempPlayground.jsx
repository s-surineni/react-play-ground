import { useState } from 'react'
import style from './TempPlayground.module.css'

const ROWS = 6
const COLS = 6

function TempPlayground() {
  // LEARN: 2D board. fill then map so each row is a new array. Array(ROWS).fill(sameRow) would share one row.
  const [board, setBoard] = useState(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  )
  const [player, setPlayer] = useState('red')

  function findFreeRow(col) {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][col] === null) return r
    }
    return -1
  }

  const handleCellClick = (c) => {
    const rowToMark = findFreeRow(c)
    if (rowToMark === -1) return

    // LEARN: copy the 2D array before writing. Mutating board[r][c] in place does not re-render.
    const nextBoard = board.map((row) => [...row])
    nextBoard[rowToMark][c] = player
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
            // LEARN: Do not extract row/col from the click event or the DOM.
            // LEARN: This arrow function closes over c from map. Row is chosen by gravity, not the clicked cell.
            onClick={() => handleCellClick(c)}
          />
        ))
      )}
    </div>
  )
}

export default TempPlayground
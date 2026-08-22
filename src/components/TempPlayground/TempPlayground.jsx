import { useState } from 'react'
import style from './TempPlayground.module.css'

const ROWS = 6
const COLS = 6

export function findFreeRow(board, col) {
  for (let r = board.length - 1; r >= 0; r--) {
    if (board[r][col] === null) return r
  }
  return -1
}

export function handleCellClick(board, player, col) {
  const rowToMark = findFreeRow(board, col)
  if (rowToMark === -1) return { board, player }

  const nextBoard = board.map((row) => [...row])
  nextBoard[rowToMark][col] = player
  return {
    board: nextBoard,
    player: player === 'red' ? 'blue' : 'red',
  }
}

function TempPlayground() {
  // LEARN: 2D board. fill then map so each row is a new array. Array(ROWS).fill(sameRow) would share one row.
  const [board, setBoard] = useState(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  )
  const [player, setPlayer] = useState('red')

  const onCellClick = (c) => {
    const next = handleCellClick(board, player, c)
    setBoard(next.board)
    setPlayer(next.player)
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
            onClick={() => onCellClick(c)}
          />
        ))
      )}
    </div>
  )
}

export default TempPlayground
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

  // LEARN: Not passing ROWS as an explicit dependency. This helper is nested in the component, so closing over board is the usual style. Pass board (then you don't need ROWS) only if you extract it for reuse or tests.
  function findFreeRow(col) {
    for (let r = board.length - 1; r >= 0; r--) {
      if (board[r][col] === null) return r
    }
    return -1
  }

  function insideBoard(nextR, nextC) {
    return nextR >= 0 && nextR < board.length && nextC >= 0 && nextC < board[0].length;
  }
  function checkWinner(row, col, currPlayer, board) {
    const directions = [[0, 1], [1, 0], [1, 1], [-1, 1],
  [0, -1], [-1, 0], [-1, -1], [1, -1]]
    for (const [dr, dc] of directions) {
      const [nextR, nextC] = [row + dr, col + dc]
      let matches = 1;
      while(insideBoard(nextR, nextC) && board[nextR, nextC] === currPlayer) {
        matches += 1;
        [nextR, nextC] = [row + (dr * matches), row + (dc * matches)]
      }
      if( matches == 4) return true;

    }
    return false
  }

  const handleCellClick = (r, c) => {
    const rowToMark = findFreeRow(c)
    if (rowToMark === -1) return

    // LEARN: copy the 2D array before writing. Mutating board[r][c] in place does not re-render.
    const nextBoard = board.map((row) => [...row])
    nextBoard[rowToMark][c] = player
    if (checkWinner(rowToMark, c, player, nextBoard)) {
      console.log('winner', player);
    }
    setBoard(nextBoard)
    setPlayer(player === 'red' ? 'blue' : 'red')
  }

  return (
    <div className={style.board}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            data-testid={`cell-${r}-${c}`}
            className={`${style.cell} ${cell ? style[cell] : ''}`}
            // LEARN: Do not extract row/col from the click event or the DOM.
            // LEARN: This arrow function closes over c from map. Row is chosen by gravity, not the clicked cell.
            onClick={() => handleCellClick(r, c)}
          />
        ))
      )}
    </div>
  )
}

export default TempPlayground

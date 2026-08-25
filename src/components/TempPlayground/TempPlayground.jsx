import { useState } from 'react'
import style from './TempPlayground.module.css'

const ROWS = 6
const COLS = 7

const createBoard = () =>
  Array(ROWS).fill(null).map(() => Array(COLS).fill(null))

function TempPlayground() {
  // LEARN: 2D board. fill then map so each row is a new array. Array(ROWS).fill(sameRow) would share one row.
  const [board, setBoard] = useState(createBoard)
  const [player, setPlayer] = useState('red')
  const [winner, setWinner] = useState(null)
  const [isDraw, setIsDraw] = useState(false)
  const [winningCells, setWinningCells] = useState([])

  const gameOver = Boolean(winner) || isDraw

  // LEARN: Not passing ROWS as an explicit dependency. This helper is nested in the component, so closing over board is the usual style. Pass board (then you don't need ROWS) only if you extract it for reuse or tests.
  function findFreeRow(col, grid) {
    for (let r = grid.length - 1; r >= 0; r--) {
      if (grid[r][col] === null) return r
    }
    return -1
  }

  function insideBoard(r, c, grid) {
    return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length
  }

  function boardFull(grid) {
    return grid.every((row) => row.every((cell) => cell !== null))
  }

  function checkWinner(row, col, currPlayer, grid) {
    // LEARN: Count both ways on each axis. Four in one ray misses a win when the new disc is in the middle of the line.
    const axes = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ]

    const walk = (dr, dc) => {
      const cells = []
      let r = row + dr
      let c = col + dc
      while (insideBoard(r, c, grid) && grid[r][c] === currPlayer) {
        cells.push([r, c])
        // LEARN: Advance the cell we are looking at, not a step index.
        // Old: keep matches, then next = [row + dr * matches, col + dc * matches].
        // That uses the same number for "how many in a row" and "how far from origin".
        // Here count only means how many matches. Position is its own state: r, c.
        // Each loop: look at (r, c), then r += dr, c += dc. Same as walking a line on the grid.
        r += dr
        c += dc
      }
      return cells
    }

    for (const [dr, dc] of axes) {
      const cells = [[row, col], ...walk(dr, dc), ...walk(-dr, -dc)]
      if (cells.length >= 4) return cells
    }
    return null
  }

  const handleCellClick = (c) => {
    if (gameOver) return

    const nextBoard = board.map((row) => [...row])
    const rowToMark = findFreeRow(c, nextBoard)
    if (rowToMark === -1) return

    // LEARN: copy the 2D array before writing. Mutating board[r][c] in place does not re-render.
    nextBoard[rowToMark][c] = player
    setBoard(nextBoard)

    const winCells = checkWinner(rowToMark, c, player, nextBoard)
    if (winCells) {
      setWinner(player)
      setWinningCells(winCells)
      return
    }
    if (boardFull(nextBoard)) {
      setIsDraw(true)
      return
    }
    setPlayer(player === 'red' ? 'blue' : 'red')
  }

  const resetGame = () => {
    setBoard(createBoard())
    setPlayer('red')
    setWinner(null)
    setIsDraw(false)
    setWinningCells([])
  }

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw'
      : `${player}'s turn`

  const winningSet = new Set(winningCells.map(([r, c]) => `${r}-${c}`))

  return (
    <div>
      <div data-testid="status">{status}</div>
      <div
        className={style.board}
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              data-testid={`cell-${r}-${c}`}
              aria-label={`Drop in column ${c + 1}`}
              disabled={gameOver || board[0][c] !== null}
              className={`${style.cell} ${cell ? style[cell] : ''} ${
                winningSet.has(`${r}-${c}`) ? style.win : ''
              }`}
              // LEARN: Do not extract row/col from the click event or the DOM.
              // LEARN: This arrow function closes over c from map. Row is chosen by gravity, not the clicked cell.
              onClick={() => handleCellClick(c)}
            />
          ))
        )}
      </div>
      <button type="button" data-testid="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  )
}

export default TempPlayground

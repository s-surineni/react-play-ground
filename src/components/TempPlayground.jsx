import {useState} from 'react'
import styles from './TempPlayground.module.css'
const ROWS = 6;
const COLS = 7;

export default function Connect4() {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)))
  const [winner, setWinner] = useState(false);
  const [redTurn, isRedTurn] = useState(true)
  console.log('board', board)
  const currentPlayer = isRedTurn? 'Red': 'Blue'

  const checkBoardBounds = (rowIdx, colIdx) => {
    if (rowIdx >= 0 && rowIdx < ROWS && colIdx >= 0 && colIdx < COLS) {
      return true;
    } else {
      return false;
    }
  }
  const checkWin = (board, rowIdx, colIdx, currentPlayer) => {
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
    let matches = 0;
    for (const [dr, dc] of directions) {
      if (checkBoardBounds(rowIdx + (dr * (matches + 1)), colIdx + (dc * (matches + 1))) && board[rowIdx][colIdx] == currentPlayer) {
        matches += 1;
      }
    }

  }
  const handleColumnClick = (colIdx) => {
    for (let rowIdx = ROWS - 1; rowIdx >= 0; rowIdx--) {
      if (board[rowIdx][colIdx] === null) {
        const newBoard = board.map(row => [...row])
        newBoard[rowIdx][colIdx] = currentPlayer;
        setBoard(newBoard)
        if (checkWin(newBoard, rowIdx, colIdx, currentPlayer)) {
          setWinner(currentPlayer)
        } else {
          setIsRedTurn(!isRedTurn)
        }
        return
      }
    }

  }
  return (<div className={styles.board}>
    {board.map((row, rowIdx) => (
      row.map((colVal, colIdx) => (
        <div key={`${rowIdx}-${colIdx}`}
        className={styles.cell}
        onClick={()=> handleColumnClick(colIdx)}>
          </div>
      ))
    ))}
  </div>)
}
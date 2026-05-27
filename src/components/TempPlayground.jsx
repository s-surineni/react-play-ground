import styles from './TempPlayground.module.css'
import { useState } from 'react'
function Tile({ handleClick, value }) {
  return <div
  className={value? `${styles.tile} ${styles[value.toLowerCase()]}`: `${styles.tile}`}
    onClick={handleClick}></div>;
}


export default function TempPlayground({ rows = 6, cols = 7 }) {
  const [isCurrentPlayerRed, setIsCurrentPlayerRed] = useState(true)
  const RED = 'Red';
  const BLUE = 'Blue'
  const currentPlayer = isCurrentPlayerRed ? RED : BLUE
  console.log('rows, cols', rows, cols)
  const [board, setBoard] = useState(Array(rows).fill(null).map(() => Array(cols).fill(null)))
  console.log('board', board)
  const findEmptyRow = (cId) => {
    for (let aRow = rows - 1; aRow >= 0; aRow--) {
      if (board[aRow][cId] === null) {
        return aRow;
      }
    }
  }
  const handleClick = (cId) => {
    const emptyRow = findEmptyRow(cId)
    const newBoard = board.map((row) => [...row])
    newBoard[emptyRow][cId] = currentPlayer;
    setBoard(newBoard)
    setIsCurrentPlayerRed(!isCurrentPlayerRed)
    
  }

  return (<div className={styles.board}
    style={{ "gridTemplateColumns": `repeat(${cols}, 30px)` }}
  >
    {
      board.map((row, rId) => {
        return row.map((val, cId) => {
          const key = `${rId - cId}`
          const value = board[rId][cId]
          return <Tile
            value={value}
            handleClick={() => handleClick(cId)}
            key={key} />
        })
      })
    }
  </div>)
}
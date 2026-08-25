// Problem: Build Connect Four.
// 6×7 grid, two players take turns dropping a disc into a column (gravity:
// it occupies the lowest empty cell). First to connect four of their discs
// in a row — horizontally, vertically, or either diagonal — wins. Reset
// returns the board to empty. Block further moves after a win.
import React, { useState } from 'react';
import './Connect42.css';

const ROWS = 6;
const COLS = 7;

const Connect4 = () => {
  // 1. Initialize a clean 6x7 2D Array matrix
  const [board, setBoard] = useState(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  );
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const currentPlayer = isRedTurn ? 'Red' : 'Blue';

  // 2. The Move Handler
  const handleColumnClick = (colIndex) => {
    if (winner) return; // Game over guard

    // Scan from bottom row upwards to find the first empty space
      // LEARN: Pass grid (which snapshot), not ROWS (size is grid.length).
  // setBoard does not update board until the next render. After we write the new disc
  // onto nextBoard, checkWinner / boardFull / insideBoard must read that copy.
  // Closing over board would still see the old grid — the winning four would look like
  // three, and a full board would still look like it has a hole.
  // Bounds and cell values must use the same array. findFreeRow gets nextBoard too so
  // helpers never secretly read a different board than the one we meant.
    for (let rowIndex = ROWS - 1; rowIndex >= 0; rowIndex--) {
      if (board[rowIndex][colIndex] === null) {
        // Create an immutable deep copy of our matrix state
        const newBoard = board.map(row => [...row]);
        newBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(newBoard);

        // Check for victory condition immediately using the fixed slot position
        if (checkWin(newBoard, rowIndex, colIndex, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          setIsRedTurn(!isRedTurn); // Next turn
        }
        return; // Break out, piece successfully dropped
      }
    }
    // If loop finishes, the column is completely full - do nothing
  };
  
/*

  function checkWinner(row, col, currPlayer, board) {
    // LEARN: Count both ways on each axis. Four in one ray misses a win when the new disc is in the middle of the line.
    const axes = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ]

    const countDir = (dr, dc) => {
      let count = 0
      let r = row + dr
      let c = col + dc
      while (insideBoard(r, c) && board[r][c] === currPlayer) {
        count += 1
        // LEARN: Advance the cell we are looking at, not a step index.
        // Old: keep matches, then next = [row + dr * matches, col + dc * matches].
        // That uses the same number for "how many in a row" and "how far from origin".
        // Here count only means how many matches. Position is its own state: r, c.
        // Each loop: look at (r, c), then r += dr, c += dc. Same as walking a line on the grid.
        r += dr
        c += dc
      }
      return count
    }

    for (const [dr, dc] of axes) {
      if (1 + countDir(dr, dc) + countDir(-dr, -dc) >= 4) return true
    }
    return false
  }
*/

  // 3. The Multi-Directional Win Check Algorithm
  const checkWin = (grid, r, c, player) => {
    const directions = [
      { dr: 0, dc: 1 },  // Horizontal (-)
      { dr: 1, dc: 0 },  // Vertical (|)
      { dr: 1, dc: 1 },  // Diagonal Down-Right (\)
      { dr: 1, dc: -1 }  // Diagonal Down-Left (/)
    ];

    for (let { dr, dc } of directions) {
      let count = 1;

      // Count matching segments stretching forward
      let i = 1;
      while (
        r + dr * i >= 0 && r + dr * i < ROWS &&
        c + dc * i >= 0 && c + dc * i < COLS &&
        grid[r + dr * i][c + dc * i] === player
      ) {
        count++;
        i++;
      }

      // Count matching segments stretching backward
      let j = 1;
      while (
        r - dr * j >= 0 && r - dr * j < ROWS &&
        c - dc * j >= 0 && c - dc * j < COLS &&
        grid[r - dr * j][c - dc * j] === player
      ) {
        count++;
        j++;
      }

      if (count >= 4) return true; // Found a matching sequence of 4
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setIsRedTurn(true);
    setWinner(null);
  };

  return (
    <div className="game-container">
      <div className="status-text">
        {winner ? `🏆 Winner: ${winner}! 🎉` : `Current Player: ${currentPlayer}`}
      </div>

      <div className="board">
        {board.map((row, rIdx) =>
          row.map((cellValue, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`cell ${cellValue ? cellValue.toLowerCase() : ''}`}
              onClick={() => handleColumnClick(cIdx)}
            />
          ))
        )}
      </div>

      <button className="reset-btn" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Connect4;
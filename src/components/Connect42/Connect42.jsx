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
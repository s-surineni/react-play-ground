import {useMemo, useState} from 'react'

export default function Connect4() {
  // Standard Connect 4 board: 6 rows x 7 columns
  const ROWS = 6;
  const COLS = 7;
  const RED = "RED";
  const BLUE = "BLUE";

  // Win lines: horizontal, vertical, and both diagonals
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  // Empty board: each cell is null until a disc is dropped
  const createBoard = () =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  const [board, setBoard] = useState(createBoard);
  const [currentPlayer, setCurrentPlayer] = useState(RED);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  const boardFull = (nextBoard) =>
    nextBoard.every((row) => row.every((cell) => cell !== null));

  const inBounds = (r, c) =>
    r >= 0 && r < ROWS && c >= 0 && c < COLS;

  // Gravity: discs fall to the lowest empty row in a column
  const findEmptyRow = (col, nextBoard) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!nextBoard[row][col]) return row;
    }
    return -1;
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
  // From the last drop, walk both ways along each direction and look for 4 in a row
  const checkWinner = (row, col, nextBoard, player) => {
    for (const [dr, dc] of DIRECTIONS) {
      let count = 1;
      const cells = [[row, col]];

      for (const dir of [-1, 1]) {
        let r = row + dr * dir;
        let c = col + dc * dir;

        while (inBounds(r, c) && nextBoard[r][c] === player) {
          count++;
          cells.push([r, c]);
          r += dr * dir;
          c += dc * dir;
        }
      }

      if (count >= 4) {
        return cells;
      }
    }
    return null;
  };

  const handleDrop = (col) => {
    if (winner || isDraw) return;

    const nextBoard = board.map((r) => [...r]);
    const row = findEmptyRow(col, nextBoard);

    // Column is already full
    if (row === -1) return;

    nextBoard[row][col] = currentPlayer;

    const winCells = checkWinner(
      row,
      col,
      nextBoard,
      currentPlayer
    );

    setBoard(nextBoard);

    if (winCells) {
      setWinner(currentPlayer);
      setWinningCells(winCells);
      return;
    }

    if (boardFull(nextBoard)) {
      setIsDraw(true);
      return;
    }

    setCurrentPlayer((p) => (p === RED ? BLUE : RED));
  };

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer(RED);
    setWinner(null);
    setWinningCells([]);
    setIsDraw(false);
  };

  // Top cell occupied means no more drops in that column
  const isColumnFull = (col) => board[0][col] !== null;

  // Fast lookup of winning cells for highlighting
  const winningSet = useMemo(
    () => new Set(winningCells.map(([r, c]) => `${r}-${c}`)),
    [winningCells]
  );

  const currentPlayerName = currentPlayer === RED ? "Red" : "Blue";

  const getCellColor = (value) => {
    if (value === RED) return "bg-red-500";
    if (value === BLUE) return "bg-blue-500";
    return "bg-white";
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-fit">
        <h1 className="text-3xl font-bold mb-4 text-center">Connect 4</h1>

        <div className="mb-4 text-center text-lg font-medium">
          {winner
            ? `${winner === RED ? "Red" : "Blue"} wins!`
            : isDraw
            ? "Draw!"
            : `${currentPlayerName}'s turn`}
        </div>

        {/* One Drop button per column */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {Array.from({ length: COLS }).map((_, col) => (
            <button
              key={col}
              onClick={() => handleDrop(col)}
              disabled={winner || isDraw || isColumnFull(col)}
              className="rounded-xl bg-slate-800 text-white py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-40"
            >
              Drop
            </button>
          ))}
        </div>

        {/* Board cells; winning discs get a green border */}
        <div className="grid grid-cols-7 gap-2 bg-yellow-400 rounded-2xl p-3">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`;
              const highlighted = winningSet.has(key);

              return (
                <div
                  key={key}
                  className={`w-14 h-14 rounded-full border-4 ${getCellColor(
                    cell
                  )} ${
                    highlighted
                      ? "border-green-500 scale-105"
                      : "border-slate-300"
                  } transition-transform`}
                />
              );
            })
          )}
        </div>

        <button
          onClick={resetGame}
          className="mt-5 w-full rounded-xl bg-slate-900 text-white py-2 font-semibold"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

import {useMemo, useState} from 'react'
export default function Connect4() {
  const ROWS = 6;
  const COLS = 7;
  const RED = "RED";
  const BLUE = "BLUE";
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

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

  const findEmptyRow = (col, nextBoard) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!nextBoard[row][col]) return row;
    }
    return -1;
  };

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

  const isColumnFull = (col) => board[0][col] !== null;

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

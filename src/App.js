import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);

  const winnerInfo = calculateWinner(board);

  useEffect(() => {
    if (winnerInfo) {
      document.body.classList.add("victory-glow");
    } else {
      document.body.classList.remove("victory-glow");
    }
  }, [winnerInfo]);

  const handleClick = (i) => {
    if (board[i] || winnerInfo) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const result = calculateWinner(newBoard);
    if (result) setWinningLine(result.line);
  };

  const renderSquare = (i) => {
    const isWinningSquare = winningLine?.includes(i);
    return (
      <button
        key={i}
        className={`square ${isWinningSquare ? "winning-square" : ""}`}
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </button>
    );
  };

  const status = winnerInfo
    ? `Winner: ${winnerInfo.winner}`
    : board.every(Boolean)
    ? "It's a Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine(null);
  };

  const getLineStyle = () => {
    if (!winningLine) return {};
    const key = winningLine.slice().sort((a, b) => a - b).join("-");
    const lineMap = {
      "0-1-2": { top: 50, left: 0, width: 300, height: 4 },
      "3-4-5": { top: 150, left: 0, width: 300, height: 4 },
      "6-7-8": { top: 250, left: 0, width: 300, height: 4 },
      "0-3-6": { top: 0, left: 50, width: 4, height: 300 },
      "1-4-7": { top: 0, left: 150, width: 4, height: 300 },
      "2-5-8": { top: 0, left: 250, width: 4, height: 300 },
      "0-4-8": {
        top: 0,
        left: 0,
        width: 424,
        height: 4,
        transform: "rotate(45deg)",
        transformOrigin: "top left",
        position: "absolute",
      },
      "2-4-6": {
        top: 0,
        right: 0,
        width: 424,
        height: 4,
        transform: "rotate(-45deg)",
        transformOrigin: "top right",
        position: "absolute",
      },
    };
    return lineMap[key] || {};
  };

  return (
    <div className="app-wrapper">
      <div className="game-container">
        <h1>Tic-Tac-Toe Web Application</h1>
        <p className={`status ${winnerInfo ? "winner-status" : ""}`}>{status}</p>

        <div className="board-container">
          <div className="board">
            {board.map((_, i) => renderSquare(i))}
          </div>
          {winningLine && (
            <div
              className="win-line"
              style={{
                backgroundColor: "black",
                ...getLineStyle(),
                zIndex: 1,
              }}
            ></div>
          )}
        </div>

        <button className="reset-btn" onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
};

export default App;
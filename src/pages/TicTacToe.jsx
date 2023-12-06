import { useState } from "react";
import GameBoard from "../components/GameBoard";
import { TTT_WINLINES } from "../data/constants";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [countClicks, setCountClicks] = useState(0);
  const [selectPlayerVisibility, setSelectPlayerVisibility] = useState("flex");
  let winSquares = Array(9).fill(false);

  const iconX = (
    <svg
      className="iconX"
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      stroke="none"
      viewBox="-5 -5 35 35"
    >
      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
    </svg>
  );
  const iconO = (
    <svg className="iconO" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="105" cy="50" r="20" strokeWidth="10" />
    </svg>
  );

  const iconXSmall = (
    <svg
      className="iconXSmall"
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      stroke="none"
      viewBox="-5 10 35 35"
    >
      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
    </svg>
  );
  const iconOSmall = (
    <svg
      className="iconOSmall"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-5 -4 35 35"
    >
      <circle cx="12" cy="13" r="10" strokeWidth="5" />
    </svg>
  );

  const Square = ({ value, winnerLine, onSquareClick }) => {
    let icon;
    let xClass;
    let oClass;
    if (value === "x") {
      icon = iconX;
      xClass = winnerLine ? "xYellow" : "xWhite";
    } else if (value === "o") {
      icon = iconO;
      oClass = winnerLine ? "oYellow" : "oWhite";
    } else {
      icon = "";
    }

    return (
      <button
        className={[xClass, oClass, "ttt-square"].join(" ")}
        onClick={onSquareClick}
      >
        <span>{icon}</span>
      </button>
    );
  };

  const handleClick = (i) => {
    const nextSquares = squares.slice();
    if (squares[i] || getWinner(squares)) return;
    xIsNext ? (nextSquares[i] = "x") : (nextSquares[i] = "o");
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
    setCountClicks(() => countClicks + 1);
  };

  const handleWinnerLine = (a, b, c) => {
    winSquares = Array(9)
      .fill(false)
      .map((item, i) => {
        if (i === a) return true;
        if (i === b) return true;
        if (i === c) return true;
        return item;
      });
  };

  const getWinner = (squares) => {
    for (let i = 0; i < TTT_WINLINES.length; i++) {
      const [a, b, c] = TTT_WINLINES[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        const [a, b, c] = TTT_WINLINES[i];
        handleWinnerLine(a, b, c);
        return squares[a];
      }
    }
    return null;
  };

  const winner = getWinner(squares);
  let status;
  if (countClicks <= 9 && winner)
    status = "The Winner is: " + (winner === "x" ? "Player X" : "Player O");
  else if (countClicks < 9 && !winner)
    status = "Next Player: " + (xIsNext ? "X" : "O");
  else if (countClicks === 9 && !winner) {
    status = "Its a Tie";
  }

  const handleRadio = (e) => {
    switch (e.target.value) {
      case "x":
        setXIsNext(true);
        console.log("x is clicked");
        break;
      case "o":
        setXIsNext(false);
        console.log("o is clicked");
        break;
      default:
        break;
    }
  };

  const handleRadioSubmit = async (e) => {
    e.preventDefault();
    setSelectPlayerVisibility("none");
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setCountClicks(0);
    setSelectPlayerVisibility("flex");
  };

  return (
    <div className="ttt-container">
      <GameBoard
        status={status}
        headline={
          <p className="headline">
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
            <span className="text-yellow">Tictactoe</span>
            TictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoeTictactoe
          </p>
        }
        handleReset={handleReset}
      >
        <div>
          <div className="board-row">
            <Square
              value={squares[0]}
              winnerLine={winSquares[0]}
              onSquareClick={() => handleClick(0)}
            />
            <hr />
            <Square
              value={squares[1]}
              winnerLine={winSquares[1]}
              onSquareClick={() => handleClick(1)}
            />
            <hr />
            <Square
              value={squares[2]}
              winnerLine={winSquares[2]}
              onSquareClick={() => handleClick(2)}
            />
          </div>
          <hr className="divider" />
          <div className="board-row">
            <Square
              value={squares[3]}
              winnerLine={winSquares[3]}
              onSquareClick={() => handleClick(3)}
            />
            <hr />
            <Square
              value={squares[4]}
              winnerLine={winSquares[4]}
              onSquareClick={() => handleClick(4)}
            />
            <hr />
            <Square
              value={squares[5]}
              winnerLine={winSquares[5]}
              onSquareClick={() => handleClick(5)}
            />
          </div>
          <hr className="divider" />
          <div className="board-row">
            <Square
              value={squares[6]}
              winnerLine={winSquares[6]}
              onSquareClick={() => handleClick(6)}
            />
            <hr />
            <Square
              value={squares[7]}
              winnerLine={winSquares[7]}
              onSquareClick={() => handleClick(7)}
            />
            <hr />
            <Square
              value={squares[8]}
              winnerLine={winSquares[8]}
              onSquareClick={() => handleClick(8)}
            />
          </div>
        </div>
        <div className={["selectPlayer", selectPlayerVisibility].join(" ")}>
          <h3>SELECT PLAYER</h3>
          <form className="ttt-boxed">
            <div className="ttt-radio-button-container">
              <input
                type="radio"
                id="x"
                name="player"
                value="x"
                onClick={handleRadio}
                defaultChecked
              />
              <label htmlFor="x" className="ttt-playerX">
                {iconXSmall}
              </label>
              <input
                type="radio"
                id="o"
                name="player"
                value="o"
                onClick={handleRadio}
              />
              <label htmlFor="o" className="ttt-playerO">
                {iconOSmall}
              </label>
            </div>
            <div className="ttt-submit-button-container">
              <input type="submit" value="SUBMIT" onClick={handleRadioSubmit} />
            </div>
          </form>
        </div>
      </GameBoard>
    </div>
  );
};

export default TicTacToe;

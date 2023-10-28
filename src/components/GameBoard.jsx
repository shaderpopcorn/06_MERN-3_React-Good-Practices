import React from "react";
import "./GameBoard.css";

const GameBoard = ({ children, status, handleReset }) => {
  return (
    <>
      <div className="gameboard-container">
        <div className="gameboard-board">{children}</div>
        <div className="gameboard-reset">
          <span className="statusInfo">{status}</span>
          <button className="resetBtn" onClick={handleReset}>
            RESET GAME
          </button>
        </div>
      </div>
    </>
  );
};

export default GameBoard;

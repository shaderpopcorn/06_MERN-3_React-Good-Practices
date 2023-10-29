import React from "react";
import "./GameBoard.css";

const GameBoard = ({ children, headline, status, handleReset }) => {
  return (
    <div className="container">
      <div className="background">
        <p className="headline-top">{headline}</p>
        <p className="headline-bottom">{headline}</p>
      </div>
      <div className="gameboard-container">
        <div className="gameboard-board">{children}</div>
        <div className="gameboard-reset">
          <span className="statusInfo">{status}</span>
          <button className="resetButton" onClick={handleReset}>
            RESET GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;

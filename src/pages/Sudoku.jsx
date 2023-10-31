import { useState } from "react";
import GameBoard from "../components/GameBoard";
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import "./Sudoku.css";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(() => makepuzzle());
  const [puzzleCopy, setPuzzleCopy] = useState(puzzle);
  const solution = solvepuzzle(puzzle);
  const difficulty = makepuzzle(puzzle, 4);
  const numberPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const [fieldId, setFieldId] = useState(-1);
  const [numberId, setNumberId] = useState(-1);
  const [number, setNumber] = useState(null);
  const [fieldClicked, setFieldClicked] = useState(false);
  const [numberClicked, setNumberClicked] = useState(false);

  const Field = () => {
    const handleButtonFieldClick = (id, field) => {
      if (field !== 0) {
        setFieldId(id);
        setFieldClicked(true);
        setNumberClicked(false);
      }
    };

    return (
      <div className="sdk-container">
        <div className="sdk-puzzle-field-container">
          {puzzle.map((field, i) => (
            <>
              <button
                key={i}
                className="sdk-field"
                // onClick={() => handleFieldClick(i)}
              >
                <span>{field}</span>
              </button>
            </>
          ))}
        </div>
        <div className="sdk-button-field-container">
          {puzzleCopy.map((field, i) => (
            <>
              <button
                key={i + 100}
                className="sdk-field"
                onClick={() => handleButtonFieldClick(i, field)}
              >
                <span>{field}</span>
              </button>
            </>
          ))}
        </div>
        <div className="sdk-fake-field-container">
          {puzzle.map((field, i) => (
            <>
              <div
                key={i + 200}
                className={[
                  "sdk-fake-field",
                  i === fieldId ? "field-yellow" : "field-grey",
                  // fieldClicked ? "visible" : "hidden",
                  // numberClicked ? "hidden" : "visible",
                ].join(" ")}
              >
                {i === fieldId && field === null ? <NumberPad /> : null}
              </div>
            </>
          ))}
        </div>
        <hr className="sdk-divider-h1" />
        <hr className="sdk-divider-h2" />
        <hr className="sdk-divider-v1" />
        <hr className="sdk-divider-v2" />
        {/* <NumberPad /> */}
      </div>
    );
  };

  const NumberPad = () => {
    const handleNumberClick = (e, id, number) => {
      setNumberId(id);
      setNumber(number);
      setFieldClicked(false);
      setNumberClicked(true);
      const newPuzzleCopy = [...puzzleCopy];
      newPuzzleCopy[fieldId] = number;
      setPuzzleCopy(newPuzzleCopy);
      console.log("NumberId: " + id);
      console.log(number);
      console.log(e);
    };
    return (
      <div
        className={[
          "sdk-popup-card",
          fieldClicked ? "visible" : "hidden",
          numberClicked ? "hidden" : "visible",
        ].join(" ")}
      >
        <div className="sdk-number-container">
          {numberPad.map((number, i) => (
            <button
              key={i + 300}
              className={[
                "sdk-number",
                i === numberId ? "field-white" : "field-yellow",
              ].join(" ")}
              onClick={(e) => handleNumberClick(e, i, number)}
            >
              <span>{number}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <GameBoard headline={"SUDOKU"}>
        <Field />
      </GameBoard>
    </>
  );
};

export default Sudoku;

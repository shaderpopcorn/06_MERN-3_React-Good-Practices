import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import "./Sudoku.css";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(() => makepuzzle());
  const [puzzleCopy, setPuzzleCopy] = useState(puzzle);
  const [solution, setSolution] = useState(() => solvepuzzle(puzzle));
  const difficulty = makepuzzle(puzzle, 4);
  const numberPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "R", "", "S"];

  const [fieldId, setFieldId] = useState(-1);
  const [numberId, setNumberId] = useState(-1);
  const [fieldClicked, setFieldClicked] = useState(false);
  const [numberClicked, setNumberClicked] = useState(false);
  const [puzzleRememberCopy, setPuzzleRememberCopy] = useState(
    Array(81).fill([])
  );

  useEffect(() => {
    /* const addOnePuzzle = puzzle.map((puzzle) => {
      if (puzzle !== null) {
        puzzle = puzzle + 1;
        return puzzle;
      }
    });
    setPuzzle(addOnePuzzle); */
    const addOnePuzzleCopy = puzzleCopy.map((puzzle) => {
      if (puzzle !== null) {
        puzzle = puzzle + 1;
        return puzzle;
      }
    });
    setPuzzleCopy(addOnePuzzleCopy);
    console.log(puzzleCopy);
    const addOneSolution = solution.map((solution) => {
      if (solution !== null) {
        solution = solution + 1;
        return solution;
      }
    });
    setSolution(addOneSolution);
    console.log(solution);
  }, []);

  const compareArrays = (a, b) =>
    a.length === b.length && a.every((element, index) => element === b[index]);

  console.log(compareArrays(puzzleCopy, solution));

  let status;
  if (compareArrays(puzzleCopy, solution)) {
    status = "You won!";
  }

  const Field = () => {
    const handleButtonFieldClick = (id, buttonField) => {
      if (buttonField !== 0) {
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
                className={[
                  "sdk-field",
                  field !== null ? "field-yellow" : "field-grey",
                ].join(" ")}
              >
                <span>{field !== null ? field + 1 : null}</span>
              </button>
            </>
          ))}
        </div>
        <div className="sdk-button-field-container">
          {puzzleCopy.map((buttonField, i) => (
            <>
              <button
                key={i + 100}
                className={[
                  "sdk-button-field",
                  puzzle[i] === 0 && "field-yellow",
                ].join(" ")}
                onClick={() => handleButtonFieldClick(i, buttonField)}
              >
                <span>{!puzzle[i] && puzzleCopy[i]}</span>
              </button>
            </>
          ))}
        </div>
        <div className="sdk-fake-field-container">
          {puzzle.map((fakeField, i) => (
            <>
              <div
                key={i + 200}
                className={[
                  "sdk-fake-field",
                  i === fieldId ? "button-field-white" : "button-field-grey",
                ].join(" ")}
              >
                {i === fieldId && fakeField === null ? <NumberPad /> : null}
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
    const handleNumberClick = (id, number) => {
      setNumberId(id);
      setFieldClicked(false);
      setNumberClicked(true);
      const newPuzzleCopy = [...puzzleCopy];
      newPuzzleCopy[fieldId] = Number(number);
      setPuzzleCopy(newPuzzleCopy);
    };
    return (
      <div
        className={[
          "sdk-number-card",
          fieldClicked ? "visible" : "hidden",
          numberClicked ? "hidden" : "visible",
        ].join(" ")}
      >
        <div className="sdk-number-container">
          {numberPad.map((number, i) => (
            <button
              key={i + 300}
              className="sdk-number"
              onClick={(e) => handleNumberClick(i, number)}
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
      <GameBoard status={status} headline={"SUDOKU"}>
        <Field />
      </GameBoard>
    </>
  );
};

export default Sudoku;

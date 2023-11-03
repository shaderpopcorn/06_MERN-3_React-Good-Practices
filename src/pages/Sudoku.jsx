import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import "./Sudoku.css";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(() => makepuzzle());
  const [puzzleCopy, setPuzzleCopy] = useState(puzzle);
  const [solution, setSolution] = useState(() => solvepuzzle(puzzle));
  const difficulty = makepuzzle(puzzle, 4);
  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "R", null, "S"];

  const [fieldId, setFieldId] = useState(-1);
  const [number, setNumber] = useState();
  const [fieldClicked, setFieldClicked] = useState(false);
  const [numberClicked, setNumberClicked] = useState(false);
  const [sClicked, setSClicked] = useState(false);
  const [rClicked, setRClicked] = useState(false);
  const [memo, setMemo] = useState(false);
  const [set, setSet] = useState(false);
  const [remember, setRemember] = useState([]);
  const [rememberArray, setRememberArray] = useState(Array(81).fill(null));

  useEffect(() => {
    const addOnePuzzleCopy = puzzleCopy.map((puzzle) => {
      if (puzzle !== null) {
        puzzle = puzzle + 1;
        return puzzle;
      }
    });
    setPuzzleCopy(addOnePuzzleCopy);
    const addOneSolution = solution.map((solution) => {
      if (solution !== null) {
        solution = solution + 1;
        return solution;
      }
    });
    setSolution(addOneSolution);
  }, []);

  const compareArrays = (a, b) =>
    a.length === b.length && a.every((element, index) => element === b[index]);

  let status;
  if (compareArrays(puzzleCopy, solution)) {
    status = "You won!";
  }

  // console.log(puzzleCopy);
  // console.log(solution);

  const Field = () => {
    const handleButtonFieldClick = (id, buttonField) => {
      setFieldId(id);
      setFieldClicked(true);
      setNumberClicked(false);
      setSClicked(false);
      setRClicked(false);
      console.log("field clicked");
    };

    return (
      <div className="sdk-container">
        <div className="sdk-remember-field-container">
          {rememberArray.map((field, i) => (
            <>
              <button key={i} className={["sdk-remember-field"].join(" ")}>
                <span>{rememberArray[i]}</span>
                <br />
              </button>
            </>
          ))}
        </div>
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
                {i === fieldId ? <NumberPad /> : null}
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

  console.log(puzzleCopy);
  console.log(remember);

  const NumberPad = () => {
    // setFieldClicked(false);
    // setNumberClicked(true);
    const handleNumberClick = (id, num) => {
      if (set) {
        const newPuzzleCopy = [...puzzleCopy];
        newPuzzleCopy[fieldId] = number;
        setPuzzleCopy(newPuzzleCopy);
        setSClicked(true);
      } else if (memo) {
        const newRememberArray = [...rememberArray];
        newRememberArray[fieldId] = remember;
        setRememberArray(newRememberArray);
      }

      if (tick) {
        setNumber(num);
        setRemember([...remember, number]);
      }

      // setFieldClicked(false);
      // setNumberClicked(true);
      // setRClicked(true);
    };
    return (
      <div
        className={[
          "sdk-number-card",
          fieldClicked ? "visible" : "hidden",
          // numberClicked ? "hidden" : "visible",
          // rClicked ? "hidden" : "visible",
          // sClicked ? "hidden" : "visible",
        ].join(" ")}
      >
        <div className="sdk-number-container">
          <button onClick={() => setMemo(true)}>Memo</button>
          <button onClick={() => setSet(true)}>Set</button>
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

import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import "./Sudoku.css";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(() => makepuzzle());
  const [puzzleCopy, setPuzzleCopy] = useState(puzzle);
  const [solution, setSolution] = useState(() => solvepuzzle(puzzle));
  const difficulty = makepuzzle(puzzle, 4);
  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, null];
  const [fieldClicked, setFieldClicked] = useState(false);

  const [fieldId, setFieldId] = useState(-1);
  const [numberId, setNumberId] = useState(-1);
  const [number, setNumber] = useState();

  const [memo, setMemo] = useState(false);
  const [set, setSet] = useState(false);
  const [remember, setRemember] = useState([]);
  const [rememberArray, setRememberArray] = useState(Array(81).fill(null));

  const [selectVisible, setSelectVisible] = useState("flex");
  const [numVisible, setNumVisible] = useState("none");

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
  }, [puzzle]);

  const compareArrays = (a, b) =>
    a.length === b.length && a.every((element, index) => element === b[index]);

  let status;
  if (compareArrays(puzzleCopy, solution)) {
    status = "You won!";
  }

  const handleReset = async () => {
    setPuzzle([]);
    await new Promise((resolve, reject) => {
      resolve(makepuzzle());
    }).then((res) => {
      setPuzzle(res);
      setPuzzleCopy(res);
    });
    setFieldClicked(false);
    setFieldId(-1);
  };

  const Field = () => {
    const handleButtonFieldClick = (id) => {
      setFieldId(id);
      if (id !== fieldId) {
        setFieldClicked(true);
      } else {
        setFieldClicked(!fieldClicked);
      }
      setMemo(false);
      setSet(false);
      setRemember([]);
      setSelectVisible("flex");
      setNumVisible("none");
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
                  "sdk-puzzle-field",
                  puzzle[i] !== null && "field-yellow",
                ].join(" ")}
              >
                <span>{puzzle[i] !== null ? puzzle[i] + 1 : null}</span>
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
                onClick={() => handleButtonFieldClick(i)}
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
                  i === fieldId ? "button-field-white" : "button-field-hidden",
                ].join(" ")}
              >
                {i === fieldId && puzzle[i] === null ? <NumberPad /> : null}
              </div>
            </>
          ))}
        </div>
        <hr className="sdk-divider-h1" />
        <hr className="sdk-divider-h2" />
        <hr className="sdk-divider-v1" />
        <hr className="sdk-divider-v2" />
      </div>
    );
  };

  const NumberPad = () => {
    const handleNumberClick = (id, num) => {
      setNumberId(id);
      setNumber(num);
      if (num !== null) {
        if (remember.length < 4) setRemember([...remember, num]);
      } else {
        setRemember([]);
      }
    };

    const handleConfirmNumber = () => {
      if (set) {
        const newPuzzleCopy = [...puzzleCopy];
        newPuzzleCopy[fieldId] = number;
        setPuzzleCopy(newPuzzleCopy);
        const newRememberArray = [...rememberArray];
        newRememberArray[fieldId] = [];
        setRememberArray(newRememberArray);
      } else if (memo) {
        const newRememberArray = [...rememberArray];
        newRememberArray[fieldId] = remember;
        setRememberArray(newRememberArray);
      }
    };

    return (
      <div
        className={[
          "sdk-number-card",
          fieldClicked ? "visible" : "hidden",
        ].join(" ")}
      >
        <div className={["sdk-button-container", selectVisible].join(" ")}>
          <button
            onClick={() => {
              setMemo(true);
              setNumVisible("flex");
              setSelectVisible("none");
            }}
          >
            Memo
          </button>
          <button
            onClick={() => {
              setSet(true);
              setNumVisible("flex");
              setSelectVisible("none");
            }}
          >
            Set
          </button>
        </div>
        <div className={["sdk-number-container", numVisible].join(" ")}>
          {numberPad.map((number, i) => (
            <button
              key={i + 300}
              className={[
                "sdk-number",
                i === numberId ? "field-yellow" : "field-white",
              ].join(" ")}
              onClick={() => handleNumberClick(i, number)}
            >
              <span>{number}</span>
            </button>
          ))}
          <button
            className="button-back"
            onClick={() => (setNumVisible("none"), setSelectVisible("flex"))}
          >
            ◀
          </button>
          <button
            className="button-confirm"
            onClick={() => handleConfirmNumber()}
          >
            ✔
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <GameBoard
        status={status}
        headline={
          <p className="headline">
            SudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudoku
            <span className="text-yellow">Sudoku</span>
            SudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudoku
            <span className="text-yellow">Sudoku</span>
            SudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudoku
            <span className="text-yellow">Sudoku</span>
            SudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudoku
            <span className="text-yellow">Sudoku</span>
            SudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudoku
            <span className="text-yellow">Sudoku</span>
            SudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudokuSudoku
          </p>
        }
        handleReset={handleReset}
      >
        <Field />
      </GameBoard>
    </>
  );
};

export default Sudoku;

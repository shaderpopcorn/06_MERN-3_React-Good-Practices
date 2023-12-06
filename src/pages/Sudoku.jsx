import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { makepuzzle, solvepuzzle } from "sudoku";
import "./Sudoku.css";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(() => makepuzzle());
  const [difficulty, setDifficulty] = useState([null]);
  const [difficultyCopy, setDifficultyCopy] = useState(difficulty);
  const [solution, setSolution] = useState([]);
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
  const [level, setLevel] = useState("easy");
  const [selectLevelVisibility, setSelectLevelVisibility] = useState("flex");
  const [rememberVisibility, setRememberVisibility] = useState("none");

  const [solutionButtonVisibility, setSolutionButtonVisibility] =
    useState("none");
  const [solutionButtonClicked, setSolutionButtonClicked] = useState(false);

  useEffect(() => {
    const addOneDifficultyCopy = difficultyCopy.map((difficulty) => {
      if (difficulty !== null) {
        difficulty = difficulty + 1;
      } else {
        difficulty = null;
      }
      return difficulty;
    });
    setDifficultyCopy(addOneDifficultyCopy);
    const addOneSolution = solution.map((solution) => {
      if (solution !== null) {
        solution = solution + 1;
        return solution;
      }
    });
    setSolution(addOneSolution);
  }, [difficulty]);

  console.log(difficultyCopy);
  console.log(solution);
  // console.log(remember);
  // console.log(rememberArray);

  const compareArrays = (a, b) =>
    a.length === b.length && a.every((element, index) => element === b[index]);

  console.log(solutionButtonClicked);

  let status;
  if (compareArrays(difficultyCopy, solution)) {
    solutionButtonClicked ? (status = "") : (status = "You won!");
  }

  const handleRadio = (e) => {
    switch (e.target.value) {
      case "easy":
        setLevel(1);
        break;
      case "medium":
        setLevel(2);
        break;
      case "hard":
        setLevel(3);
        break;
      default:
        break;
    }
  };

  const handleRadioSubmit = async (e) => {
    e.preventDefault();
    setDifficulty(() => makepuzzle(puzzle, level));
    setDifficultyCopy(difficulty);
    setSolutionButtonVisibility("flex");

    await new Promise((resolve, reject) => {
      resolve(makepuzzle(puzzle, level));
    }).then((res) => {
      setDifficulty(res);
      setDifficultyCopy(res);
      setSolution(() => solvepuzzle(res));
    });
    setSelectLevelVisibility("none");
    setRememberVisibility("flex");
  };

  const handleReset = async () => {
    setPuzzle([]);
    setDifficulty([]);
    setDifficultyCopy([]);
    setFieldClicked(false);
    setFieldId(-1);
    status = "";
    setSelectLevelVisibility("flex");
    setRememberVisibility("none");
    setSolutionButtonVisibility("none");
    setSolutionButtonClicked(false);
  };

  const handleShowSolution = () => {
    setDifficultyCopy(solution);
    setSolutionButtonClicked(true);
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
              <button
                key={i + 100}
                className={["sdk-remember-field", rememberVisibility].join(" ")}
              >
                <span>{rememberArray[i]}</span>
                <br />
              </button>
            </>
          ))}
        </div>
        <div className="sdk-puzzle-field-container">
          {difficulty.map((field, i) => (
            <>
              <button
                key={i + 200}
                className={[
                  "sdk-puzzle-field",
                  difficulty[i] !== null && "field-yellow",
                  (status = "You won!" && "field-yellow"),
                ].join(" ")}
              >
                <span>{difficulty[i] !== null ? difficulty[i] + 1 : null}</span>
              </button>
            </>
          ))}
        </div>
        <div className="sdk-button-field-container">
          {difficultyCopy.map((buttonField, i) => (
            <>
              <button
                key={i + 300}
                className={[
                  "sdk-button-field",
                  difficulty[i] === 0 && "field-yellow",
                ].join(" ")}
                onClick={() => handleButtonFieldClick(i)}
              >
                <span>{!difficulty[i] && difficultyCopy[i]}</span>
              </button>
            </>
          ))}
        </div>
        <div className="sdk-fake-field-container">
          {difficulty.map((fakeField, i) => (
            <>
              <div
                key={i + 400}
                className={[
                  "sdk-fake-field",
                  i === fieldId ? "button-field-white" : "button-field-hidden",
                ].join(" ")}
              >
                {i === fieldId && difficulty[i] === null ? <NumberPad /> : null}
              </div>
            </>
          ))}
        </div>
        <hr className="sdk-divider-h1" />
        <hr className="sdk-divider-h2" />
        <hr className="sdk-divider-v1" />
        <hr className="sdk-divider-v2" />
        <div className={["selectLevel", selectLevelVisibility].join(" ")}>
          <h3>SELECT LEVEL</h3>
          <form className="sdk-boxed">
            <div className="sdk-radio-button-container">
              <input
                type="radio"
                id="easy"
                name="level"
                value="easy"
                onClick={handleRadio}
                defaultChecked
              />
              <label
                htmlFor="easy"
                className={level === 1 ? "checked" : "unchecked"}
              >
                EASY
              </label>
              <input
                type="radio"
                id="medium"
                name="level"
                value="medium"
                onClick={handleRadio}
              />

              <label
                htmlFor="medium"
                className={level === 2 ? "checked" : "unchecked"}
              >
                MEDIUM
              </label>
              <input
                type="radio"
                id="hard"
                name="level"
                value="hard"
                onClick={handleRadio}
              />

              <label
                htmlFor="hard"
                className={level === 3 ? "checked" : "unchecked"}
              >
                HARD
              </label>
            </div>
            <div className="sdk-submit-button-container">
              <input type="submit" value="SUBMIT" onClick={handleRadioSubmit} />
            </div>
          </form>
        </div>
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
        const newDifficultyCopy = [...difficultyCopy];
        newDifficultyCopy[fieldId] = number;
        setDifficultyCopy(newDifficultyCopy);
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
              key={i + 500}
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
        <button
          className={["solution-button", solutionButtonVisibility].join(" ")}
          onClick={() => handleShowSolution()}
        >
          SOLUTION
        </button>
        <Field />
      </GameBoard>
    </>
  );
};

export default Sudoku;

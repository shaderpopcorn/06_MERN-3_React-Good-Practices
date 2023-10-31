import { useState } from "react";
import GameBoard from "../components/GameBoard";
import { HM_ALPHABET } from "../data/constants";
import "./Hangman.css";

const Hangman = () => {
  const [word, setWord] = useState("");
  const [showInput, setShowInput] = useState("input-show");
  const [showAlphabet, setShowAlphabet] = useState("alphabet-hide");
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [correctHits, setCorrectHits] = useState(Array(26).fill(false));
  const [incorrectHits, setIncorrectHits] = useState(Array(26).fill(false));
  const [clickedId, setClickedId] = useState(-1);
  const SvgHalf = () => {
    return (
      <svg
        className="hm-icon-half"
        viewBox="-7 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="10" y1="80" x2="30" y2="80" />
        <line x1="20" y1="80" x2="20" y2="20" />
        <line x1="20" y1="20" x2="60" y2="20" />
        <line x1="20" y1="40" x2="40" y2="20" />
        <line x1="60" y1="20" x2="60" y2="30" />
        <circle cx="60" cy="35" r="5" />
        <line x1="60" y1="40" x2="60" y2="60" />
        <line x1="50" y1="50" x2="60" y2="45" />
        <line x1="60" y1="45" x2="70" y2="50" />
        <line x1="55" y1="70" x2="60" y2="60" />
        <line x1="60" y1="60" x2="65" y2="70" />
      </svg>
    );
  };

  const Letters = () => {
    const handleClick = (alphabet, id) => {
      setClickedId(id);
      if (word.includes(alphabet)) {
        setCorrectGuesses([...correctGuesses, alphabet]);
        const newCorrectHits = [...correctHits];
        newCorrectHits[id] = true;
        setCorrectHits(newCorrectHits);
      } else {
        setIncorrectGuesses(() => incorrectGuesses + 1);
        const newIncorrectHits = [...incorrectHits];
        newIncorrectHits[id] = true;
        setIncorrectHits(newIncorrectHits);
      }
    };
    return (
      <>
        {HM_ALPHABET.map((alphabet, i) => (
          <button
            key={i}
            onClick={() => handleClick(alphabet, i)}
            className={[
              "hm-letter-button",
              i === clickedId ? "letter-yellow" : "letter-white",
              correctHits[i] === true ? "letter-yellow" : "letter-white",
              incorrectHits[i] === true ? "letter-grey" : "letter-white",
              status === "You won!" ? "letter-grey" : "hm-letter-button",
              status === "You lost!" ? "letter-grey" : "hm-letter-button",
            ].join(" ")}
          >
            {alphabet}
          </button>
        ))}
      </>
    );
  };

  const handleInput = (e) => {
    setWord(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlphabet("alphabet-show");
    setShowInput("input-hide");
  };

  const hiddenWord = word
    .split("")
    .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");

  let status;
  if (!hiddenWord.includes("_")) status = "You won!";
  else if (incorrectGuesses === 11) status = "You lost!";
  else status = "Trials left: " + `${11 - incorrectGuesses}`;

  const handleReset = () => {
    setShowInput("input-show");
    setShowAlphabet("alphabet-hide");
    setCorrectGuesses([]);
    setIncorrectGuesses(0);
    setCorrectHits(Array(26).fill(false));
    setIncorrectHits(Array(26).fill(false));
  };

  const drawGallow = (incorrectGuesses) => {
    switch (incorrectGuesses) {
      case 0:
        return (
          <div className="hm-icon-container">
            <SvgHalf />;
          </div>
        );
      case 1:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 2:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 3:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
              <line x1="20" y1="20" x2="60" y2="20" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 4:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
              <line x1="20" y1="20" x2="60" y2="20" />
              <line x1="20" y1="40" x2="40" y2="20" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 5:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
              <line x1="20" y1="20" x2="60" y2="20" />
              <line x1="20" y1="40" x2="40" y2="20" />
              <line x1="60" y1="20" x2="60" y2="30" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 6:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
              <line x1="20" y1="20" x2="60" y2="20" />
              <line x1="20" y1="40" x2="40" y2="20" />
              <line x1="60" y1="20" x2="60" y2="30" />
              <circle cx="60" cy="35" r="5" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 7:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
              <line x1="20" y1="20" x2="60" y2="20" />
              <line x1="20" y1="40" x2="40" y2="20" />
              <line x1="60" y1="20" x2="60" y2="30" />
              <circle cx="60" cy="35" r="5" />
              <line x1="60" y1="40" x2="60" y2="60" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 8:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
              <line x1="20" y1="20" x2="60" y2="20" />
              <line x1="20" y1="40" x2="40" y2="20" />
              <line x1="60" y1="20" x2="60" y2="30" />
              <circle cx="60" cy="35" r="5" />
              <line x1="60" y1="40" x2="60" y2="60" />
              <line x1="50" y1="50" x2="60" y2="45" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 9:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
              <line x1="20" y1="20" x2="60" y2="20" />
              <line x1="20" y1="40" x2="40" y2="20" />
              <line x1="60" y1="20" x2="60" y2="30" />
              <circle cx="60" cy="35" r="5" />
              <line x1="60" y1="40" x2="60" y2="60" />
              <line x1="50" y1="50" x2="60" y2="45" />
              <line x1="60" y1="45" x2="70" y2="50" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 10:
        return (
          <div className="hm-icon-container">
            <svg
              className="hm-icon-full"
              viewBox="-7 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="80" x2="30" y2="80" />
              <line x1="20" y1="80" x2="20" y2="20" />
              <line x1="20" y1="20" x2="60" y2="20" />
              <line x1="20" y1="40" x2="40" y2="20" />
              <line x1="60" y1="20" x2="60" y2="30" />
              <circle cx="60" cy="35" r="5" />
              <line x1="60" y1="40" x2="60" y2="60" />
              <line x1="50" y1="50" x2="60" y2="45" />
              <line x1="60" y1="45" x2="70" y2="50" />
              <line x1="55" y1="70" x2="60" y2="60" />
            </svg>
            <SvgHalf />
          </div>
        );
        break;
      case 11:
        return (
          <svg
            viewBox="-7 0 100 100"
            stroke="#ffd200"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="10" y1="80" x2="30" y2="80" />
            <line x1="20" y1="80" x2="20" y2="20" />
            <line x1="20" y1="20" x2="60" y2="20" />
            <line x1="20" y1="40" x2="40" y2="20" />
            <line x1="60" y1="20" x2="60" y2="30" />
            <circle cx="60" cy="35" r="5" />
            <line x1="60" y1="40" x2="60" y2="60" />
            <line x1="50" y1="50" x2="60" y2="45" />
            <line x1="60" y1="45" x2="70" y2="50" />
            <line x1="55" y1="70" x2="60" y2="60" />
            <line x1="60" y1="60" x2="65" y2="70" />
          </svg>
        );
        break;
      // case 12:
      //   return (
      //     <svg
      //       viewBox="-7 0 100 100"
      //       stroke="#ffd200"
      //       strokeWidth="2"
      //       strokeLinecap="round"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <line x1="10" y1="80" x2="30" y2="80" />
      //       <line x1="20" y1="80" x2="20" y2="20" />
      //       <line x1="20" y1="20" x2="60" y2="20" />
      //       <line x1="20" y1="40" x2="40" y2="20" />
      //       <line x1="60" y1="20" x2="60" y2="30" />
      //       <circle cx="60" cy="35" r="5" />
      //       <line x1="60" y1="40" x2="60" y2="60" />
      //       <line x1="50" y1="50" x2="60" y2="45" />
      //       <line x1="60" y1="45" x2="70" y2="50" />
      //       <line x1="55" y1="70" x2="60" y2="60" />
      //       <line x1="60" y1="60" x2="65" y2="70" />
      //       <line x1="3" y1="90" x2="83" y2="10" />
      //       <line x1="3" y1="10" x2="83" y2="90" />
      //     </svg>
      //   );
      //   break;
      default:
        break;
    }
  };

  return (
    <>
      <GameBoard status={status} headline={"HANGMAN"} handleReset={handleReset}>
        <div className="hm-game-container">
          <div className="hm-picture">{drawGallow(incorrectGuesses)}</div>
          <p
            className={[
              "hm-masked-word",
              status === "You won!" ? "word-yellow" : "word-white",
            ].join(" ")}
          >
            {hiddenWord}
          </p>
          <div className="input-container">
            <form className={showInput}>
              <input
                className="word-input"
                type="text"
                placeholder="TYPE WORD"
                onChange={handleInput}
              ></input>
              <button
                className="submit-button"
                type="submit"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </form>
            <div className={showAlphabet}>
              <Letters />
            </div>
          </div>
        </div>
      </GameBoard>
    </>
  );
};

export default Hangman;

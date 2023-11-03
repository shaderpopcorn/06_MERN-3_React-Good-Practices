import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import Hangman from "./pages/Hangman";
import Sudoku from "./pages/Sudoku";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/sudoku" element={<Sudoku />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import FetchContext from "./context/fetch-context";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import Hangman from "./pages/Hangman";
import Solitaire from "./pages/Solitaire";
import "./App.css";

function App() {
  const fetchContext = {};
  return (
    <>
      {/* <FetchContext.Provider value={fetchContext}> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
              // handleLocalWeatherCurrent={handleLocalWeatherCurrent}
              // handleLocalWeatherForecast={handleLocalWeatherForecast}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/hangman" element={<Hangman />} />
            <Route path="/solitaire" element={<Solitaire />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </FetchContext.Provider> */}
    </>
  );
}

export default App;

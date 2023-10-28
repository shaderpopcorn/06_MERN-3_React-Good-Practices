import { Outlet, Link } from "react-router-dom";
import "./GameCard.css";

const GameCard = ({ game }) => {
  console.log(game.imageUrl);
  return (
    <Link
      className="game-link"
      to={game.pageUrl}
      onClick={() => {
        // fetchContext.setShowInputWeather(false);
      }}
    >
      <div className="image-container">
        <img
          rel="img"
          // className={style}
          type="image/svg+xml"
          src={game.imageUrl}
          alt="tictactoe image"
        />
      </div>
      <h3>{game.name}</h3>
    </Link>
  );
};

export default GameCard;

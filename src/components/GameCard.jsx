import { Link } from "react-router-dom";
import "./GameCard.css";

const GameCard = ({ game }) => {
  return (
    <Link className="game-link" to={game.pageUrl}>
      <div className="image-container">
        <img
          rel="img"
          // className={style}
          type="image/svg+xml"
          src={game.imageUrl}
          alt="tictactoe image"
        />
      </div>
      <h3 className="game-name">{game.name}</h3>
    </Link>
  );
};

export default GameCard;

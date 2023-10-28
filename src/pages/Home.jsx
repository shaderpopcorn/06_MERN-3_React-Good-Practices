import { GAMES } from "../data/games";
import GameCard from "../components/GameCard";

const Home = () => {
  return (
    <div>
      <ul>
        {GAMES.map((game, index) => {
          return (
            <li key={index}>
              <GameCard game={game} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;

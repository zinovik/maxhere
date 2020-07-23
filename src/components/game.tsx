import React from 'react';
import games from '../../content/games.json';

console.log(games);

type GameProps = {
  gameName: string;
  isRankOnly?: boolean;
  isYearOnly?: boolean;
};

const Game: React.FC<GameProps> = ({ gameName, isRankOnly, isYearOnly }) => {
  const game = games.find(({ name }) => name === gameName);

  if (!game) {
    return null;
  }

  if (isRankOnly) {
    return <>{game.rank}</>;
  }

  if (isYearOnly) {
    return <>{game.year}</>;
  }

  return (
    <a href={game.link}>
      {game.rank}. {game.name} ({game.year})
    </a>
  );
};

export default Game;

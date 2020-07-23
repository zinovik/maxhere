import React from 'react';
import bgg from '../../content/bgg.json';

type GameProps = {
  isDateOnly?: boolean;
  gameName?: string;
  isRankOnly?: boolean;
  isYearOnly?: boolean;
  isGameLinkOnly?: boolean;
};

const Game: React.FC<GameProps> = ({
  isDateOnly,
  gameName,
  isRankOnly,
  isYearOnly,
  isGameLinkOnly,
}) => {
  if (isDateOnly) {
    return <>{new Date(bgg.date).toLocaleDateString()}</>;
  }

  const game = bgg.games.find(({ name }) => name === gameName);

  if (!game) {
    return null;
  }

  if (isRankOnly) {
    return <>{game.rank}</>;
  }

  if (isYearOnly) {
    return <>{game.year}</>;
  }

  if (isGameLinkOnly) {
    return <a href={`https://boardgamegeek.com${game.link}`}>{game.name}</a>;
  }

  return (
    <a href={`https://boardgamegeek.com${game.link}`}>
      {game.rank}. {game.name} ({game.year})
    </a>
  );
};

export default Game;

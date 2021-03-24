import React from 'react';
import bgg from '../../content/bgg.json';

type GameProps = {
  isDateOnly?: boolean;
  gameName?: string;
  isSkipRank?: boolean;
  isSkipYear?: boolean;
  isText?: boolean;
};

export const getGameRank = gameName => {
  const game = bgg.games.find(({ name }) => name === gameName);

  return game && game.rank;
};

export const getGameYear = gameName => {
  const game = bgg.games.find(({ name }) => name === gameName);

  return game && game.year;
};

const Game: React.FC<GameProps> = ({
  isDateOnly,
  gameName,
  isSkipRank,
  isSkipYear,
  isText,
}) => {
  if (isDateOnly) {
    return <>{new Date(bgg.date).toLocaleDateString()}</>;
  }

  const game = bgg.games.find(({ name }) => name === gameName);

  if (!game) {
    return isSkipRank ? gameName : `2000+. ${gameName}`;
  }

  return isText ? (
    <>
      {game.rank}. {game.name} ({game.year})
    </>
  ) : (
    <a
      href={`https://boardgamegeek.com/boardgame/${game.link}`}
      target="_blank"
    >
      {!isSkipRank && `${game.rank}. `}
      {game.name}
      {!isSkipYear && ` (${game.year})`}
    </a>
  );
};

export default Game;

import React from 'react';
import bgg from '../../content/bgg.json';

type GameProps = {
  isDateOnly?: boolean;
  gameName?: string;
  isGameLinkOnly?: boolean;
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
  isGameLinkOnly,
  isText,
}) => {
  if (isDateOnly) {
    return <>{new Date(bgg.date).toLocaleDateString()}</>;
  }

  const game = bgg.games.find(({ name }) => name === gameName);

  if (!game) {
    return gameName;
  }

  if (isGameLinkOnly) {
    return (
      <a href={`https://boardgamegeek.com${game.link}`} target="_blank">
        {game.name}
      </a>
    );
  }

  return isText ? (
    <>
      {game.rank}. {game.name} ({game.year})
    </>
  ) : (
    <a href={`https://boardgamegeek.com${game.link}`} target="_blank">
      {game.rank}. {game.name} ({game.year})
    </a>
  );
};

export default Game;

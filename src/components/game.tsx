import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { BggGamesContext } from '../templates/blog-post';

type GameProps = {
  isDateOnly?: boolean;
  gameName?: string;
  isSkipRank?: boolean;
  isSkipYear?: boolean;
  isText?: boolean;
};

const BGG_GAMES_RANKS_STATIC =
  'https://storage.googleapis.com/boardgamegeek/top1000.json';

const Game: React.FC<GameProps> = ({
  isDateOnly,
  gameName,
  isSkipRank,
  isSkipYear,
  isText,
}) => {
  const { bggGames, setBggGames } = useContext(BggGamesContext);

  useEffect(() => {
    axios.get(BGG_GAMES_RANKS_STATIC).then(({ data }) => setBggGames(data));
  }, []);

  if (!bggGames) {
    return <></>;
  }

  if (isDateOnly) {
    return (
      <>
        {new Date(bggGames.date).toLocaleDateString()}
        <br />
      </>
    );
  }

  const game = bggGames.games.find(({ name }) => name === gameName);

  if (!game) {
    return <>{isSkipRank ? gameName : `2000+. ${gameName}`}</>;
  }

  return isText ? (
    <>
      {game.rank}. {game.name} ({game.year})
    </>
  ) : (
    <a href={`https://boardgamegeek.com/boardgame/${game.id}`} target="_blank">
      {!isSkipRank && `${game.rank}. `}
      {game.name}
      {!isSkipYear && ` (${game.year})`}
    </a>
  );
};

export default Game;

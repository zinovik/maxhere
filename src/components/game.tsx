import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { BggGamesContext } from '../templates/blog-post';

type GameProps = {
  isDateOnly?: boolean;
  gameName?: string;
  isSkipRank?: boolean;
  isSkipYear?: boolean;
  isText?: boolean;
};

const DEFAULT_LABEL: string = 'update ranks';
const UPDATING_LABEL: string = 'updating...';
const ERROR_UPDATING_LABEL: string = 'error updating!';
const UPDATED_LABEL: string = 'updated!';

const BGG_GAMES_RANKS_STATIC =
  'https://raw.githubusercontent.com/zinovik/bgg-games-ranks-data/main/bgg-games-ranks.json';
const BGG_GAMES_RANKS_FUNCTION =
  'https://bgg-games-ranks-parser-wniawguk3a-uc.a.run.app?amount=2000';

const Game: React.FC<GameProps> = ({
  isDateOnly,
  gameName,
  isSkipRank,
  isSkipYear,
  isText,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(DEFAULT_LABEL);

  const { bggGames, setBggGames } = useContext(BggGamesContext);

  useEffect(() => {
    axios.get(BGG_GAMES_RANKS_STATIC).then(({ data }) => setBggGames(data));
  }, []);

  const setTemporaryLabel = (label: string) => {
    setButtonLabel(label);

    setTimeout(() => {
      setButtonLabel(DEFAULT_LABEL);
      setIsButtonDisabled(false);
    }, 10000);
  };

  if (!bggGames) {
    return <></>;
  }

  const updateBgg = async () => {
    setIsButtonDisabled(true);
    setButtonLabel(UPDATING_LABEL);

    try {
      const { data: response } = await axios.get(BGG_GAMES_RANKS_FUNCTION);

      if (!response) {
        throw new Error(ERROR_UPDATING_LABEL);
      }

      setBggGames(response);
      setTemporaryLabel(UPDATED_LABEL);
    } catch (error) {
      setTemporaryLabel(error.message);
    }
  };

  if (isDateOnly) {
    return (
      <>
        {new Date(bggGames.date).toLocaleDateString()}
        <br />
        <>
          <button onClick={updateBgg} disabled={isButtonDisabled}>
            {buttonLabel}
          </button>
        </>
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

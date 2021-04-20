import axios from 'axios';
import React, { useState, useContext } from 'react';
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
      const { data: response } = await axios.get('/.netlify/functions/bgg');

      if (!response.data) {
        throw new Error(ERROR_UPDATING_LABEL);
      }

      setBggGames(response.data);
      setTemporaryLabel(UPDATED_LABEL);
    } catch (error) {
      setTemporaryLabel(error.message);
    }
  };

  if (isDateOnly) {
    return (
      <>
        {new Date(bggGames.date).toLocaleDateString()}
        <div>
          <button onClick={updateBgg} disabled={isButtonDisabled}>
            {buttonLabel}
          </button>
        </div>
      </>
    );
  }

  const game = bggGames.games.find(({ name }) => name === gameName);

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

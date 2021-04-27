import React from 'react';
import { designersConfig } from './designers-config';

const SOME_HIGH_RATED_GAMES = 'Some high-rated games';

type DesignerProps = {
  name: string;
  isText?: boolean;
  isPageLink?: boolean;
  isGames?: boolean;
};

const Designer: React.FC<DesignerProps> = ({
  name,
  isText,
  isPageLink,
  isGames,
}) => {
  const designer = designersConfig[name] || {};

  return isText ? (
    <>{designer.text}</>
  ) : isPageLink ? (
    <a href={`#${name}`}>{designer.text}</a>
  ) : (
    <a
      href={`https://boardgamegeek.com/boardgamedesigner/${designer.link}${
        isGames ? '/linkeditems/boardgamedesigner?pageid=1&sort=rank' : ''
      }`}
      className="anchor"
      id={name}
      target="_blank"
    >
      {isGames ? SOME_HIGH_RATED_GAMES : designer.text}
    </a>
  );
};

export default Designer;

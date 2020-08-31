import React, { useState, useEffect } from 'react';
import Game, { getGameRank } from '../game';
import { sitesConfig } from './sites-config';
import { Header } from './components/header';
import { Filter } from './components/filter';
import {
  Row,
  CellRank,
  CellGame,
  CellSites,
} from './components/styled-components';
import { getInitialFilterState } from './games-list-helpers/get-initial-filter-state';
import { getGamesReducerFunction } from './games-list-helpers/get-games-reducer-function';
import { gamesByRankSortFunction } from './games-list-helpers/games-by-rank-sort-function';
import { GameIconLink } from './components/game-icon-link';
import { GameInterface } from './interfaces/game-interface';

interface GamesListProps {
  games: {
    [key: string]: string[];
  };
}

const GamesList: React.FC<GamesListProps> = ({ games }) => {
  const [sitesFilter, setSitesFilter] = useState({});
  const [isWithoutImplementation, setIsWithoutImplementation] = useState(false);

  useEffect(() => {
    const savedSitesFilterJSON = localStorage.getItem('sitesFilter');
    const savedIsWithoutImplementation = localStorage.getItem(
      'isWithoutImplementation',
    );

    setSitesFilter(
      savedSitesFilterJSON
        ? JSON.parse(savedSitesFilterJSON)
        : getInitialFilterState(sitesConfig),
    );
    setIsWithoutImplementation(savedIsWithoutImplementation === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('sitesFilter', JSON.stringify(sitesFilter));
    localStorage.setItem(
      'isWithoutImplementation',
      isWithoutImplementation ? 'true' : 'false',
    );
  }, [sitesFilter, isWithoutImplementation]);

  const gamesSorted: GameInterface[] = Object.keys(games)
    .map(name => ({
      name,
      rank: getGameRank(name),
      urls: [...games[name]],
    }))
    .reduce(
      getGamesReducerFunction(
        sitesConfig,
        sitesFilter,
        isWithoutImplementation,
      ),
      [],
    )
    .sort(gamesByRankSortFunction);

  return (
    <div>
      <Filter
        sitesConfig={sitesConfig}
        sitesFilter={sitesFilter}
        isWithoutImplementation={isWithoutImplementation}
        setSitesFilter={setSitesFilter}
        setIsWithoutImplementation={setIsWithoutImplementation}
      />
      <br />
      <br />
      <Header />
      {gamesSorted.map((game: GameInterface) => (
        <Row key={game.name}>
          <CellRank>{game.rank}</CellRank>
          <CellGame>
            <Game gameName={game.name} isSkipRank />
          </CellGame>
          <CellSites>
            {game.urls.map(url => (
              <GameIconLink
                sitesConfig={sitesConfig}
                url={url}
                key={`${game.name}-${url}`}
              />
            ))}
          </CellSites>
        </Row>
      ))}
    </div>
  );
};

export default GamesList;

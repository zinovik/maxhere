import React, { useState, useEffect, useContext } from 'react';
import Game from '../game';
import { sitesConfig } from './sites-config';
import { Header } from './components/header';
import { Filter, WITHOUT_IMPLEMENTATION } from './components/filter';
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
import { BggGamesContext } from '../../templates/blog-post';
import { BggGames } from '../../types/BggGames';

const STORAGE_NAME: string = 'digital-board-games:sites-filter';
const WITHOUT_IMPLEMENTATION_DEFAULT_VALUE: boolean = false;

export const getGameRank = (bggGames: BggGames, gameName: string) => {
  const game = bggGames.games.find(({ name }) => name === gameName);

  return game && game.rank;
};

const getFilterFromLocationSearch = (search: string) => {
  const params = new URLSearchParams(search);
  const sites = params.get('sites');

  if (!sites) {
    return null;
  }

  const sitesFilter = sitesConfig.reduce((acc, site) => {
    return {
      ...acc,
      [site.title]:
        sites.indexOf(site.title.toLowerCase().replace(/ /gm, '-')) >= 0,
    };
  }, {});

  const isWithoutImplementation =
    sites.indexOf(WITHOUT_IMPLEMENTATION.toLowerCase().replace(/ /gm, '-')) >=
    0;

  return {
    sitesFilter,
    isWithoutImplementation,
  };
};

interface GamesListProps {
  games: {
    [key: string]: string[];
  };
}

const GamesList: React.FC<GamesListProps> = ({ games }) => {
  const [sitesFilter, setSitesFilter] = useState({});
  const [isWithoutImplementation, setIsWithoutImplementation] = useState(false);

  const { bggGames } = useContext(BggGamesContext);

  useEffect(() => {
    const searchFilter = getFilterFromLocationSearch(window.location.search);

    if (searchFilter) {
      setSitesFilter(searchFilter.sitesFilter);
      setIsWithoutImplementation(searchFilter.isWithoutImplementation);

      return;
    }

    const storageFilterJSON = localStorage.getItem(STORAGE_NAME);

    if (storageFilterJSON) {
      const storageFilter = JSON.parse(storageFilterJSON);

      setSitesFilter(storageFilter.sitesFilter);
      setIsWithoutImplementation(storageFilter.isWithoutImplementation);

      return;
    }

    setSitesFilter(getInitialFilterState(sitesConfig));
    setIsWithoutImplementation(WITHOUT_IMPLEMENTATION_DEFAULT_VALUE);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_NAME,
      JSON.stringify({
        sitesFilter,
        isWithoutImplementation,
      }),
    );

    const sitesString = Object.keys(sitesFilter)
      .filter(site => sitesFilter[site])
      .join(',')
      .toLowerCase()
      .replace(/ /gm, '-');

    const withoutImplementationString = WITHOUT_IMPLEMENTATION.toLowerCase().replace(
      / /gm,
      '-',
    );

    const filterString = isWithoutImplementation
      ? sitesString
        ? `${sitesString},${withoutImplementationString}`
        : withoutImplementationString
      : sitesString;

    window.history.replaceState(
      'Digital Board Games',
      'digital-board-games',
      `${window.location.pathname}?sites=${filterString}${window.location.hash}`,
    );
  }, [sitesFilter, isWithoutImplementation]);

  const gamesSorted: GameInterface[] = Object.keys(games)
    .map(name => ({
      name,
      rank: getGameRank(bggGames, name),
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
          <CellRank>{game.rank || '2000+'}</CellRank>
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

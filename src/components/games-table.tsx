import React, { useState } from 'react';
import Game, { getGameRank } from './game';
import styled from 'styled-components';

import boargamearenaIcon from './icons/boargamearena.jpg';
import yucataIcon from './icons/yucata.jpg';
import boiteajeuxIcon from './icons/boiteajeux.jpg';
import mattleIcon from './icons/mattle.png';
import tabletopiaIcon from './icons/tabletopia.png';
import tabletopSimulatorIcon from './icons/tabletop-simulator.png';
import androidIcon from './icons/android.svg';
import iosIcon from './icons/ios.png';
import steamIcon from './icons/steam.png';
import desktopIcon from './icons/desktop.png';
import webIcon from './icons/web.webp';

const WITHOUT_IMPLEMENTATION = 'Without implementation';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderRow = styled(Row)`
  position: sticky;
`;

const Cell = styled.div`
  padding: 1px;
`;

const CellRank = styled(Cell)`
  width: 40px;
`;

const CellGame = styled(Cell)`
  flex-grow: 100;
  flex-shrink: 100;
`;

const CellSites = styled(Cell)`
  width: 180px;
`;

const Img = styled.img`
  max-height: 20px;
  max-width: 20px;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 0;
`;

const Label = styled.label`
  margin-left: 2px;
`;

interface GamesTableProps {
  games: {
    [key: string]: (string | { url: string; icon: string })[];
  };
}

const ICONS = {
  BOARDGAMEARENA: <Img src={boargamearenaIcon} />,
  YUCATA: <Img src={yucataIcon} />,
  BOITEAJEUX: <Img src={boiteajeuxIcon} />,
  MATTLE: <Img src={mattleIcon} />,
  TABLETOPIA: <Img src={tabletopiaIcon} />,
  TABLETOP_SIMULATOR: <Img src={tabletopSimulatorIcon} />,
  ANDROID: <Img src={androidIcon} />,
  IOS: <Img src={iosIcon} />,
  STEAM: <Img src={steamIcon} />,
  DESKTOP: <Img src={desktopIcon} />,
  WEB: <Img src={webIcon} />,
};

const SITES_CONFIG = [
  {
    title: 'Board Game Arena',
    urlParts: ['boardgamearena.com'],
    icon: ICONS.BOARDGAMEARENA,
    siteUrl: '#boardgamearena',
  },
  {
    title: 'Yucata',
    urlParts: ['yucata.de'],
    icon: ICONS.YUCATA,
    siteUrl: '#yucata',
  },
  {
    title: 'Boite a Jeux',
    urlParts: ['boiteajeux.net'],
    icon: ICONS.BOITEAJEUX,
    siteUrl: '#boiteajeux',
  },
  {
    title: 'Mattle',
    urlParts: ['mattle.online'],
    icon: ICONS.MATTLE,
    siteUrl: '#mattle',
  },
  {
    title: 'Tabletopia',
    urlParts: ['tabletopia.com'],
    icon: ICONS.TABLETOPIA,
    siteUrl: '#tabletopia',
  },
  {
    title: 'Tabletop Simulator',
    urlParts: ['/Tabletop_Simulator__'],
    icon: ICONS.TABLETOP_SIMULATOR,
    siteUrl: '#tabletop-simulator',
  },
  {
    title: 'Android',
    urlParts: ['play.google.com'],
    icon: ICONS.ANDROID,
    siteUrl: '#android',
  },
  {
    title: 'iOS',
    urlParts: ['apps.apple.com'],
    icon: ICONS.IOS,
    siteUrl: '#ios',
  },
  {
    title: 'Steam',
    urlParts: ['store.steampowered.com'],
    icon: ICONS.STEAM,
    siteUrl: '#steam',
  },
  {
    title: 'Desktop',
    urlParts: ['keldon.net', 'lantsev1981.pro'],
    icon: ICONS.DESKTOP,
  },
  {
    title: 'Web',
    urlParts: ['http'],
    icon: ICONS.WEB,
  },
];

const getInitialFilterState = sitesConfig =>
  sitesConfig.reduce((acc, site) => {
    return {
      ...acc,
      [site.title]: true,
    };
  }, {});

const getSiteForUrl = (sitesConfig: { urlParts: string[] }[], url: string) =>
  sitesConfig.find(({ urlParts }) =>
    urlParts.some(urlPart => url.includes(urlPart)),
  );

const getGamesReduceFunction = (
  sitesFilter: any,
  isWithoutImplementation: boolean,
) => {
  const gamesFilterFunction = (acc, game: { urls: string[] }) => {
    const { urls } = game;
    const filteredUrls = urls.filter(
      url => sitesFilter[getSiteForUrl(SITES_CONFIG, url).title],
    );

    if (!filteredUrls.length && !isWithoutImplementation) {
      return acc;
    }

    return [
      ...acc,
      {
        ...game,
        urls: filteredUrls,
      },
    ];
  };

  return gamesFilterFunction;
};

const gamesByRankSortFunction = ({ rank: rank1 }, { rank: rank2 }) =>
  rank1 - rank2;

const GamesTable: React.FC<GamesTableProps> = ({ games }) => {
  const [sitesFilter, setSitesFilter] = useState(
    getInitialFilterState(SITES_CONFIG),
  );
  const [isWithoutImplementation, setIsWithoutImplementation] = useState(false);

  const handleFilterChange = ({
    target: { id: title },
  }: {
    target: { id: string };
  }) => {
    if (title === WITHOUT_IMPLEMENTATION) {
      setIsWithoutImplementation(!isWithoutImplementation);
      return;
    }

    setSitesFilter({
      ...sitesFilter,
      [title]: !sitesFilter[title],
    });
  };

  const Filter = () => (
    <>
      {SITES_CONFIG.map(({ title, icon, siteUrl }) => (
        <div>
          <input
            type="checkbox"
            id={title}
            onChange={handleFilterChange}
            checked={sitesFilter[title]}
          />
          {siteUrl ? (
            <>
              <a href={siteUrl}>{icon}</a>
              <label htmlFor={title}>{title}</label>
            </>
          ) : (
            <>
              {icon}
              <label htmlFor={title}>{title}</label>
            </>
          )}
        </div>
      ))}
      <input
        type="checkbox"
        id={WITHOUT_IMPLEMENTATION}
        onChange={handleFilterChange}
        checked={isWithoutImplementation}
      />
      <Label htmlFor={WITHOUT_IMPLEMENTATION}>{WITHOUT_IMPLEMENTATION}</Label>
    </>
  );

  const Header = () => (
    <HeaderRow>
      <CellRank>
        <a href="https://boardgamegeek.com/browse/boardgame" target="_black">
          R*
        </a>
      </CellRank>
      <CellGame>Game (year)</CellGame>
      <CellSites>Sites</CellSites>
    </HeaderRow>
  );

  const gamesSorted = Object.keys(games)
    .map(name => ({
      name,
      rank: getGameRank(name),
      urls: [...games[name]],
    }))
    .reduce(getGamesReduceFunction(sitesFilter, isWithoutImplementation), [])
    .sort(gamesByRankSortFunction);

  const GameLink = ({ url }: { url: string }) => {
    const site = getSiteForUrl(SITES_CONFIG, url);

    return (
      <a href={url} target="_blank">
        {site.icon}
      </a>
    );
  };

  return (
    <div>
      <Filter />
      <Header />
      {gamesSorted.map(game => (
        <Row>
          <CellRank>{game.rank}</CellRank>
          <CellGame>
            <Game gameName={game.name} isSkipRank />
          </CellGame>
          <CellSites>
            {game.urls.map(url => (
              <GameLink url={url} />
            ))}
          </CellSites>
        </Row>
      ))}
    </div>
  );
};

export default GamesTable;

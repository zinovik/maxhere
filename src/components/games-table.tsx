import React from 'react';
import Table from './table';
import Game, { getGameRank, getGameYear } from './game';

interface GamesTableProps {
  games: {
    [key: string]: (string | { url: string; icon: string })[];
  };
}

const ICONS = {
  YES: '✅',
  YES_MOBILE: '📱',
  YES_WITHOUT_AUTOMATIZATION: '✔️',
  YES_DESKTOP_WITHOUT_AUTOMATIZATION: '💻',
  YES_DESKTOP: '🖥️',
  NO: '❌',
};

const SITES_CONFIG = [
  {
    siteUrl: '#boardgamearena',
    urlPart: 'boardgamearena.com',
    short: 'A',
  },
  {
    siteUrl: '#yucata',
    urlPart: 'yucata.de',
    short: 'Y',
  },
  {
    siteUrl: '#boiteajeux',
    urlPart: 'boiteajeux.net',
    short: 'B',
  },
  {
    siteUrl: '#mattle',
    urlPart: 'mattle.online',
    short: 'M',
  },
  {
    siteUrl: '#tabletopia',
    urlPart: 'tabletopia.com',
    short: 'Tt',
    icon: ICONS.YES_WITHOUT_AUTOMATIZATION,
  },
  {
    siteUrl: '#tabletop-simulator',
    urlPart: '/Tabletop_Simulator__',
    short: 'Ts',
    icon: ICONS.YES_DESKTOP_WITHOUT_AUTOMATIZATION,
  },
  {
    siteUrl: '#android',
    urlPart: 'play.google.com',
    short: 'A',
    icon: ICONS.YES_MOBILE,
  },
  {
    siteUrl: '#ios',
    urlPart: 'apps.apple.com',
    short: 'i',
    icon: ICONS.YES_MOBILE,
  },
  {
    siteUrl: '#steam',
    urlPart: 'store.steampowered.com',
    short: 'S',
    icon: ICONS.YES_DESKTOP,
  },
];

const GamesTable: React.FC<GamesTableProps> = ({ games }) => {
  const header = [
    { text: 'R*', link: 'https://boardgamegeek.com/browse/boardgame' },
    { text: 'Game (year)' },
    ...SITES_CONFIG.map(({ short, siteUrl }) => ({
      text: short,
      link: siteUrl,
      isSamePage: true,
    })),
    { text: '...' },
    { text: '' },
  ];

  const gamesRows = Object.keys(games)
    .map(gameName => {
      const firstCells = [
        { text: getGameRank(gameName) },
        {
          text: <Game gameName={gameName} isSkipRank />,
        },
      ];

      let gameUrls = [...games[gameName]];

      const gameLinkRows = SITES_CONFIG.map(({ urlPart, icon }) => {
        const siteLink = gameUrls.find(gameUrl =>
          (gameUrl.url || gameUrl).includes(urlPart),
        );

        if (!siteLink) {
          return { text: ICONS.NO };
        }

        gameUrls = gameUrls.filter(url => url !== siteLink);

        return {
          text: icon || ICONS.YES,
          link: siteLink,
        };
      });

      const otherLinkRows =
        gameUrls.length > 0
          ? gameUrls.map(gameLink => ({
              text: gameLink.icon ? ICONS[gameLink.icon] : ICONS.YES,
              link: gameLink.url || gameLink,
            }))
          : [{ text: ICONS.NO }];

      const gameRow = [...firstCells, ...gameLinkRows, ...otherLinkRows];

      return gameRow;
    })
    .sort(([{ text: rank1 }], [{ text: rank2 }]) => rank1 - rank2);

  const rows = [header, ...gamesRows];

  return <Table rows={rows} />;
};

export default GamesTable;

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
    siteUrl: 'https://boardgamearena.com',
    urlPart: 'boardgamearena.com',
    short: 'A',
  },
  {
    siteUrl: 'https://yucata.de',
    urlPart: 'yucata.de',
    short: 'Y',
  },
  {
    siteUrl: 'http://boiteajeux.net',
    urlPart: 'boiteajeux.net',
    short: 'B',
  },
  {
    siteUrl: 'https://mattle.online',
    urlPart: 'mattle.online',
    short: 'M',
  },
  {
    siteUrl: 'https://tabletopia.com',
    urlPart: 'tabletopia.com',
    short: 'Tt',
    icon: ICONS.YES_WITHOUT_AUTOMATIZATION,
  },
  {
    siteUrl: 'https://store.steampowered.com/app/286160/Tabletop_Simulator',
    urlPart: '/Tabletop_Simulator__',
    short: 'Ts',
    icon: ICONS.YES_DESKTOP_WITHOUT_AUTOMATIZATION,
  },
  {
    siteUrl: 'https://play.google.com/store/apps',
    urlPart: 'play.google.com',
    short: 'A',
    icon: ICONS.YES_MOBILE,
  },
  {
    siteUrl: 'https://www.apple.com/ios/app-store',
    urlPart: 'apps.apple.com',
    short: 'i',
    icon: ICONS.YES_MOBILE,
  },
  {
    siteUrl: 'https://store.steampowered.com',
    urlPart: 'store.steampowered.com',
    short: 'S',
    icon: ICONS.YES_DESKTOP,
  },
];

const GamesTable: React.FC<GamesTableProps> = ({ games }) => {
  const header = [
    { text: 'R*', link: 'https://boardgamegeek.com/browse/boardgame' },
    { text: 'Year' },
    { text: 'Game' },
    ...SITES_CONFIG.map(({ short, siteUrl }) => ({
      text: short,
      link: siteUrl,
    })),
    { text: '...' },
    { text: '' },
  ];

  const gamesRows = Object.keys(games)
    .map(gameName => {
      const firstCells = [
        { text: getGameRank(gameName) },
        { text: getGameYear(gameName) },
        { text: <Game isGameLinkOnly={true} gameName={gameName} /> },
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

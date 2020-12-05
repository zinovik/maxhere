import { icons } from './icons';
import { SiteConfigInterface } from './interfaces/site-config-interface';

export const sitesConfig: SiteConfigInterface[] = [
  {
    title: 'Board Game Arena',
    urlParts: ['boardgamearena.com'],
    icon: icons.BOARDGAMEARENA,
    siteUrl: '#boardgamearena',
  },
  {
    title: 'Yucata',
    urlParts: ['yucata.de'],
    icon: icons.YUCATA,
    siteUrl: '#yucata',
  },
  {
    title: 'Boite a Jeux',
    urlParts: ['boiteajeux.net'],
    icon: icons.BOITEAJEUX,
    siteUrl: '#boiteajeux',
  },
  {
    title: 'Mattle',
    urlParts: ['mattle.online'],
    icon: icons.MATTLE,
    siteUrl: '#mattle',
  },
  {
    title: 'Brettspiel Welt',
    urlParts: ['brettspielwelt.de'],
    icon: icons.BRETTSPIELWELT,
    siteUrl: '#brettspielwelt',
  },
  {
    title: 'Happy Meeple',
    urlParts: ['happymeeple.com'],
    icon: icons.HAPPYMEEPLE,
    siteUrl: '#happymeeple',
  },
  {
    title: 'Tabletopia',
    urlParts: ['tabletopia.com'],
    icon: icons.TABLETOPIA,
    siteUrl: '#tabletopia',
  },
  {
    title: 'Tabletop Simulator',
    urlParts: ['/Tabletop_Simulator__', 'steamcommunity.com/sharedfiles'],
    icon: icons.TABLETOP_SIMULATOR,
    siteUrl: '#tabletopsimulator',
  },
  {
    title: 'Android',
    urlParts: ['play.google.com'],
    icon: icons.ANDROID,
    siteUrl: '#android',
  },
  {
    title: 'iOS',
    urlParts: ['apps.apple.com'],
    icon: icons.IOS,
    siteUrl: '#ios',
  },
  {
    title: 'Steam',
    urlParts: ['store.steampowered.com'],
    icon: icons.STEAM,
    siteUrl: '#steam',
  },
  {
    title: 'Desktop',
    urlParts: ['keldon.net', 'lantsev1981.pro', 'boardgamegeek.com/guild/1733'],
    icon: icons.DESKTOP,
  },
  {
    title: 'Web',
    urlParts: ['http'],
    icon: icons.WEB,
  },
];

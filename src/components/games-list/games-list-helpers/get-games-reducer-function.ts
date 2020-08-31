import { getSiteForUrl } from './get-site-for-url';
import { SiteConfigInterface } from '../interfaces/site-config-interface';
import { GameInterface } from '../interfaces/game-interface';

export const getGamesReducerFunction = (
  sitesConfig: SiteConfigInterface[],
  sitesFilter: any,
  isWithoutImplementation: boolean,
): ((acc: GameInterface[], game: GameInterface) => GameInterface[]) => {
  const gamesReducerFunction = (acc: GameInterface[], game: GameInterface) => {
    const { urls } = game;
    const filteredUrls = urls.filter(
      url => sitesFilter[getSiteForUrl(sitesConfig, url).title],
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

  return gamesReducerFunction;
};

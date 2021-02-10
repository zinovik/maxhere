import { GameInterface } from '../interfaces/game-interface';

export const gamesByRankSortFunction = (
  { rank: rank1, name: name1 }: GameInterface,
  { rank: rank2, name: name2 }: GameInterface,
) => {
  if (!rank1 && !rank2) {
    return name1.localeCompare(name2);
  }

  if (!rank1) {
    return 1;
  }

  if (!rank2) {
    return 0;
  }

  return rank1 - rank2;
};

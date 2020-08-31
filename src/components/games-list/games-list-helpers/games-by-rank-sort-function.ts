import { GameInterface } from '../interfaces/game-interface';

export const gamesByRankSortFunction = (
  { rank: rank1 }: GameInterface,
  { rank: rank2 }: GameInterface,
) => rank1 - rank2;

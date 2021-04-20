export interface BggGames {
  date: string;
  games: Array<{
    rank: string;
    name: string;
    year: string;
    link: string;
  }>;
}

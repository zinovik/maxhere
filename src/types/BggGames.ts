export interface BggGames {
  date: string;
  games: Array<{
    rank: number;
    name: string;
    year: string;
    id: string;
  }>;
}

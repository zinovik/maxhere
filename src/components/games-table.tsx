import React from 'react';
import styled from 'styled-components';
import Table from './table';
import Game from './game';

interface GamesTableProps {
  rows: {
    text: string;
    link?: string;
    isRank?: boolean;
    isYear?: boolean;
    isGameLink?: boolean;
    game?: string;
  }[][];
}

const Td = styled.td`
  padding: 3px;
`;

const GamesTable: React.FC<GamesTableProps> = ({ rows }) => {
  const gamesRows = rows.map(cells => {
    return cells.map(cell => {
      if (cell.isRank) {
        return {
          text: <Game isRankOnly={true} gameName={cell.game} />,
        };
      }

      if (cell.isYear) {
        return {
          text: <Game isYearOnly={true} gameName={cell.game} />,
        };
      }

      if (cell.isGameLink) {
        return {
          text: <Game isGameLinkOnly={true} gameName={cell.game} />,
        };
      }

      return cell;
    });
  });

  return <Table rows={gamesRows} />;
};

export default GamesTable;

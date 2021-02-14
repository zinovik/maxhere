import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderRow = styled(Row)`
  position: sticky;
  font-weight: bold;
`;

const Cell = styled.div`
  padding: 1px;
`;

export const CellRank = styled(Cell)`
  width: 58px;
`;

export const CellGame = styled(Cell)`
  flex-grow: 100;
  flex-shrink: 100;
`;

export const CellSites = styled(Cell)`
  display: flex;
`;

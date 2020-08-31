import React from 'react';
import { HeaderRow, CellRank, CellGame, CellSites } from './styled-components';

export const Header = () => (
  <HeaderRow>
    <CellRank>
      <a href="https://boardgamegeek.com/browse/boardgame" target="_black">
        R*
      </a>
    </CellRank>
    <CellGame>Game (year)</CellGame>
    <CellSites>Sites</CellSites>
  </HeaderRow>
);

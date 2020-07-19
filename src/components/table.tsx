import React from 'react';
import styled from 'styled-components';

interface TableProps {
  rows: {
    text: string;
    link?: string;
  }[][];
}

const Td = styled.td`
  padding: 3px;
`;

const Table: React.FC<TableProps> = ({ rows }) => {
  return (
    <table>
      {rows.map(cells => (
        <tr>
          {cells.map(cell => (
            <Td>
              {cell.link ? <a href={cell.link}>{cell.text}</a> : cell.text}
            </Td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default Table;

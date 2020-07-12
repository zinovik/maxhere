import React from 'react';
import styled from 'styled-components';

type TableProps = {
  rows: {
    text: string;
    link?: string;
  }[][];
};

const Td = styled.td`
  padding: 0;
`;

const Table = ({ rows }: TableProps) => {
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

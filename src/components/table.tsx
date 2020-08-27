import React from 'react';
import styled from 'styled-components';

interface TableProps {
  rows: {
    text: string;
    link?: string;
    isSamePage?: boolean;
  }[][];
}

const Th = styled.th`
  padding: 3px;
  position: sticky;
  top: 0;
  background-color: white;
`;

const Td = styled.td`
  padding: 3px;
`;

const Table: React.FC<TableProps> = ({ rows }) => (
  <table>
    <thead>
      {rows.length > 0 && (
        <tr>
          {rows[0].map((cell, columnIndex) => (
            <Th key={`${0}-${columnIndex}`}>
              {cell.link ? (
                cell.isSamePage ? (
                  <a href={cell.link}>
                    {cell.text}
                  </a>
                ) : (
                  <a href={cell.link} target="_blank">
                    {cell.text}
                  </a>
                )
              ) : (
                cell.text
              )}
            </Th>
          ))}
        </tr>
      )}
    </thead>

    <tbody>
      {rows.map(
        (cells, rowIndex) =>
          rowIndex > 0 && (
            <tr key={rowIndex}>
              {cells.map((cell, columnIndex) => (
                <Td key={`${rowIndex}-${columnIndex}`}>
                  {cell.link ? (
                    <a href={cell.link} target="_blank">
                      {cell.text}
                    </a>
                  ) : (
                    cell.text
                  )}
                </Td>
              ))}
            </tr>
          ),
      )}
    </tbody>
  </table>
);

export default Table;

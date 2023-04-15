import React from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: scroll;
  height: 90svh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
  font-weight: bold;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const ResponsiveTable = ({ data }) => {
  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((key) => (
              <TableHeader key={key}>{key}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((cell, index) => {
                if (cell !== "permission")
                  return (
                    <TableCell key={index}>{JSON.stringify(cell)}</TableCell>
                  );
              })}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default ResponsiveTable;

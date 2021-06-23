import React from "react";
import { Table } from "semantic-ui-react";
import { TableProps } from "../types";

const CustomTable = ({ columns, data, extraData = {} }: TableProps) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {columns.map(({ title }, index) => (
            <Table.HeaderCell key={index}>{title}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row, index) => (
          <Table.Row key={index}>
            {columns.map(({ key, render }, _index) => (
              <Table.Cell key={`${index}${_index}`}>
                {!!render ? render({ row, extraData, index }) : row[key]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default CustomTable;

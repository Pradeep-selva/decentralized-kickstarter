import React from "react";
import { Table } from "semantic-ui-react";
import { DataCell } from "../types";

interface IProps {
  columns: Array<DataCell>;
  data: Array<any>;
  extraData?: any;
}

const CustomTable = ({ columns, data, extraData = {} }: IProps) => {
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
          <Table.Row>
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

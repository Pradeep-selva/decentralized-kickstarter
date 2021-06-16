import { DataCell } from "../types";

export const requestColumns: Array<DataCell> = [
  {
    key: "value",
    title: "Value (wei)"
  },
  {
    key: "recipient",
    title: "Recipient"
  },
  {
    key: "description",
    title: "Description"
  },
  {
    key: "complete",
    title: "Status",
    render: (value) => (Boolean(value) ? "Closed" : "Open")
  },
  {
    key: "approvalCount",
    title: "approvalCount"
  }
];

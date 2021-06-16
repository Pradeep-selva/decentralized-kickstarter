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
    render: ({ row: { complete } }) => (Boolean(complete) ? "Closed" : "Open")
  },
  {
    key: "approvalCount",
    title: "Approvals",
    render: ({ row: { approvalCount }, extraData: { contributors } }) =>
      `${approvalCount}/${contributors}`
  }
];

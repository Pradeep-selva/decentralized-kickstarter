import React from "react";
import { Button } from "semantic-ui-react";
import { DataCell } from "../types";

export const getRequestColumns = ({
  manager,
  contributors,
  user,
  functions,
  isContributor
}) => {
  let requestColumns: Array<DataCell> = [
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
      render: ({ row: { approvalCount } }) => `${approvalCount}/${contributors}`
    }
  ];

  if (user === manager)
    requestColumns.push({
      key: "finalize",
      title: "Finalize Request",
      render: ({ row: { complete, approvalCount }, index }) => {
        const invalid =
          Boolean(complete) ||
          approvalCount < contributors / 2 ||
          contributors === "0";

        return (
          <Button
            onClick={() => functions.handleAction(index, "finalize")}
            disabled={invalid}
            primary
            fluid
            icon={invalid ? "dont" : "check square"}
          />
        );
      }
    });

  if (isContributor)
    requestColumns.push({
      key: "approve",
      title: "Approve Request",
      render: ({ row: { complete }, index }) => {
        const closed = Boolean(complete);

        return (
          <Button
            onClick={() => functions.handleAction(index, "approve")}
            disabled={closed}
            color={"green"}
            fluid
            icon={closed ? "dont" : "check square"}
          />
        );
      }
    });

  return requestColumns;
};

import React from "react";
import { Button } from "semantic-ui-react";
import { web3 } from "../instances";
import { DataCell } from "../types";

export const getRequestColumns = async ({
  manager,
  contributors,
  user,
  functions
}): Promise<Array<DataCell>> => {
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

  requestColumns = [
    ...requestColumns,
    user === manager
      ? {
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
        }
      : {
          key: "approve",
          title: "Approve Request",
          render: ({ row: { complete }, index }) => {
            const closed = Boolean(complete);

            return (
              <Button
                onClick={() => functions.handleAction(index, "approve")}
                disabled={closed}
                secondary
                fluid
                icon={closed ? "dont" : "check square"}
              />
            );
          }
        }
  ];

  return new Promise((resolve) => resolve(requestColumns));
};

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
  console.log(user, "user", manager, "manager");
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
          render: ({ row: { complete, approvalCount } }) => {
            const invalid =
              Boolean(complete) || approvalCount < contributors / 2;

            return (
              <Button
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
                onClick={() => functions.approveRequest(index)}
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

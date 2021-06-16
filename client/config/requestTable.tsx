import React from "react";
import { Button } from "semantic-ui-react";
import { web3 } from "../instances";
import { DataCell } from "../types";

export const getRequestColumns = async ({
  manager,
  contributors
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
    },
    {
      key: "approve",
      title: "Approve Request",
      render: ({ row: { complete } }) => {
        const closed = Boolean(complete);
        return (
          <Button
            disabled={closed}
            secondary
            fluid
            icon={closed ? "dont" : "check square"}
          />
        );
      }
    }
  ];

  const accounts = await web3.eth.getAccounts();

  if (accounts[0] === manager)
    requestColumns = [
      ...requestColumns,
      {
        key: "finalize",
        title: "Finalize Request",
        render: ({ row: { complete, approvalCount } }) => {
          const invalid = Boolean(complete) && approvalCount < contributors / 2;

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
    ];

  return new Promise((resolve) => resolve(requestColumns));
};

import React from "react";
import { Status } from "../types";
import { Icon, Message } from "semantic-ui-react";

interface IProps {
  status: Status;
  success: string;
  error: string;
}

const StatusIndicator = ({ status, error, success }: IProps) => {
  let icon, title, body, color;

  switch (status) {
    case "waiting":
      icon = "circle notched";
      title = "Please wait";
      body = "Your transaction is being processed...";
      color = "yellow";
      break;
    case "success":
      icon = "check square";
      title = "Success";
      body = success;
      color = "green";
      break;
    case "error":
      icon = "exclamation";
      title = "Error";
      body = error;
      color = "red";
      break;
  }

  return (
    <Message icon className={color}>
      <Icon name={icon} loading={status === "waiting"} />
      <Message.Content>
        <Message.Header>{title}</Message.Header>
        {body}
      </Message.Content>
    </Message>
  );
};

export default StatusIndicator;

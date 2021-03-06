import React from "react";
import { Icon, Message } from "semantic-ui-react";
import { StatusIndicatorProps } from "../types";

const StatusIndicator = ({
  status,
  error,
  success,
  icon = false
}: StatusIndicatorProps) => {
  let iconName, title, body, color;

  switch (status) {
    case "waiting":
      iconName = "circle notched";
      title = "Please wait";
      body = "Your transaction is being processed...";
      color = "yellow";
      break;
    case "success":
      iconName = "check square";
      title = "Success";
      body = success;
      color = "green";
      break;
    case "error":
      iconName = "exclamation";
      title = "Error";
      body = error;
      color = "red";
      break;
  }

  return (
    <Message icon className={color}>
      {icon && <Icon name={iconName} loading={status === "waiting"} />}
      <Message.Content>
        <Message.Header>{title}</Message.Header>
        {body}
      </Message.Content>
    </Message>
  );
};

export default StatusIndicator;

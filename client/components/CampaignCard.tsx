import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Campaign } from "../types";

const CampaignCard = ({ address, description, title }: Campaign) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <b>{title}</b>
        </Card.Header>
        <Card.Meta>{address}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color='green'>
          Visit
        </Button>
      </Card.Content>
    </Card>
  );
};

export default CampaignCard;

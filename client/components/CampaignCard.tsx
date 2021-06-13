import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Campaign } from "../types";

const CampaignCard = ({ address, description, title }: Campaign) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          <h2>{title}</h2>
        </Card.Header>
        <Card.Meta>{address}</Card.Meta>
        <Card.Description>
          <h3>{description}</h3>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color='green'>
          View Details
        </Button>
      </Card.Content>
    </Card>
  );
};

export default CampaignCard;

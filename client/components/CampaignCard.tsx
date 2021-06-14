import React from "react";
import { Card, Button, Image } from "semantic-ui-react";
import { Campaign } from "../types";

const CampaignCard = ({ address, description, title, image }: Campaign) => {
  return (
    <Card fluid>
      <Card.Content>
        {image?.length ? (
          <Image floated={"right"} size={"small"} src={image} />
        ) : null}
        <Card.Header>
          <h2>{title}</h2>
        </Card.Header>
        <Card.Meta>{address}</Card.Meta>
        <Card.Description>
          <h3>
            {description.length > 200
              ? `${description.slice(0, 300)}...`
              : description}
          </h3>
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

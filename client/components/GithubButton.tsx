import React from "react";
import { Button, Icon } from "semantic-ui-react";
import styles from "../styles/Components.module.css";

const GithubButton = () => {
  const GITHUB_URL =
    "https://github.com/Pradeep-selva/decentralized-kickstarter";

  return (
    <Button
      icon
      secondary
      labelPosition={"left"}
      className={styles.github}
      onClick={() =>
        window.open(
          "https://github.com/Pradeep-selva/decentralized-kickstarter",
          "_blank"
        )
      }
    >
      <Icon name={"github"} />
      contribute
    </Button>
  );
};

export default GithubButton;

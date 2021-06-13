import React from "react";
import styles from "../styles/Components.module.css";
import { Button, Menu, Icon } from "semantic-ui-react";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Menu className={styles.menu}>
        <Menu.Item>
          <h1>Decentralized Kickstarter</h1>
        </Menu.Item>
        <Menu.Item position={"right"}>
          <Button icon color={"green"} labelPosition={"right"}>
            New Campaign
            <Icon name={"plus"} />
          </Button>
        </Menu.Item>
      </Menu>
      {children}
    </React.Fragment>
  );
};

export default Layout;

import React from "react";
import Link from "next/link";
import styles from "../styles/Components.module.css";
import { Button, Menu, Icon } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import routes from "../config/routes";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Menu className={styles.menu}>
        <Menu.Item className={styles.siteTitle}>
          <Link href={routes.home}>
            <h1>Decentralized Kickstarter</h1>
          </Link>
        </Menu.Item>
        <Menu.Item position={"left"} className={styles.menuAdd}>
          <SearchBar />
        </Menu.Item>
        <Menu.Item position={"right"} className={styles.menuAdd}>
          <Button icon color={"green"} labelPosition={"right"}>
            <Icon name={"plus"} />
            <Link href={routes.newCampaign}>New Campaign</Link>
          </Button>
        </Menu.Item>
      </Menu>
      {children}
    </React.Fragment>
  );
};

export default Layout;

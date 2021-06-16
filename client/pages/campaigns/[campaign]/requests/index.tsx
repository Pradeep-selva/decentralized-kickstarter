import React, { Component } from "react";
import Link from "next/link";
import { Container, Button } from "semantic-ui-react";
import { getCampaignRequests } from "../../../../utils";
import styles from "../../../../styles/Pages.module.css";
import homeStyles from "../../../../styles/Home.module.css";
import { Layout } from "../../../../components";
import RouteNames from "../../../../routes";

interface IProps {
  requests: Array<any>;
  address: string;
}

class Requests extends Component<IProps, {}> {
  static async getInitialProps(context) {
    const address = context.query.campaign;
    const requests = await getCampaignRequests(address);
    return { requests, address };
  }
  render() {
    const { requests, address } = this.props;

    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container>
            <Link
              href={RouteNames.campaignById.absolute}
              as={RouteNames.campaignById.as(address)}
            >
              <Button
                icon={"arrow alternate circle left"}
                floated={"left"}
                size={"massive"}
                primary
                circular
              />
            </Link>
            <div className={styles.centerContainer}>
              <h1>
                <u>Requests</u>
              </h1>
              <h3
                className={styles.greyText}
                style={{ marginTop: "-0.5rem" }}
              >{`<{ ${address} }>`}</h3>
            </div>
          </Container>
        </Layout>
      </main>
    );
  }
}

export default Requests;

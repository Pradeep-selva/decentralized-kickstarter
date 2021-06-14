import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Layout, StatusIndicator } from "../../components";
import styles from "../../styles/Pages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { Campaign, Factory, web3 } from "../../instances";

class ViewCampaign extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    const address = context.query.campaign;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary()?.call();

    console.log(summary);

    return { address };
  }

  render() {
    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container className={styles.centerContainer}>
            <h1></h1>
          </Container>
        </Layout>
      </main>
    );
  }
}

export default ViewCampaign;

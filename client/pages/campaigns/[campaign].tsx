import React, { Component } from "react";
import { Container, Image } from "semantic-ui-react";
import { Layout, StatusIndicator } from "../../components";
import styles from "../../styles/Pages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { Campaign } from "../../instances";
import { CampaignSummary } from "../../types";

interface IProps {
  summary: CampaignSummary;
  address: string;
}

class ViewCampaign extends Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    const address = context.query.campaign;
    const campaign = Campaign(address);
    const payload = await campaign.methods.getSummary()?.call();

    const summary: CampaignSummary = {
      minContribution: payload[0],
      numRequests: payload[1],
      contributors: payload[2],
      balance: payload[3],
      title: payload[4],
      description: payload[5],
      image: payload[6],
      manager: payload[7]
    };

    return { summary, address };
  }

  render() {
    const {
      summary: { title, description, image }
    } = this.props;

    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container className={styles.centerContainer}>
            <h1>
              <u>
                <b>{title}</b>
              </u>
            </h1>
            <h3 className={styles.greyText}>{description}</h3>
            {!!image && <Image src={image} />}
          </Container>
        </Layout>
      </main>
    );
  }
}

export default ViewCampaign;

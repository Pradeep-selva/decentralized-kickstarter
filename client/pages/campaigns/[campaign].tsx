import React, { Component } from "react";
import { Container, Image, Card, Grid } from "semantic-ui-react";
import { ContributionForm, Layout, StatusIndicator } from "../../components";
import styles from "../../styles/Pages.module.css";
import homeStyles from "../../styles/Home.module.css";
import { Campaign, web3 } from "../../instances";
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

  renderCards = () => {
    const {
      summary: { balance, contributors, manager, minContribution, numRequests },
      address
    } = this.props;

    const details = [
      this.returnCardObject(
        manager,
        "Address of Manager",
        "The manager maintains the campaign and can make monetary requests to contributors"
      ),
      this.returnCardObject(
        address,
        "Address of Contract",
        "The campaign's contract can be found at this address (Rinkeby network)"
      ),
      this.returnCardObject(
        minContribution,
        "Minimum Contribution (wei)",
        "The minimum contribution required to donate to become a contributor"
      ),
      this.returnCardObject(
        web3.utils.fromWei(balance, "ether"),
        "Campaign Balance (ether)",
        "Current donation pool of the campaign, given my contributors"
      ),
      this.returnCardObject(
        contributors,
        "Number of contributors",
        "The number of people that have contributed to the campaign. They make decisions on request approvals."
      ),
      this.returnCardObject(
        numRequests,
        "Number of Requests",
        "The number of transaction requests created by the manager of this contract, to the contributors."
      )
    ];

    return <Card.Group itemsPerRow={2} items={details} />;
  };

  returnCardObject = (header: string, meta: string, description: string) => ({
    header,
    meta,
    description,
    style: { overflowWrap: "break-word" }
  });

  render() {
    const {
      summary: { title, description, image, minContribution },
      address
    } = this.props;

    return (
      <main className={homeStyles.main}>
        <Layout>
          <Container fluid className={styles.centerContainer}>
            <Grid columns={2} centered divided>
              <Grid.Row>
                <Grid.Column computer={"9"} mobile={"12"} textAlign={"center"}>
                  <h1>
                    <u>
                      <b>{title}</b>
                    </u>
                  </h1>
                  <h3 className={styles.greyText}>{description}</h3>
                  {!!image && <Image src={image} />}
                </Grid.Column>
                <Grid.Column computer={"3"} mobile={"12"}>
                  <ContributionForm
                    minContribution={minContribution}
                    address={address}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div style={{ marginTop: "6vh" }}>
              <h2>Campaign attributes</h2>
            </div>
            <Container>
              <div style={{ marginTop: "4vh" }}>{this.renderCards()}</div>
            </Container>
          </Container>
        </Layout>
      </main>
    );
  }
}

export default ViewCampaign;

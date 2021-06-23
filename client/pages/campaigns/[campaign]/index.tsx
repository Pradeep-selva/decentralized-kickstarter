import React, { Component } from "react";
import {
  Container,
  Image,
  Card,
  Grid,
  Divider,
  Button,
  Icon
} from "semantic-ui-react";
import Link from "next/link";
import Head from "next/head";
import { ContributionForm } from "../../../components";
import styles from "../../../styles/Pages.module.css";
import homeStyles from "../../../styles/Home.module.css";
import { web3 } from "../../../instances";
import { CampaignSummary } from "../../../types";
import { getCampaignData } from "../../../utils";
import RouteNames from "../../../config/routes";

interface IProps {
  summary: CampaignSummary;
  address: string;
}

interface IState {
  summary: CampaignSummary;
  address: string;
  isManager: boolean;
}

class ViewCampaign extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      summary: props.summary,
      address: props.address,
      isManager: false
    };
  }

  static async getInitialProps(context) {
    const address = context.query.campaign;
    const summary = await getCampaignData(address);

    return { summary, address };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();

    this.setState({
      isManager: accounts[0] === this.props.summary.manager
    });
  }

  renderCards = () => {
    const {
      summary: { balance, contributors, manager, minContribution, numRequests },
      address
    } = this.state;

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

  refreshCallBack = (contribution: number) =>
    this.setState({
      summary: {
        ...this.state.summary,
        contributors: (
          parseInt(this.props.summary.contributors) + 1
        ).toString(),
        balance: (
          parseInt(this.props.summary.balance) + contribution
        ).toString()
      }
    });

  render() {
    const {
      summary: { title, description, image, minContribution },
      address,
      isManager
    } = this.state;

    return (
      <div>
        <Head>
          <title>D K: Campaign {address}</title>
          <meta
            name='description'
            content={`Decentralized KickStarter - details of campaign ${address}`}
          />
        </Head>
        <main className={homeStyles.main}>
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
                  <Grid centered>
                    <Button size={"huge"} primary className={styles.marginTop}>
                      <Link
                        href={RouteNames.requestsByCampaign.absolute}
                        as={RouteNames.requestsByCampaign.as(address)}
                      >
                        View Requests
                      </Link>
                    </Button>
                    {isManager && (
                      <Button
                        size={"huge"}
                        primary
                        className={styles.marginTop}
                      >
                        <Link
                          href={RouteNames.editCampaign.absolute}
                          as={RouteNames.editCampaign.as(address)}
                        >
                          Edit Campaign
                        </Link>
                      </Button>
                    )}
                  </Grid>
                  <Divider horizontal className={styles.margin}>
                    .
                  </Divider>
                  <ContributionForm
                    minContribution={minContribution}
                    address={address}
                    callback={this.refreshCallBack}
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
        </main>
      </div>
    );
  }
}

export default ViewCampaign;

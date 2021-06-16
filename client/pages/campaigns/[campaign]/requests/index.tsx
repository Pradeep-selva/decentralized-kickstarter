import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { Container, Button, Icon } from "semantic-ui-react";
import {
  approveRequest,
  getCampaignData,
  getCampaignRequests
} from "../../../../utils";
import styles from "../../../../styles/Pages.module.css";
import homeStyles from "../../../../styles/Home.module.css";
import { CustomTable, Layout, StatusIndicator } from "../../../../components";
import RouteNames from "../../../../config/routes";
import { getRequestColumns } from "../../../../config";
import { DataCell } from "../../../../types";
import { web3 } from "../../../../instances";

interface IProps {
  requests: Array<any>;
  address: string;
  contributors: string;
  manager: string;
}

interface IState {
  user: string;
  tableColumns: Array<DataCell>;
  showStatus: boolean;
  loading: boolean;
  failMessage: string;
}

class Requests extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      tableColumns: [],
      failMessage: "",
      loading: false,
      showStatus: false,
      user: ""
    };
  }

  static async getInitialProps(context) {
    const address = context.query.campaign;
    const requests = await getCampaignRequests(address);
    const { contributors, manager } = await getCampaignData(address);

    return { requests, address, contributors, manager };
  }

  async componentDidMount() {
    const { contributors, manager } = this.props;
    const accounts = await web3.eth.getAccounts();

    const tableColumns = await getRequestColumns({
      contributors,
      manager,
      user: accounts[0],
      functions: {
        approveRequest: this.handleApproval
      }
    });

    this.setState({ tableColumns, user: accounts[0] });
  }

  handleApproval = async (index: number) => {
    this.toggleLoading();
    this.setState({
      showStatus: true
    });

    const { address } = this.props;
    const { user } = this.state;

    const err = await approveRequest(address, user, index);

    if (err) {
      this.setState({
        failMessage: !!user
          ? err.message.includes("MetaMask")
            ? err.message
            : "Transaction failed! You aren't a contributor or have already contributed."
          : "Transaction failed! Make sure you have metamask installed to make a transaction."
      });
    } else {
      this.setState({
        failMessage: ""
      });
    }

    this.toggleLoading();
    setTimeout(() => {
      this.setState({ showStatus: false });
      Router.reload();
    }, 5000);
  };

  toggleLoading = () => this.setState((state) => ({ loading: !state.loading }));

  render() {
    const { requests, address } = this.props;
    const { failMessage, loading, showStatus, tableColumns } = this.state;

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
            <div style={{ marginTop: "4rem" }}>
              {showStatus && (
                <StatusIndicator
                  icon
                  status={
                    loading
                      ? "waiting"
                      : !!failMessage.length
                      ? "error"
                      : "success"
                  }
                  error={failMessage}
                  success={"Your campaign was successfully created!"}
                />
              )}
              {!!requests.length ? (
                <CustomTable data={requests} columns={tableColumns} />
              ) : (
                <div
                  className={styles.centerContainer}
                  style={{ marginTop: "25vh" }}
                >
                  <Icon name={"folder open outline"} size={"massive"} />
                  <h2>There haven't been any requests created yet!</h2>
                </div>
              )}
            </div>
          </Container>
        </Layout>
      </main>
    );
  }
}

export default Requests;

import React, { Component } from "react";
import Link from "next/link";
import { Container, Button, Icon } from "semantic-ui-react";
import { getCampaignData, getCampaignRequests } from "../../../../utils";
import styles from "../../../../styles/Pages.module.css";
import homeStyles from "../../../../styles/Home.module.css";
import { CustomTable, Layout } from "../../../../components";
import RouteNames from "../../../../config/routes";
import { getRequestColumns } from "../../../../config";
import { DataCell } from "../../../../types";

interface IProps {
  requests: Array<any>;
  address: string;
  contributors: string;
  manager: string;
}

interface IState {
  tableColumns: Array<DataCell>;
}

class Requests extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      tableColumns: []
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
    const tableColumns = await getRequestColumns({ contributors, manager });

    this.setState({ tableColumns });
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
            <div style={{ marginTop: "4rem" }}>
              {!!requests.length ? (
                <CustomTable
                  data={requests}
                  columns={this.state.tableColumns}
                />
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

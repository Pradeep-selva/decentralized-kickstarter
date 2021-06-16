import React, { Component } from "react";
import Head from "next/head";
import { Container } from "semantic-ui-react";
import { Layout } from "../../../../components";

interface IProps {
  address: string;
}

class NewRequest extends Component<IProps, {}> {
  static async getInitialProps(context) {
    const address = context.query.campaign;

    return { address };
  }
  render() {
    const { address } = this.props;
    return (
      <div>
        <Head>
          <title>D K: New Request for {address}</title>
          <meta
            name='description'
            content={`Decentralized KickStarter - New request for campaign ${address}`}
          />
        </Head>
        <main>
          <Layout>
            <Container>
              <h1>New Request</h1>
            </Container>
          </Layout>
        </main>
      </div>
    );
  }
}

export default NewRequest;

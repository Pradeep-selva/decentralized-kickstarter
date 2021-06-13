import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Card, Container } from "semantic-ui-react";
import { Factory } from "../instances";
import { Campaign } from "../types";
import { CampaignCard, Layout } from "../components";

interface IProps {
  campaigns: Array<Campaign>;
  error: string;
}

class Home extends React.Component<IProps, any> {
  static async getInitialProps() {
    try {
      const payload = await Factory.methods?.getCampaigns()?.call();
      const campaigns: Array<Campaign> = Array.from({
        length: payload[0].length
      }).map((_, index) => ({
        address: payload[0][index],
        title: payload[1][index],
        description: payload[2][index]
      }));

      return { campaigns };
    } catch (error) {
      return { error };
    }
  }

  render() {
    const { error, campaigns } = this.props;

    return (
      <div>
        <Head>
          <title>Decentralized kickstarter</title>
          <meta name='description' content='Decentralized Kickstarter' />
        </Head>

        <main className={styles.main}>
          <Layout>
            {!error && !!campaigns.length && (
              <Container>
                <Card.Group>
                  {campaigns.map(({ address, title, description }, index) => (
                    <CampaignCard
                      address={address}
                      title={title}
                      description={description}
                      key={index}
                    />
                  ))}
                </Card.Group>
              </Container>
            )}
          </Layout>
        </main>
      </div>
    );
  }
}

export default Home;

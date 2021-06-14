import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Button, Card, Grid } from "semantic-ui-react";
import { Factory } from "../instances";
import { Campaign } from "../types";
import { CampaignCard, Layout } from "../components";
import RouteNames from "../routes";

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
        description: payload[2][index],
        image: payload[3][index]
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
          <title>Decentralized Kickstarter</title>
          <meta name='description' content='Decentralized Kickstarter' />
        </Head>

        <main className={styles.main}>
          <Layout>
            <Grid columns={2} centered divided>
              <Grid.Row>
                <Grid.Column computer={"2"} mobile={"12"} textAlign={"center"}>
                  <div style={{ marginBottom: "4vh" }}>
                    <h2>Want to get your dreams funded?</h2>
                    <Button size={"huge"} color={"blue"}>
                      <Link href={RouteNames.newCampaign}>Create Campaign</Link>
                    </Button>
                  </div>
                </Grid.Column>
                <Grid.Column computer={"10"} mobile={"12"}>
                  {!error && !!campaigns.length && (
                    <Card.Group>
                      {campaigns.map(
                        ({ address, title, description, image }, index) => (
                          <CampaignCard
                            address={address}
                            title={title}
                            description={description}
                            image={image}
                            key={index}
                          />
                        )
                      )}
                    </Card.Group>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Layout>
        </main>
      </div>
    );
  }
}

export default Home;

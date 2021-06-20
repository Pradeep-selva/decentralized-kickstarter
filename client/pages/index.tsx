import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Button, Card, Grid } from "semantic-ui-react";
import { Campaign } from "../types";
import { CampaignCard } from "../components";
import RouteNames from "../config/routes";
import { getAllCampaigns } from "../utils";

interface IProps {
  campaigns: Array<Campaign>;
  error: string;
}

class Home extends React.Component<IProps, any> {
  static async getInitialProps() {
    const [campaigns, error] = await getAllCampaigns();
    return { campaigns, error };
  }

  render() {
    const { error, campaigns } = this.props;

    return (
      <div>
        <Head>
          <title>Decentralized KickStarter</title>
          <meta
            name='description'
            content='Decentralized KickStarter - home page'
          />
        </Head>

        <main className={styles.main}>
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
        </main>
      </div>
    );
  }
}

export default Home;

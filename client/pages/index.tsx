import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Button, Card, Grid } from "semantic-ui-react";
import { CampaignCard } from "../components";
import RouteNames from "../config/routes";
import { filterCampaigns, getAllCampaigns } from "../utils";
import { HomeProps } from "../types";
import Context from "../context/context";

class Home extends React.Component<HomeProps, {}> {
  static async getInitialProps() {
    const [campaigns, error] = await getAllCampaigns();
    return { campaigns, error };
  }

  render() {
    const { error, campaigns } = this.props;

    return (
      <Context.Consumer>
        {(context) => (
          <div>
            <Head>
              <title>Decentralized KickStarter</title>
              <meta
                name='description'
                content='A funding website for startups, like kickstarter, but built decentralized with ethereum based on a contribute-approve model, where contributors of a campaign must approve transaction requests of campaign managers, to reduce scams.'
              />
              <meta
                property='og:site_name'
                content='Decentralized KickStarter'
              />
              <meta
                property='og:description'
                content='A funding website for startups, like kickstarter, but built decentralized with ethereum based on a contribute-approve model, where contributors of a campaign must approve transaction requests of campaign managers, to reduce scams.'
              />
              <meta property='og:title' content='Home' />
            </Head>

            <main className={styles.main}>
              <Grid columns={2} centered divided>
                <Grid.Row>
                  <Grid.Column
                    computer={"2"}
                    mobile={"12"}
                    textAlign={"center"}
                  >
                    <div style={{ marginBottom: "4vh" }}>
                      <h2>Want to get your dreams funded?</h2>
                      <Button size={"huge"} color={"blue"}>
                        <Link href={RouteNames.newCampaign}>
                          Create Campaign
                        </Link>
                      </Button>
                    </div>
                  </Grid.Column>
                  <Grid.Column computer={"10"} mobile={"12"}>
                    {!error && !!campaigns.length && (
                      <Card.Group>
                        {filterCampaigns(context.searchKey, campaigns).map(
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
        )}
      </Context.Consumer>
    );
  }
}

export default Home;

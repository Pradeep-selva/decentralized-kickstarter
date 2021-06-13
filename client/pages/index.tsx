import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Factory } from "../instances";
import { Campaign } from "../types";

interface IProps {
  campaigns: Array<string>;
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
    console.log(this.props);

    return (
      <div className={styles.container}>
        <Head>
          <title>Decentralized kickstarter</title>
          <meta name='description' content='Decentralized Kickstarter' />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Decentralized Kickstarter</h1>
        </main>
      </div>
    );
  }
}

export default Home;

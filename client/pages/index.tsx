import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Factory } from "../instances";

interface IProps {
  campaigns: Array<string>;
  error: string;
}

class Home extends React.Component<IProps, any> {
  static async getInitialProps() {
    try {
      const campaigns = await Factory.methods?.getCampaigns()?.call();
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
          <h1 className={styles.title}>
            Decentralized Kickstarter - {this.props.campaigns[0]}
          </h1>
        </main>
      </div>
    );
  }
}

export default Home;

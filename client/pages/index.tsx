import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Decentralized Kickstarter' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Decentralized Kickstarter</h1>
      </main>
    </div>
  );
};

export default Home;

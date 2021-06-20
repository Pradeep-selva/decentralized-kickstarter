import React from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { GithubButton, Layout } from "../components";

const App = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GithubButton />
    </React.Fragment>
  );
};

export default App;

import React from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { GithubButton, Layout } from "../components";
import ContextProvider from "../context";

const App = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GithubButton />
    </ContextProvider>
  );
};

export default App;

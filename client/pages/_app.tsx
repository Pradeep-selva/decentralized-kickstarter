import React from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { GithubButton } from "../components";

const App = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <GithubButton />
    </React.Fragment>
  );
};

export default App;

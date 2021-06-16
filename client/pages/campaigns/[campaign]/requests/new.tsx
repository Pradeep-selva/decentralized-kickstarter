import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Layout } from "../../../../components";

class NewRequest extends Component {
  render() {
    return (
      <main>
        <Layout>
          <Container>
            <h1>New Request</h1>
          </Container>
        </Layout>
      </main>
    );
  }
}

export default NewRequest;

import React, { Component } from "react";
import { Campaign } from "../../../../instances";

interface IProps {
  requests: Array<any>;
}

class Requests extends Component<IProps, {}> {
  static async getInitialProps(context) {
    const campaign = Campaign(context.query.campaign);

    const numRequests = await campaign.methods.getRequestCount()?.call();
    const payload = Array(numRequests).map(
      async (_, index) => await campaign.methods.requests(index)?.call()
    );

    const requests = await Promise.all(payload);

    return { requests };
  }
  render() {
    console.log(this.props.requests);
    return <div></div>;
  }
}

export default Requests;

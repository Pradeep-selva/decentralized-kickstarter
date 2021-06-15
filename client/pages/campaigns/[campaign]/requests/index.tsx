import React, { Component } from "react";
import { Campaign } from "../../../../instances";
import { getCampaignRequests } from "../../../../utils";

interface IProps {
  requests: Array<any>;
}

class Requests extends Component<IProps, {}> {
  static async getInitialProps(context) {
    const requests = await getCampaignRequests(context.query.campaign);
    return { requests };
  }
  render() {
    console.log(this.props.requests);
    return <div></div>;
  }
}

export default Requests;

import { Campaign, web3 } from "../instances";
import { CampaignSummary, Request } from "../types";

export const getCampaignData = async (
  address: string
): Promise<CampaignSummary> => {
  const campaign = Campaign(address);
  const payload = await campaign.methods.getSummary()?.call();

  const summary: CampaignSummary = {
    minContribution: payload[0],
    numRequests: payload[1],
    contributors: payload[2],
    balance: payload[3],
    title: payload[4],
    description: payload[5],
    image: payload[6],
    manager: payload[7]
  };

  return new Promise((resolve) => resolve(summary));
};

export const makeContribution = async (
  address: string,
  account: string,
  payload: number
): Promise<any> => {
  try {
    const campaign = Campaign(address);

    await campaign.methods.contribute()?.send({
      from: account,
      value: payload
    });

    return new Promise((resolve) => resolve(false));
  } catch (err) {
    return new Promise((resolve) => resolve(err));
  }
};

export const getCampaignRequests = async (address: string) => {
  const campaign = Campaign(address);

  const numRequests = await campaign.methods.getRequestCount()?.call();
  const payload = Array(numRequests).map(
    async (_, index) => await campaign.methods.requests(index)?.call()
  );

  const results = await Promise.all(payload);
  const requests: Array<Request> = results.map(
    ({ approvalCount, complete, description, recipient, value }) => ({
      approvalCount,
      complete,
      description,
      recipient,
      value
    })
  );

  return new Promise((resolve) => resolve(requests));
};
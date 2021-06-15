import { Campaign, web3 } from "../instances";
import { CampaignSummary } from "../types";

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

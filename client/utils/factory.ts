import { Factory } from "../instances";
import { Campaign } from "../types";

export const getAllCampaigns = async (): Promise<
  [Array<Campaign> | null, any]
> => {
  try {
    const payload = await Factory.methods?.getCampaigns()?.call();

    return new Promise((resolve) => {
      const campaigns: Array<Campaign> = Array.from({
        length: payload[0].length
      }).map((_, index) => ({
        address: payload[0][index],
        title: payload[1][index],
        description: payload[2][index],
        image: payload[3][index]
      }));

      resolve([campaigns, null]);
    });
  } catch (error) {
    return new Promise((resolve) => resolve([null, error]));
  }
};

export const createCampaign = async (
  { description, minContribution, title, image },
  account
): Promise<any> => {
  try {
    await Factory.methods
      .createCampaign(minContribution, title, description, image)
      ?.send({ from: account });

    return new Promise((resolve) => resolve(false));
  } catch (err) {
    return new Promise((resolve) => resolve(err));
  }
};

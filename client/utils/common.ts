import { Campaign } from "../types";

export const filterCampaigns = (
  searchKey: string,
  campaigns: Array<Campaign>
) =>
  campaigns.filter(({ address, description, title }) =>
    [address, description, title].join(" ").toLowerCase().includes(searchKey)
  );

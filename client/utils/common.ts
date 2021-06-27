import { Campaign } from "../types";

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;

  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export const filterCampaigns = (
  searchKey: string,
  campaigns: Array<Campaign>
) =>
  campaigns.filter(({ address, description, title }) =>
    [address, description, title].join(" ").toLowerCase().includes(searchKey)
  );

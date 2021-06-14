export interface Campaign {
  title: string;
  description: string;
  address: string;
  image: string;
}

export interface ProcessedCampaign {
  description: string;
  title: string;
  minContribution: number;
  image: string;
}

export interface CampaignSummary {
  minContribution: string;
  numRequests: string;
  contributors: string;
  balance: string;
  title: string;
  description: string;
  image: string;
  manager: string;
}

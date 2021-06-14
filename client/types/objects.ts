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

export interface CampaignPayload {
  minContribution: string;
  title: string;
  description: string;
  image: string;
}

export interface CampaignErrors {
  minContribution?: string;
  title?: string;
  description?: string;
  image?: string;
}

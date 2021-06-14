export interface CampaignPayload {
  minContribution: string;
  title: string;
  description: string;
}

export interface CampaignErrors {
  minContribution?: string;
  title?: string;
  description?: string;
}

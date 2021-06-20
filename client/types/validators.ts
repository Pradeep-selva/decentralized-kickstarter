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

export interface RequestPayload {
  description: string;
  value: string;
  recipient: string;
}

export interface RequestErrors {
  description?: string;
  value?: string;
  recipient?: string;
}

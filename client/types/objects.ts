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

export interface Request {
  description: string;
  value: string;
  recipient: string;
  approvalCount: number;
  complete: boolean;
}

export interface ProcessedRequest {
  description: string;
  value: number;
  recipient: string;
}

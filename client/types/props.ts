import { NextRouter } from "next/router";
import { DataCell, Status } from "./common";
import { Campaign, CampaignSummary } from "./objects";

export interface ContributeProps {
  minContribution: string;
  address: string;
  callback: Function;
}

export interface TableProps {
  columns: Array<DataCell>;
  data: Array<any>;
  extraData?: any;
}

export interface StatusIndicatorProps {
  status: Status;
  success: string;
  error: string;
  icon?: boolean;
}

export interface HomeProps {
  campaigns: Array<Campaign>;
  error: string;
}

export interface RouterProp {
  router: NextRouter;
}

export interface CampaignDetailProps {
  summary: CampaignSummary;
  address: string;
}

export interface RequestProps {
  requests: Array<any>;
  address: string;
  contributors: string;
  manager: string;
}

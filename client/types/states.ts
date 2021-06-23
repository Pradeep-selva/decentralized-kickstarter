import { DataCell } from "./common";
import { CampaignSummary } from "./objects";
import {
  CampaignErrors,
  CampaignPayload,
  RequestErrors,
  RequestPayload
} from "./validators";

export interface ContributeState {
  error: string | null;
  loading: boolean;
  showConfirm: boolean;
  showStatus: boolean;
  contribution: string;
  failMessage: string;
}

export interface NewCampaignState {
  errors: CampaignErrors | null;
  loading: boolean;
  showConfirm: boolean;
  showStatus: boolean;
  values: CampaignPayload;
  failMessage: string;
}

export interface ViewCampaignState {
  summary: CampaignSummary;
  address: string;
  isManager: boolean;
}

export interface NewRequestState {
  errors: RequestErrors | null;
  loading: boolean;
  showConfirm: boolean;
  showStatus: boolean;
  values: RequestPayload;
  failMessage: string;
}

export interface ViewRequestsState {
  user: string;
  tableColumns: Array<DataCell>;
  showStatus: boolean;
  loading: boolean;
  failMessage: string;
}

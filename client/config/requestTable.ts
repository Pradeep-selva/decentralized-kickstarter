import { Request } from "../types";

export const requestHeaders: Array<keyof Request> = [
  "approvalCount",
  "complete",
  "description",
  "recipient",
  "value"
];

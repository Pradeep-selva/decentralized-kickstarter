export type Status = "waiting" | "success" | "error";

export interface DataCell {
  key: string;
  title: string;
  render?: (value: any) => any;
}

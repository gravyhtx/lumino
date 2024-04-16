// ~/types/_maverick/BoardingApplication/Response/index.ts
import type { Agent, Campaign, Company, Dba, Signature } from "../../types";

export type BoardingApplication = {
  id: number;
  processingMethod: string;
  agent?: Agent;
  campaign?: Campaign;
  company?: Company;
  createdOn: string;
  dba?: Dba;
  signature?: Signature;
  status: string;
  updatedOn: string;
};

export type BoardingApplicationsResponse = {
  items: BoardingApplication[];
  _links: Record<string, unknown>; // Replace with more specific export type if needed
  _meta: Record<string, unknown>; // Replace with more specific export type if needed
};
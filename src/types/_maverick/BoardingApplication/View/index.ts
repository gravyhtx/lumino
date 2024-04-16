// ~/types/_maverick/BoardingApplication/View/index.ts
import type { Agent } from "../../types";

export interface Address {
  street: string | null;
  city: string | null;
  zip: string | null;
  state: { id: number | null };
  country: { id: number };
}

export interface ViewCompany {
  name: string | null;
  type: string | null;
  federalTaxId: string | null;
  address: Address;
  founded: string | null;
}

export interface ViewDba {
  sameAsCompany: 'Yes' | 'No';
  name: string | null;
  address: Address;
}

export interface BusinessLocation {
  buildingType: string | null;
  numberOfLocations: number | null;
  buildingOwnership: string | null;
  areaZoned: string | null;
  squareFootage: number | null;
}

export interface ContactInfo {
  phone: string | null;
  email: string | null;
  fax?: string | null;
}

export interface Principal {
  id: number;
  title: string | null;
  name: { first: string | null; last: string | null };
  dayOfBirth: string | null;
  ssn: string | null;
  nationalId: string | null;
  nationality: { id: number };
  driverLicense: {
    number: string | null;
    expiration: string | null;
    state: { id: number | null };
  };
  address: Address;
  phone: string | null;
  email: string | null;
  ownershipPercentage: number | null;
  isManagement: 'Yes' | 'No';
}

export interface ProcessingVolumes {
  monthlyTransactionAmount: number | null;
  avgTransactionAmount: number | null;
  maxTransactionAmount: number | null;
}

export interface ProcessingSales {
  swiped: number | null;
  mail: number | null;
  internet: number | null;
}

export interface Processing {
  bank: {
    accountNumber: string | null;
    routingNumber: string | null;
  };
  banks: unknown[]; // specify further if possible
  volumes: ProcessingVolumes;
  sales: ProcessingSales;
  alreadyProcessing: {
    isProcessing: 'Yes' | 'No';
    processor: string | null;
  };
  // Add other properties that may be included in the response
}

export interface ViewSignature {
  status: 'Unsigned' | 'Signed'; // Adjust as needed
  via: string | null;
}

export interface ViewBoardingApplication {
  id: number;
  processingMethod: string;
  mcc: string | null;
  campaign: { id: number };
  company: ViewCompany;
  dba: ViewDba;
  website: string | null;
  serviceDescription: string | null;
  mailingAddress: string;
  businessLocation: BusinessLocation;
  customerServiceContact: ContactInfo;
  corporateContact: ContactInfo;
  bankruptcy: {
    hasBankruptcy: string | null;
    description: string | null;
  };
  principals: Principal[];
  processing: Processing;
  // Add other properties such as ach, documents, agent, signature, etc.
  ach: unknown; // specify further if possible
  documents: unknown[]; // specify further if possible
  agent: Agent;
  signature: ViewSignature;
  // Add other properties that may be included in the response
  status: string;
  updatedOn: string;
  createdOn: string;
}

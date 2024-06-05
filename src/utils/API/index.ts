// import type { APIErrorResponse } from '~/schema';
import type { BoardingApplicationsResponse, ViewBoardingApplication } from '~/types/_maverick';
export * from './helpers';

export const getGHLAuth = async (): Promise<void> => {
  const response = await fetch('/api/oauth/init');
  if (!response.ok) {
    console.error('Failed to start the OAuth flow');
    throw new Error('Failed to fetch the OAuth initiation endpoint');
  }

  const json = await response.json() as object;
  if ('url' in json) {
    window.location.href = json.url as string;
  }
};

/**
 * Fetch documents for a specific boarding application from the Next.js API route.
 * @returns A promise that resolves with the documents data.
 */
export const getBoardingApplications = async (): Promise<BoardingApplicationsResponse> => {
  const response = await fetch('/api/boarding-applications');
  if (!response.ok) {
    throw new Error('Failed to fetch boarding applications');
  }
  return response.json() as Promise<BoardingApplicationsResponse>;
};

export const viewBoardingApplication = async (applicationId: string): Promise<ViewBoardingApplication> => {
  const response = await fetch(`/api/boarding-applications/${applicationId}`);
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }
  return response.json() as Promise<ViewBoardingApplication>;
};

export const getPayments = async (): Promise<ViewBoardingApplication> => {
  const response = await fetch(`/api/payments`);
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }
  return response.json() as Promise<ViewBoardingApplication>;
};

export const getCustomerVault = async (): Promise<ViewBoardingApplication> => {
  const response = await fetch(`/api/customer-vault`);
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }
  return response.json() as Promise<ViewBoardingApplication>;
};
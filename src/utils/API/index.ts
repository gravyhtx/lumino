import type { APIErrorResponse, Documents } from '~/schema';

export * from './helpers';

/**
 * Fetch documents for a specific boarding application from the Next.js API route.
 * @param applicationId - The ID of the boarding application.
 * @returns A promise that resolves with the documents data.
 */
export const fetchBoardingAppDocuments = async (applicationId: string): Promise<Documents> => {
  const response = await fetch(`/api/boarding-applications/${applicationId}/documents`);

  if (!response.ok) {
    const errorData = await response.json() as APIErrorResponse;
    throw new Error(errorData.message);
  }

  const documents = await response.json() as Documents;
  return documents;
};
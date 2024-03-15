// pages/api/boarding-applications/[applicationId]/documents.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { documentsSchema, type Documents } from '~/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { applicationId } = req.query;
  console.log(applicationId)

  // if (typeof applicationId !== 'string') {
  //   res.status(400).json({ message: 'Application ID must be a string.' });
  //   return;
  // }

  const maverickAPIUrl = `https://sandbox-dashboard.maverickpayments.com/api/boarding-application/${String(applicationId)}/documents`;

  const fetchOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MAVERICK_API_KEY}`,
    },
  };

  try {
    const maverickResponse = await fetch(maverickAPIUrl, fetchOptions);
    console.log(maverickResponse)
    console.log(maverickAPIUrl)

    if (!maverickResponse.ok) {
      throw new Error(`Error from MaverickPayments API: ${maverickResponse.status}`);
    }

    const responseData = (await maverickResponse.json()) as Documents;

    // Use the documentsSchema to parse and validate the response data
    const documents = documentsSchema.parse(responseData);

    res.status(200).json(documents);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occurred during the fetch operation' });
    }
  }
}
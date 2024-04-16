// pages/api/boarding-applications/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PaymentsResponse } from '~/types/_maverick';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const maverickAPIUrl = 'https://gateway.maverickpayments.com/payments';

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MAVERICK_API_KEY_SECRET}`,
    },
  };

  try {
    const maverickResponse = await fetch(maverickAPIUrl, fetchOptions);
    const data = await maverickResponse.json() as PaymentsResponse;
    res.status(200).json(data);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    const errorStack = (error as Error).stack;
    console.log(error)
    res.status(500).json({ message: 'An error occurred', error: errorMessage, stack: errorStack });
  }
}
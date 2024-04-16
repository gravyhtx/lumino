import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const maverickAPIUrl = 'https://sandbox-dashboard.maverickpayments.com/api/customer-vault';

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MAVERICK_API_KEY}`,
    },
  };

  try {
    const maverickResponse = await fetch(maverickAPIUrl, fetchOptions);
    if (!maverickResponse.ok) {
      throw new Error(`HTTP error! status: ${maverickResponse.status}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await maverickResponse.json();
    res.status(200).json(data);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    const errorStack = (error as Error).stack;
    console.log(error)
    res.status(500).json({ message: 'An error occurred', error: errorMessage, stack: errorStack });
  }
}
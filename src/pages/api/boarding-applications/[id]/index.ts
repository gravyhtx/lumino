// pages/api/boarding-applications/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ViewBoardingApplication } from '~/types/_maverick';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const maverickAPIUrl = `https://sandbox-dashboard.maverickpayments.com/api/boarding-application/${String(id)}`;
  console.log(maverickAPIUrl)

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MAVERICK_API_KEY}`,
    },
  };

  try {
    const maverickResponse = await fetch(maverickAPIUrl, fetchOptions);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await maverickResponse.json() as ViewBoardingApplication;
    res.status(200).json(data);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    const errorStack = (error as Error).stack;
    console.log(error)
    res.status(500).json({ message: 'An error occurred', error: errorMessage, stack: errorStack });
  }
}
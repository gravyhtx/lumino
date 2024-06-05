// pages/api/oauth/callback/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { code } = req.query;

    if (typeof code !== 'string') {
      res.status(400).json({ error: 'Invalid Authorization Code' });
      return;
    }

    try {
      const response = await fetch('https://marketplace.gohighlevel.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: process.env.GHL_CLIENT_ID,
          client_secret: process.env.GHL_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3000/api/oauth/callback',
          code,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      console.log(data)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const accessToken = String(data.access_token);

      // Store the Access Token securely (e.g., in a database or session)
      console.log('Access Token:', accessToken);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error exchanging Authorization Code for Access Token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
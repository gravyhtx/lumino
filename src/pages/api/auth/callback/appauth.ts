// pages/api/oauth/callback/signin.ts
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
          grantType: 'authorization_code',
          clientId: "65726a4b1a924c757aa4caff-lualyztn",
          clientSecret: "d723067a-0ae0-4067-afbe-a3b7186f1005",
          redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/appauth`,
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
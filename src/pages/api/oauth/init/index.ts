// pages/api/oauth/init/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure all environment variables are strings or provide default values
  const clientId = process.env.GHL_CLIENT_ID ?? '';
  const redirectUri = 'http://localhost:3000/api/oauth/callback';

  // Initialize URLSearchParams with an object
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'conversations/message.readonly conversations/message.write',
  });

  const oauthUrl = `https://marketplace.gohighlevel.com/oauth/chooselocation?${params.toString()}`;

  // Redirect the user to the OAuth URL
  res.redirect(oauthUrl);
}
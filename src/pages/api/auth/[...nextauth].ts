
// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";

// const clientId = process.env.GHL_CLIENT_ID ?? '';
// const redirectUri = 'http://localhost:3000/api/auth/callback/signin';
// const params = new URLSearchParams({
//   response_type: 'code',
//   client_id: clientId,
//   redirect_uri: redirectUri,
//   scope: 'conversations/message.readonly conversations/message.write',
// });

const goHighLevelProvider = {
  id: 'appauth' as const,
  name: 'GoHighLevel' as const,
  type: 'oauth' as const,
  clientId: "65726a4b1a924c757aa4caff-lualyztn",
  authorization: {
    url: 'https://marketplace.gohighlevel.com/oauth/chooselocation' as const,
    params: {
      responseType: 'code' as const,
      redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/appauth` as const,
      clientId: "65726a4b1a924c757aa4caff-lualyztn",
      scope: 'conversations/message.readonly conversations/message.write',
    },
  },
  token: {
    url: 'https://marketplace.gohighlevel.com/oauth/token',
    params: {
      grantType: 'authorization_code',
      clientId: "65726a4b1a924c757aa4caff-lualyztn",
      clientSecret: "d723067a-0ae0-4067-afbe-a3b7186f1005",
      redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/appauth`,
    },
  },
  userInfo: 'https://api.gohighlevel.com/api/v1/users/me',
  profile(profile: { id: string; name: string; email: string; avatar: string; }) {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      image: profile.avatar,
    };
  },
};

const options = {
  providers: [goHighLevelProvider],
  pages: {
    signIn: '/',
  },
  debug: true,
};

export default NextAuth(options);

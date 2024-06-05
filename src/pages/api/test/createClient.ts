/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// pages/api/test/createClient.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { ClientType } from "@prisma/client";
import { createClient } from "~/lib/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { type, name, email } = req.body;

    try {
      const client = await createClient({
        type: ClientType[type as keyof typeof ClientType],
        name,
        email,
      });

      res.status(201).json(client);
    } catch (error) {
      console.error("Failed to create client:", error);
      res.status(500).json({ error: "Failed to create client" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
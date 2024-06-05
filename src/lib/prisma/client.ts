/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient, type ClientType } from "@prisma/client";

type ClientCreateInput = {
  type: ClientType;
  name: string;
  email: string;
};

const prisma = new PrismaClient();

export async function createClient(clientData: ClientCreateInput): Promise<ClientCreateInput> {
  try {
    const client = await prisma.client.create({
      data: clientData,
    }) as ClientCreateInput;
    console.log('Client created:', client);
    return client;
  } catch (error) {
    console.error("Failed to create client:", error);
    throw error;
  }
}


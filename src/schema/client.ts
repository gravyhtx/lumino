// ~/schema/client.ts

import { z } from 'zod';

export const ClientType = z.enum(['AGENT', 'MERCHANT']);

export const ClientSchema = z.object({
  id: z.string().cuid().optional(),
  type: ClientType.default('MERCHANT'),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Client = z.infer<typeof ClientSchema>;
// ~/schema/transaction.ts
import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  clientId: z.string().cuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Customer = z.infer<typeof CustomerSchema>;
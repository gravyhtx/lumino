// ~/schema/payout.ts
import { z } from 'zod';

export const PayoutStatus = z.enum(['PENDING', 'PAID', 'CANCELLED']);

export const PayoutSchema = z.object({
  id: z.string().cuid().optional(),
  amount: z.number(),
  currency: z.string(),
  status: PayoutStatus,
  date: z.date(),
  clientId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Payout = z.infer<typeof PayoutSchema>;

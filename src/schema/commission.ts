// ~/schema/commission.ts
import { z } from 'zod';

export const CommissionSchema = z.object({
  id: z.string().cuid().optional(),
  amount: z.number(),
  currency: z.string(),
  transactionId: z.string(),
  clientId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Commission = z.infer<typeof CommissionSchema>;
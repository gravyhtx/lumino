// ~/schema/transaction.ts
import { z } from 'zod';

export const TransactionStatus = z.enum(['PENDING', 'SUCCESS', 'FAILED']);

export const TransactionSchema = z.object({
  id: z.string().cuid().optional(),
  amount: z.number().positive(),
  currency: z.string().min(3).max(3),
  status: TransactionStatus,
  customerId: z.string().cuid(),
  clientId: z.string().cuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
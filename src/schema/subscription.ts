// ~/schema/subscription.ts
import { z } from 'zod';

export const SubscriptionSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1),
  price: z.number().positive(),
  currency: z.string().min(3).max(3),
  clientId: z.string().cuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;
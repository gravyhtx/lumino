// ~/types/_maverick/CustomerVault/index.ts
import { z } from 'zod';

const LinkSchema = z.object({
  href: z.string(),
});

const CustomerSchema = z.object({
  id: z.string(),
  dba: z.object({
    id: z.string(),
  }),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string().nullable(),
  email: z.string(),
  website: z.string().nullable(),
  phone: z.string(),
  altPhone: z.string().nullable(),
  identificator: z.string(),
  description: z.string(),
  archived: z.enum(['Yes', 'No']),
  updatedOn: z.string(),
  createdOn: z.string(),
  _links: LinkSchema.optional(),
});

/**
 * Zod schema for validating the structure of the customer's vault data.
 * This schema defines the rules and constraints for the data received from the API,
 * ensuring it matches the expected format, types, and presence of necessary fields.
 *
 * @example
 * ```typescript
 * try {
 *   const validatedData = CustomersVaultSchema.parse(apiData);
 *   // Use validatedData here...
 * } catch (error) {
 *   console.error("Data validation failed", error);
 * }
 * ```
 */
export const CustomerVaultSchema = z.object({
  items: z.array(CustomerSchema),
  _links: LinkSchema.optional(),
  _meta: z.object({
    totalCount: z.number(),
    pageCount: z.number(),
    currentPage: z.number(),
    perPage: z.number(),
  }),
});

/**
 * TypeScript type representing the structure of the customer's vault data.
 * This type is inferred from the CustomersVaultSchema and is used for compile-time
 * type checking, ensuring that variables and parameters throughout the codebase
 * adhere to the structure defined by the Zod schema.
 *
 * @example
 * ```typescript
 * const customerData: CustomersVault = {
 *   // Structure matching the CustomersVaultSchema
 * };
 * ```
 */
export type CustomerVault = z.infer<typeof CustomerVaultSchema>;
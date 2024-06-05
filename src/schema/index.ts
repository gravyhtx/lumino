export * from './client';
export * from './commission';
export * from './customer';
export * from './payout';
export * from './subscription';
export * from './transaction';
// import { z } from 'zod';

// export const attachmentSchema = z.object({
//   id: z.number(),
// });

// export const principalSchema = z.object({
//   id: z.number().nullable(),
// });

// export const documentItemSchema = z.object({
//   attachment: attachmentSchema,
//   about: z.array(z.number()),
//   principal: principalSchema,
// });

// export const linkSchema = z.object({
//   href: z.string().url(),
// });

// export const linksSchema = z.object({
//   self: linkSchema,
//   first: linkSchema,
//   last: linkSchema,
// });

// export const metaSchema = z.object({
//   totalCount: z.number(),
//   pageCount: z.number(),
//   currentPage: z.number(),
//   perPage: z.number(),
// });

// export const documentsSchema = z.object({
//   items: z.array(documentItemSchema),
//   _links: linksSchema,
//   _meta: metaSchema,
// });

// // This is the type inferred from the schema, you can use it for TypeScript type checking
// export type Documents = z.infer<typeof documentsSchema>;

// export default documentsSchema;

// export interface DocumentAttachment {
//   id: number;
// }

// export interface DocumentItem {
//   attachment: DocumentAttachment;
//   about: number[];
//   principal: {
//     id: number | null;
//   };
// }

// export interface DocumentsLinks {
//   self: { href: string };
//   first: { href: string };
//   last: { href: string };
// }

// export interface DocumentsMeta {
//   totalCount: number;
//   pageCount: number;
//   currentPage: number;
//   perPage: number;
// }

// export interface APIErrorResponse {
//   message: string;
// }
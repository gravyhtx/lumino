import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// interface Env {
//   DATABASE_URL: string;
//   NODE_ENV: 'development' | 'test' | 'production';
//   NEXTAUTH_SECRET?: string;
//   NEXTAUTH_URL?: string;
//   MAVERICK_API_URL: string;
//   MAVERICK_API_TEST_URL: string;
//   MAVERICK_API_TEST_KEY: string;
//   MAVERICK_API_KEY: string;
//   GHL_URL: string;
//   GHL_CLIENT_ID: string;
//   GHL_CLIENT_SECRET: string;
//   SUPABASE_URL: string;
//   SUPABASE_API_KEY: string;
//   SUPABASE_SERVICE_ROLE_KEY: string;
// }

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().refine(
      (str) => str.startsWith("postgres://") || str.startsWith("file:"),
      { message: "DATABASE_URL must be a valid PostgreSQL or SQLite connection string." }
    ),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET: z.string().optional(),
    NEXTAUTH_URL: z.string().url().optional(),
    MAVERICK_API_URL: z.string().url(),
    MAVERICK_API_TEST_URL: z.string().url(),
    MAVERICK_API_TEST_KEY: z.string(),
    MAVERICK_API_KEY: z.string(),
    GHL_URL: z.string().url(),
    GHL_CLIENT_ID: z.string(),
    GHL_CLIENT_SECRET: z.string(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_API_KEY: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    MAVERICK_API_URL: process.env.MAVERICK_API_URL,
    MAVERICK_API_TEST_URL: process.env.MAVERICK_API_TEST_URL,
    MAVERICK_API_TEST_KEY: process.env.MAVERICK_API_TEST_KEY,
    MAVERICK_API_KEY: process.env.MAVERICK_API_KEY,
    GHL_URL: process.env.GHL_URL,
    GHL_CLIENT_ID: process.env.GHL_CLIENT_ID,
    GHL_CLIENT_SECRET: process.env.GHL_CLIENT_SECRET,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

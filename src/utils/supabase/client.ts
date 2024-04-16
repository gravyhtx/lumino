// ~/utils/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    String(process.env.SUPABASE_URL),
    String(process.env.SUPABASE_API_KEY),
  );
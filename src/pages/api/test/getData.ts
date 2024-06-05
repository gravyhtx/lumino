// pages/api/getClients.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '~/env';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_API_KEY;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { data, error } = await supabase
    .from('Client')
    .select('*');

  if (error) {
    console.error('Error fetching clients:', error);
    return res.status(500).json({ error: 'Failed to fetch clients' });
  }

  res.status(200).json(data);
}

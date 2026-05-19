import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type RoundResult = {
  round: number;
  stat: string;
  player_value: number;
  villain_value: number;
  winner: 'player' | 'villain' | 'draw';
};

export type BattleResult = {
  id?: string;
  wallet_address: string;
  nft_token_id: number;
  nft_name: string;
  villain_id: string;
  villain_name: string;
  player_wins: number;
  villain_wins: number;
  winner: 'player' | 'villain' | 'draw';
  rounds: RoundResult[];
  created_at?: string;
};
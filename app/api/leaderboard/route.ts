import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {

  const { data } =
    await supabase
      .from(
        'leaderboard'
      )
      .select('*')
      .order(
        'wins',
        {
          ascending:
            false,
        }
      )
      .limit(50);

  return NextResponse.json(
    data ?? []
  );
}
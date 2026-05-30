import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const data = await request.json();
  console.log('X HANDLE:', data.x_handle);
  console.log('BATTLE DATA RECEIVED:', data);

  const wallet =
  data.wallet_address === 'street-league' && data.x_handle
    ? data.x_handle
    : data.wallet_address;
  const winner = data.winner;

const { data: existingRows } = await supabase
  .from(
  data.wallet_address === 'street-league'
    ? 'street_leaderboard'
    : 'leaderboard'
)
  .select('*')
.eq(
  data.wallet_address === 'street-league'
    ? 'x_handle'
    : 'wallet_address',
  wallet
);

const existing =
  existingRows?.[0];

  console.log('EXISTING:', existing);

  if (existing) {
    const { error: updateError } = await supabase
      .from(
  data.wallet_address === 'street-league'
    ? 'street_leaderboard'
    : 'leaderboard'
)
      .update({
        wins: existing.wins + (winner === 'player' ? 1 : 0),
        games: existing.games + 1,
        updated_at: new Date().toISOString(),
      })
      .eq(
  data.wallet_address === 'street-league'
    ? 'x_handle'
    : 'wallet_address',
  wallet
);

    console.log('UPDATE ERROR:', updateError);
  } else {
    const { error: insertError } = await supabase
      .from(
  data.wallet_address === 'street-league'
    ? 'street_leaderboard'
    : 'leaderboard'
)
.insert(
  data.wallet_address === 'street-league'
    ? {
        x_handle: wallet,
        wins: winner === 'player' ? 1 : 0,
        games: 1,
      }
    : {
        wallet_address: wallet,
        wins: winner === 'player' ? 1 : 0,
        games: 1,
      }
);

    console.log('INSERT ERROR:', insertError);
  }

  return NextResponse.json({
    success: true,
  });
}
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const data = await request.json();

  console.log('BATTLE DATA RECEIVED:', data);

  const wallet = data.wallet_address;
  const winner = data.winner;

const { data: existingRows } = await supabase
  .from('leaderboard')
  .select('*')
  .eq(
    'wallet_address',
    data.wallet_address
  );

const existing =
  existingRows?.[0];

  console.log('SELECT ERROR:', selectError);
  console.log('EXISTING:', existing);

  if (existing) {
    const { error: updateError } = await supabase
      .from('leaderboard')
      .update({
        wins: existing.wins + (winner === 'player' ? 1 : 0),
        games: existing.games + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('wallet_address', wallet);

    console.log('UPDATE ERROR:', updateError);
  } else {
    const { error: insertError } = await supabase
      .from('leaderboard')
      .insert({
        wallet_address: wallet,
        wins: winner === 'player' ? 1 : 0,
        games: 1,
      });

    console.log('INSERT ERROR:', insertError);
  }

  return NextResponse.json({
    success: true,
  });
}
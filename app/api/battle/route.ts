import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const data = await request.json();

  console.log('BATTLE DATA RECEIVED:', data);

  const winner = data.winner;
  const isStreetLeague = data.league === 'street-league';

  if (isStreetLeague) {
    const xHandle = data.x_handle;
    const walletAddress = data.wallet_address || null;

    if (!xHandle) {
      return NextResponse.json(
        { success: false, error: 'Missing X handle' },
        { status: 400 }
      );
    }

    const { data: existingRows, error: lookupError } = await supabase
      .from('street_leaderboard')
      .select('*')
      .eq('x_handle', xHandle);

    if (lookupError) {
      console.error('LOOKUP ERROR:', lookupError);

      return NextResponse.json(
        { success: false, error: 'Leaderboard lookup failed' },
        { status: 500 }
      );
    }

    const existing = existingRows?.[0];

    if (existing) {
      const { error: updateError } = await supabase
        .from('street_leaderboard')
        .update({
          wallet_address: walletAddress || existing.wallet_address,
          wins: existing.wins + (winner === 'player' ? 1 : 0),
          games: existing.games + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('x_handle', xHandle);

      if (updateError) {
        console.error('UPDATE ERROR:', updateError);

        return NextResponse.json(
          { success: false, error: 'Leaderboard update failed' },
          { status: 500 }
        );
      }
    } else {
      const { error: insertError } = await supabase
        .from('street_leaderboard')
        .insert({
          x_handle: xHandle,
          wallet_address: walletAddress,
          wins: winner === 'player' ? 1 : 0,
          games: 1,
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('INSERT ERROR:', insertError);

        return NextResponse.json(
          { success: false, error: 'Leaderboard insert failed' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  }

  const wallet = data.wallet_address;

  if (!wallet) {
    return NextResponse.json(
      { success: false, error: 'Missing wallet address' },
      { status: 400 }
    );
  }

  const { data: existingRows, error: lookupError } = await supabase
    .from('leaderboard')
    .select('*')
    .eq('wallet_address', wallet);

  if (lookupError) {
    console.error('LOOKUP ERROR:', lookupError);

    return NextResponse.json(
      { success: false, error: 'Leaderboard lookup failed' },
      { status: 500 }
    );
  }

  const existing = existingRows?.[0];

  if (existing) {
    const { error: updateError } = await supabase
      .from('leaderboard')
      .update({
        wins: existing.wins + (winner === 'player' ? 1 : 0),
        games: existing.games + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('wallet_address', wallet);

    if (updateError) {
      console.error('UPDATE ERROR:', updateError);

      return NextResponse.json(
        { success: false, error: 'Leaderboard update failed' },
        { status: 500 }
      );
    }
  } else {
    const { error: insertError } = await supabase
      .from('leaderboard')
      .insert({
        wallet_address: wallet,
        wins: winner === 'player' ? 1 : 0,
        games: 1,
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('INSERT ERROR:', insertError);

      return NextResponse.json(
        { success: false, error: 'Leaderboard insert failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    success: true,
  });
}
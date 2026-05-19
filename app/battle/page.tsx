'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavBar } from '@/components/NavBar';
import { useWalletNFTs } from '@/hooks/useWalletNFTs';
import { STAT_LABELS, TeddyStats, TeddyNFT } from '@/lib/nft';
import { getRandomOpponentTeddy } from '@/lib/opponentTeddies';
import { resolveRound, getBattleWinner, BattleState, initialBattleState } from '@/lib/battle';
import { RoundResult } from '@/lib/supabase';

export default function BattlePage() {
  const { address, isConnected } = useAccount();
  const { nfts, loading, error } = useWalletNFTs();
  const [battle, setBattle] = useState<BattleState>(initialBattleState);


const selectNFT = async (nft: TeddyNFT) => {
  try {
    const opponent = await getRandomOpponentTeddy();

    setBattle((b) => ({
      ...b,
      nft,
      villain: opponent,
      phase: 'battling',
    }));

  } catch (err) {
    console.log(
      'Opponent loading failed:',
      err
    );

    alert(
      'Opponent failed to load'
    );
  }
};

  const chooseStat = useCallback(async (stat: keyof TeddyStats) => {
    if (!battle.nft || !battle.villain) return;

    const round = resolveRound(stat, battle.nft.stats, battle.villain.stats, battle.currentRound);
    const newPlayerWins = battle.playerWins + (round.winner === 'player' ? 1 : 0);
    const newVillainWins = battle.villainWins + (round.winner === 'villain' ? 1 : 0);
    const newRounds = [...battle.rounds, round];

    setBattle((b) => ({
      ...b,
      selectedStat: stat,
rounds: newRounds,
playerWins: newPlayerWins,
villainWins: newVillainWins,
usedStats: [...b.usedStats, stat],
phase: 'round_result',
    }));

    setTimeout(async () => {
      if (battle.currentRound >= 3) {
        saveBattle(newRounds, newPlayerWins, newVillainWins);
        setBattle((b) => ({ ...b, phase: 'battle_over' }));
      } else {
const nextOpponent = await getRandomOpponentTeddy();

setBattle((b) => ({
  ...b,
  currentRound: b.currentRound + 1,
  selectedStat: null,
  villain: nextOpponent,
  phase: 'battling',
}));
      }
    }, 2500);
  }, [battle]);

  const saveBattle = async (rounds: RoundResult[], playerWins: number, villainWins: number) => {
    if (!battle.nft || !battle.villain || !address) return;
    try {
      await fetch('/api/battle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet_address: address,
          nft_token_id: battle.nft.tokenId,
          nft_name: battle.nft.name,
          villain_id: battle.villain.id,
          villain_name: battle.villain.name,
          player_wins: playerWins,
          villain_wins: villainWins,
          winner: getBattleWinner(playerWins, villainWins),
          rounds,
        }),
      });
    } catch (e) {
      console.error('Failed to save battle:', e);
    }
  };

  const resetBattle = () => setBattle(initialBattleState);

  if (!isConnected) {
    return (
      <main className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0f 70%)' }}>
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
          <h2 className="text-3xl text-white font-bold">Connect Your Wallet</h2>
          <p className="text-gray-400">You need a Teddy London NFT to battle.</p>
          <ConnectButton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0f 70%)' }}>
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Round indicator */}
        {battle.phase !== 'select_nft' && (
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((r) => (
              <div key={r} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${
                  r < battle.currentRound
                    ? battle.rounds[r - 1]?.winner === 'player'
                      ? 'bg-yellow-400 border-yellow-400 text-black'
                      : 'bg-red-600 border-red-600 text-white'
                    : r === battle.currentRound
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-white/20 text-gray-600'
                }`}>
                  {r}
                </div>
              </div>
            ))}
            <div className="ml-4 text-gray-400 text-sm">
              You <span className="text-yellow-400 font-bold">{battle.playerWins}</span> — <span className="text-red-400 font-bold">{battle.villainWins}</span> {battle.villain?.name}
            </div>
          </div>
        )}


        {/* SELECT NFT */}
        {battle.phase === 'select_nft' && (
          <div>
            <div className="text-center mb-10">
              <p className="text-yellow-400 text-xs tracking-[0.2em] uppercase mb-2">Step 2</p>
              <h2 className="text-4xl text-white font-bold">
                Pick Your Teddy vs <span className="text-red-400">{battle.villain?.name}</span>
              </h2>
            </div>
            {loading && <div className="text-center text-gray-400 py-20">Loading your Teddies...</div>}
            {error && <div className="text-center text-red-400 py-10">{error}</div>}
            {!loading && nfts.length === 0 && (
              <div className="text-center text-gray-400 py-20">No Teddy London NFTs found in this wallet.</div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft) => (
                <div
                  key={nft.tokenId}
                onClick={() => selectNFT(nft)}
                  className="cursor-pointer border border-white/10 bg-white/5 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-200 p-4 rounded"
                >
                  <div className="w-full aspect-square bg-white/10 rounded mb-3 overflow-hidden">
                    <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-teddy.png'; }} />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{nft.name}</h3>
                  {(Object.entries(STAT_LABELS) as [keyof TeddyStats, string][]).map(([key, label]) => (
                    <div key={key} className="flex justify-between text-xs py-0.5">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-white font-bold">{nft.stats[key]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BATTLING */}
        {(battle.phase === 'battling' || battle.phase === 'round_result') && battle.nft && battle.villain && (
          <div>
            <h2 className="text-3xl text-white font-bold text-center mb-8">
              Round <span className="text-yellow-400">{battle.currentRound}</span>
              {battle.phase === 'battling' && ' — Choose Your Stat'}
            </h2>

            <div className="flex justify-center items-start gap-8 mb-8 flex-wrap">
              {/* Player card */}
              <div className="border border-yellow-400/30 bg-white/5 p-4 rounded w-56">
                <div className="w-full aspect-square bg-white/10 rounded mb-3 overflow-hidden">
                  <img src={battle.nft.image} alt={battle.nft.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{battle.nft.name}</h3>
                {(Object.entries(STAT_LABELS) as [keyof TeddyStats, string][]).map(([key, label]) => (
                  <div key={key} className={`flex justify-between text-xs py-0.5 px-1 rounded ${battle.selectedStat === key ? 'bg-yellow-400/20 text-yellow-400' : ''}`}>
                    <span className="text-gray-500">{label}</span>
                    <span className={`font-bold ${battle.selectedStat === key ? 'text-yellow-400' : 'text-white'}`}>{battle.nft!.stats[key]}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center gap-2 pt-16">
                <span className="text-yellow-400 text-3xl font-bold">VS</span>
                {battle.phase === 'round_result' && (
                  <div className={`text-xs tracking-widest uppercase px-3 py-1 mt-2 ${
                    battle.rounds.at(-1)?.winner === 'player' ? 'bg-yellow-400/20 text-yellow-400' :
                    battle.rounds.at(-1)?.winner === 'villain' ? 'bg-red-500/20 text-red-400' :
                    'bg-white/10 text-white'
                  }`}>
                    {battle.rounds.at(-1)?.winner === 'player' ? 'You Win!' :
                     battle.rounds.at(-1)?.winner === 'villain' ? 'They Win!' : 'Draw!'}
                  </div>
                )}
              </div>

              {/* Villain card */}
              <div className="border border-red-500/30 bg-white/5 p-4 rounded w-56">
<div className="w-full aspect-square bg-white/10 rounded mb-3 overflow-hidden">
  <img
    src={battle.villain.image}
    alt={battle.villain.name}
    className="w-full h-full object-cover"
  />
</div>
                <h3 className="text-white font-bold text-sm mb-2">{battle.villain.name}</h3>
                {(Object.entries(STAT_LABELS) as [keyof TeddyStats, string][]).map(([key, label]) => (
                  <div key={key} className={`flex justify-between text-xs py-0.5 px-1 rounded ${battle.selectedStat === key ? 'bg-red-500/20 text-red-400' : ''}`}>
                    <span className="text-gray-500">{label}</span>
                    <span
  className={`font-bold ${
    battle.selectedStat
      ? battle.selectedStat === key
        ? 'text-red-400'
        : 'text-white'
      : 'blur-sm text-gray-400'
  }`}
>
  {battle.selectedStat
    ? battle.villain!.stats[key]
    : battle.villain!.stats[key]}
</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat picker */}
            {battle.phase === 'battling' && (
              <div className="max-w-md mx-auto">
                <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-4">Pick a stat to play</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(STAT_LABELS) as [keyof TeddyStats, string][]).map(([key, label]) => (
<button
  key={key}
  disabled={battle.usedStats.includes(key)}
  onClick={() => chooseStat(key)}
                      className={`flex justify-between items-center px-4 py-3 border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-200 text-sm ${
  battle.usedStats.includes(key) ? 'opacity-30 cursor-not-allowed' : ''
}`}
                    >
                      <span className="text-white">{label}</span>
                      <span className="text-yellow-400 font-bold text-lg">{battle.nft?.stats[key]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BATTLE OVER */}
        {battle.phase === 'battle_over' && battle.nft && battle.villain && (() => {
          const outcome = getBattleWinner(battle.playerWins, battle.villainWins);
          return (
            <div className="text-center">
              <div className={`text-6xl md:text-8xl font-bold mb-4 ${
                outcome === 'player' ? 'text-yellow-400' :
                outcome === 'villain' ? 'text-red-500' : 'text-white'
              }`}>
                {outcome === 'player' ? 'VICTORY' : outcome === 'villain' ? 'DEFEAT' : 'DRAW'}
              </div>
              <p className="text-gray-400 text-sm mb-8 uppercase tracking-widest">
                {battle.playerWins} — {battle.villainWins} vs {battle.villain.name}
              </p>
              <div className="max-w-sm mx-auto space-y-2 mb-10">
                {battle.rounds.map((r) => (
                  <div key={r.round} className="flex justify-between items-center border border-white/10 px-4 py-2 text-sm">
                    <span className="text-gray-400">Round {r.round} — {STAT_LABELS[r.stat as keyof TeddyStats]}</span>
                    <span className={`font-bold ${r.winner === 'player' ? 'text-yellow-400' : r.winner === 'villain' ? 'text-red-400' : 'text-white'}`}>
                      {r.player_value} vs {r.villain_value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={resetBattle}
                  className="tracking-[0.15em] uppercase px-8 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  Battle Again
                </button>
                
                <Link
                href="/leaderboard"
                className="tracking-[0.15em] uppercase px-8 py-3 border border-white/20 text-gray-400 hover:border-white hover:text-white transition-all duration-300"
>
                 View Leaderboard
                </Link>
                
              </div>
            </div>
          );
        })()}
      </div>
    </main>
  );
}
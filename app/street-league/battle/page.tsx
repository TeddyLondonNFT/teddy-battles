'use client';

import { useState, useCallback, useEffect } from 'react';
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

  const [battle, setBattle] = useState<BattleState>(initialBattleState);
useEffect(() => {
  const savedTeddy = localStorage.getItem('streetLeagueTeddy');

  if (!savedTeddy) {
    window.location.href = '/street-league/select';
    return;
  }

  const loadBattle = async () => {
    const streetTeddy = JSON.parse(savedTeddy);
    const opponent = await getRandomOpponentTeddy();

    setBattle((b) => ({
      ...b,
      nft: streetTeddy,
      villain: opponent,
      phase: 'battling',
    }));
  };

  loadBattle();
}, []);
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
      console.log('Opponent loading failed:', err);
      alert('Opponent failed to load');
    }
  };

  const chooseStat = useCallback(async (stat: keyof TeddyStats) => {
    if (!battle.nft || !battle.villain) return;
if (battle.usedStats.includes(stat)) return;

    const round = resolveRound(stat, battle.nft.stats, battle.villain.stats, battle.currentRound);
    const newPlayerWins = battle.playerWins + (round.winner === 'player' ? 1 : 0);
    const newVillainWins = battle.villainWins + (round.winner === 'villain' ? 1 : 0);
    const newRounds = [...battle.rounds, round];

   new Audio('/sounds/wham.mp3').play();
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





  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('/bg/turfwars_background.png')" }}
    >
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 pt-2 pb-4">
  <div className="flex justify-center mb-0 -mt-24">
    <img
      src="/logo/turfwars_logo.png"
      alt="Turf Wars"
      className="w-[700px] max-w-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.0)]"
    />
  </div>
)

{/* TOP SCORE BAR */}
{battle.phase !== 'select_nft' && battle.villain && (
  <div className="grid grid-cols-[1fr_100px_1fr] items-center gap-4 mb-2 max-w-4xl mx-auto">

    {/* YOU */}
    <div className="justify-self-end bg-blue-700 border-2 border-blue-300 rounded-xl px-6 py-3 text-white font-black shadow-2xl shadow-blue-500/40 min-w-[320px]">
      <div className="flex items-center justify-center gap-5">
        <div className="text-2xl">YOU</div>
        <div className="text-6xl leading-none">
          {battle.playerWins}
        </div>
      </div>
    </div>

    {/* VS */}
    <div className="justify-self-center bg-black border-2 border-white/30 rounded-xl px-6 py-3 text-white font-black text-5xl text-center w-[100px]">
      VS
    </div>

    {/* VILLAIN */}
    <div className="justify-self-start bg-red-700 border-2 border-red-300 rounded-xl px-6 py-3 text-white font-black shadow-2xl shadow-red-500/40 min-w-[320px]">
      <div className="flex items-center gap-5">
        <div className="text-6xl leading-none">
          {battle.villainWins}
        </div>

<div className="text-left">
  <div className="text-xl font-black">
    {battle.villain.name.replace(/^Teddy\s+#\d+\s*/, '')}
  </div>
</div>
      </div>
    </div>

  </div>
)}


        {/* BATTLING / ROUND RESULT */}
        {(battle.phase === 'battling' || battle.phase === 'round_result') && battle.nft && battle.villain && (
          <div>
            <h2 className="text-3xl text-white font-bold text-center mb-8">
              Round <span className="text-yellow-400">{battle.currentRound}</span>
              {battle.phase === 'battling' && ' — Choose Your Stat'}
            </h2>
{/* ROUND RESULT SPLASH */}
{battle.phase === 'round_result' && (
  <div className="absolute left-1/2 top-[260px] -translate-x-1/2 z-50 pointer-events-none">

    <div className="relative w-[420px]">

      <img
        src={
          battle.rounds.at(-1)?.winner === 'player'
            ? '/ui/you-win.png'
            : '/ui/you-lose.png'
        }
        alt="Result"
        className="w-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.8)] wham-pop"
      />

    </div>

  </div>
)}
            <div className="flex justify-center items-start gap-8 mb-8 flex-wrap">
              {/* Player card */}
              <div className={`w-[320px] rounded-2xl border-4 border-blue-500 bg-gradient-to-b from-blue-950/95 to-black/95 p-4 card-float glow-blue ${
  battle.phase === 'round_result' ? 'card-shake' : ''
}`}>
                <div className="w-full aspect-square rounded overflow-hidden mb-3">
                  <img src={battle.nft.image} alt={battle.nft.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{battle.nft.name}</h3>
                {(Object.entries(STAT_LABELS) as [keyof TeddyStats, string][]).map(([key, label]) => (
                  <div key={key} className={`flex justify-between text-xs py-0.5 px-1 rounded ${battle.selectedStat === key ? 'bg-yellow-400/20 text-yellow-400' : ''}`}>
                    <span className="text-gray-500">{label}</span>
                    <span className={`font-bold ${battle.selectedStat === key ? 'text-yellow-400' : 'text-white'}`}>
                      {battle.nft!.stats[key]}
                    </span>
                  </div>
                ))}
              </div>

              {/* VS / Round result */}
              <div className="flex flex-col items-center justify-center gap-2 pt-16">
                <span className="text-yellow-400 text-3xl font-bold">VS</span>

              </div>

              {/* Villain card */}
<div className={`w-[320px] rounded-2xl border-4 border-red-500 bg-gradient-to-b from-red-950/95 to-black/95 p-4 card-float glow-red ${
  battle.phase === 'round_result' ? 'card-shake' : ''
}`}>
                <div className="w-full aspect-square rounded overflow-hidden mb-3">
                  <img src={battle.villain.image} alt={battle.villain.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{battle.villain.name}</h3>
                {(Object.entries(STAT_LABELS) as [keyof TeddyStats, string][]).map(([key, label]) => (
                  <div key={key} className={`flex justify-between text-xs py-0.5 px-1 rounded ${battle.selectedStat === key ? 'bg-red-500/20 text-red-400' : ''}`}>
                    <span className="text-gray-500">{label}</span>
<span
  className={`font-bold ${
    battle.selectedStat === key
      ? 'reveal-stat text-red-400'
      : battle.selectedStat
      ? 'text-white'
      : 'blur-sm text-gray-400'
  }`}
>
  {battle.villain!.stats[key]}
</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat picker */}
            {battle.phase === 'battling' && (
              <div className="max-w-3xl mx-auto bg-black/85 border border-yellow-500/30 rounded-2xl p-3 shadow-2xl">
                <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-4">Pick a stat to play</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(STAT_LABELS) as [keyof TeddyStats, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      disabled={battle.usedStats.includes(key)}
                      onMouseEnter={() => {
  new Audio('/sounds/hover.mp3').play();
}}
onClick={() => chooseStat(key)}
                     className={`stat-button-live flex justify-between items-center px-4 py-2 rounded-xl bg-[#111111]/95 border border-yellow-500/30 hover:border-yellow-400 hover:bg-[#1b1b1b] transition-all duration-200 text-xl shadow-xl ${
  battle.usedStats.includes(key)
    ? 'opacity-25 grayscale cursor-not-allowed pointer-events-none'
    : ''
}`}
                    >
                      <span className="text-white font-black uppercase tracking-wide text-xl">
  {label}
</span>
                      <span className="text-yellow-400 font-black text-4xl">
  {battle.nft?.stats[key]}
</span>
</button>

                  ))}
                </div>
              </div>
            )}
          </div>
        )}

{battle.phase === 'battle_over' && battle.nft && battle.villain && (() => {
  const outcome = getBattleWinner(battle.playerWins, battle.villainWins);
if (typeof window !== 'undefined') {
  if (outcome === 'player') {
    new Audio('/sounds/victory.mp3').play();
  } else if (outcome === 'villain') {
    new Audio('/sounds/defeat.mp3').play();
  }
}
  return (
    <div className="text-center max-w-5xl mx-auto">

      <div className={`text-7xl md:text-9xl font-black mb-2 drop-shadow-[0_6px_8px_rgba(0,0,0,0.8)] ${
        outcome === 'player' ? 'text-yellow-400' :
        outcome === 'villain' ? 'text-red-500' : 'text-white'
      }`}>
        {outcome === 'player' ? 'VICTORY' : outcome === 'villain' ? 'DEFEAT' : 'DRAW'}
      </div>

      <p className="text-white/80 text-lg mb-6 uppercase tracking-widest">
        {battle.playerWins} VS {battle.villainWins} — {battle.villain.name}
      </p>

      <div className="max-w-3xl mx-auto bg-black/85 border border-yellow-500/30 rounded-2xl p-5 shadow-2xl mb-8">
        {battle.rounds.map((r) => (
          <div
            key={r.round}
            className="flex justify-between items-center bg-[#111111]/95 border border-white/10 rounded-xl px-8 py-4 mb-3 last:mb-0 shadow-lg"
          >
            <span className="text-white font-black text-2xl">
              Round {r.round} — {STAT_LABELS[r.stat as keyof TeddyStats]}
            </span>

            <span className={`font-black text-3xl ${
              r.winner === 'player'
                ? 'text-yellow-400'
                : r.winner === 'villain'
                ? 'text-red-400'
                : 'text-white'
            }`}>
              {r.player_value} VS {r.villain_value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <button
  onMouseEnter={() => {
    new Audio('/sounds/hover.mp3').play();
  }}
  onClick={resetBattle}
          className="bg-[#111111]/95 border border-yellow-500/40 hover:border-yellow-400 text-yellow-400 font-black uppercase tracking-widest text-xl px-10 py-5 rounded-xl shadow-xl transition-all duration-200 hover:bg-[#1b1b1b]"
        >
          Battle Again
        </button>

        <Link
  href="/leaderboard"
  onMouseEnter={() => {
    new Audio('/sounds/hover.mp3').play();
  }}
          className="bg-[#111111]/95 border border-white/20 hover:border-white/60 text-white font-black uppercase tracking-widest text-xl px-10 py-5 rounded-xl shadow-xl transition-all duration-200 hover:bg-[#1b1b1b]"
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

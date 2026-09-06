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
    if (!battle.nft || !battle.villain) return;
    try {
      await fetch('/api/battle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
  league: 'street-league',
  wallet_address: localStorage.getItem('streetLeagueWallet') || '',
  x_handle: localStorage.getItem('streetLeagueHandle') || 'no-handle',
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

  const resetBattle = async () => {
  const savedTeddy = localStorage.getItem('streetLeagueTeddy');

  if (!savedTeddy) {
    window.location.href = '/street-league/select';
    return;
  }

  const streetTeddy = JSON.parse(savedTeddy);
  const opponent = await getRandomOpponentTeddy();

  setBattle({
    ...initialBattleState,
    nft: streetTeddy,
    villain: opponent,
    phase: 'battling',
  });
};


  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('/bg/turfwars_background.jpg')" }}
    >
  <div className="absolute top-[4%] left-1/2 -translate-x-1/2 z-30">
 <img
  src="/ui/teddylondon.png"
  alt="Teddy London"
  className="h-10 md:h-14 w-auto opacity-100 drop-shadow-[0_4px_4px_rgba(0,0,0,0,5)]"
/>
</div>
      <NavBar />
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-2 pb-4">
{battle.phase === 'select_nft' && (
  
  <div className="flex justify-center mb-0 -mt-24">
    <img
      src="/logo/turfwars_logo.png"
      alt="Turf Wars"
      className="w-[700px] max-w-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.0)]"
    />
  </div>
)}
)

{/* Left Teddy */}
<img
  src="/characters/left-teddy.png"
  alt=""
className="
  hidden lg:block
  fixed
  left-0
  bottom-[-20px]
  h-[55vh]
  opacity-100
  pointer-events-none
  select-none
  z-[5]
"
/>

{/* Right Teddy */}
<img
  src="/characters/right-teddy.png"
  alt=""
className="
  hidden lg:block
  fixed
  right-0
  bottom-[-20px]
  h-[55vh]
  opacity-100
  pointer-events-none
  select-none
  z-[5]
  "
/>

{/* TOP SCORE BAR */}
{battle.phase !== 'select_nft' && battle.villain && (
  <div className="grid grid-cols-[1fr_80px_1fr] items-center gap-3 mb-3 max-w-3xl mx-auto -mt-4">

    {/* YOU */}
    <div className="justify-self-end bg-blue-700 border-2 border-blue-300 rounded-xl px-5 py-2 text-white font-black shadow-xl shadow-blue-500/30 min-w-[130px]">
<div className="flex flex-col items-center justify-center">
  <div className="text-sm md:text-xl font-black">
    YOU
  </div>

  <div className="text-4xl md:text-5xl leading-none">
    {battle.playerWins}
  </div>
</div>
    </div>

    {/* VS */}
    <div className="justify-self-center bg-black border-2 border-white/30 rounded-xl px-4 py-2 text-white font-black text-4xl text-center w-[80px]">
      VS
    </div>

    {/* VILLAIN */}
    <div className="justify-self-start bg-red-700 border-2 border-red-300 rounded-xl px-5 py-2 text-white font-black shadow-xl shadow-red-500/30 min-w-[130px]">
<div className="flex flex-col items-center justify-center">
  <div className="text-sm md:text-xl font-black truncate max-w-[120px]">
    {battle.villain.name.replace(/^Teddy\s+#\d+\s*/, '')}
  </div>

  <div className="text-4xl md:text-5xl leading-none">
    {battle.villainWins}
  </div>
</div>
    </div>

  </div>
)}


        {/* BATTLING / ROUND RESULT */}
        {(battle.phase === 'battling' || battle.phase === 'round_result') && battle.nft && battle.villain && (
          <div>
<div className="text-center mt-4 mb-5">
  <div className="step-banner whitespace-nowrap !text-[13px] md:!text-xl !tracking-wider">
    ROUND <span className="text-yellow-400">{battle.currentRound}</span>
   {(battle.phase === 'battling' || battle.phase === 'round_result') && (
      <>
        <span className="mx-3 text-white">—</span>
        CHOOSE YOUR STAT
      </>
    )}
  </div>
</div>
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
            <div className="flex flex-row justify-center items-start gap-2 md:gap-8 mb-4 md:mb-8">
           {/* Player card */}
              <div className={`w-[44vw] max-w-[250px] rounded-2xl border-4 border-blue-500 bg-gradient-to-b from-blue-950/95 to-black/95 p-4 card-float glow-blue ${
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
                <span className="text-yellow-400 text-3xl font-bold">  </span>

              </div>

              {/* Villain card */}
<div className={`villain-card-reveal w-[44vw] max-w-[250px] rounded-2xl border-4 border-red-500 bg-gradient-to-b from-red-950/95 to-black/95 p-4 card-float glow-red ${
  battle.phase === 'round_result' ? 'card-shake' : ''
}`}>
<>
  <img
    key={`desktop-${battle.currentRound}-${battle.villain.id}`}
    src="/ui/villain-card-cover.png"
    alt="Villain hidden"
    className="villain-cover hidden md:block"
  />

  <img
    key={`mobile-${battle.currentRound}-${battle.villain.id}`}
    src="/ui/villain-card-cover-m.png"
    alt="Villain hidden"
    className="villain-cover md:hidden"
  />
</>
                <div className="w-full aspect-square rounded overflow-hidden mb-3">
                  <img src={battle.villain.image} alt={battle.villain.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2 truncate">
  {battle.villain.name.replace(/^Teddy\s+#\d+\s*/, '')}
</h3>
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
  {key === 'overall'
  ? Math.round(battle.villain!.stats[key])
  : battle.villain!.stats[key]}
</span>
                  </div>
                ))}
              </div>
            </div>


{/* Stat picker */}
{(battle.phase === 'battling' || battle.phase === 'round_result') && (
  <div className="relative z-20 max-w-2xl mx-auto bg-black/85 border border-yellow-500/30 rounded-2xl p-2 shadow-2xl">

    <div className="hidden md:flex items-center justify-center gap-4 mb-4">
      <div className="h-[2px] w-32 bg-blue-500/60"></div>

      <span className="text-blue-400 text-xl">★</span>

      <span className="text-white font-black uppercase tracking-widest text-lg">
        Pick Your Move
      </span>

      <span className="text-blue-400 text-xl">★</span>

      <div className="h-[2px] w-32 bg-blue-500/60"></div>
    </div>

    <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(STAT_LABELS) as [keyof TeddyStats, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      disabled={battle.usedStats.includes(key) || battle.phase !== 'battling'}
                      onMouseEnter={() => {
  new Audio('/sounds/hover.mp3').play();
}}
onClick={() => chooseStat(key)}
className={`stat-button-live flex justify-between items-center px-3 py-1.5 rounded-xl bg-[#111111]/95 border border-yellow-500/30 hover:border-yellow-400 hover:bg-[#1b1b1b] transition-all duration-200 text-base shadow-xl ${
  battle.usedStats.includes(key)
    ? 'opacity-25 grayscale cursor-not-allowed pointer-events-none'
    : ''
}`}
                    >
                      <span className="text-white font-black uppercase tracking-wide text-[11px] md:text-base">
  {label}
</span>
<span className="text-yellow-400 font-black text-2xl md:text-3xl">
  {key === 'overall'
    ? Math.round(battle.nft?.stats[key] ?? 0)
    : battle.nft?.stats[key]}
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


 const shareText = 
 
 `🍺 Teddy London - TURF WARS 🍺

👊 Survived the streets.
⚡ Earned Street Cred.
🎯 Now fighting for a Teddy London Crew WL spot.

🏆 20 WL spots up for grabs this week.

👇 Think you can handle it?
https://play.teddylondon.xyz/

@Monx2 @theteddyLondon`;

const shareOnX = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

if (typeof window !== 'undefined') {
  if (outcome === 'player') {
    new Audio('/sounds/victory.mp3').play();
  } else if (outcome === 'villain') {
    new Audio('/sounds/defeat.mp3').play();
  }
}
  return (
    <div className="text-center max-w-5xl mx-auto">

<div className="flex justify-center mb-6">
  <img
    src={
      outcome === 'player'
        ? '/logo/legend.png'
        : outcome === 'villain'
        ? '/logo/mug.png'
        : '/logo/fairplay.png'
    }
    alt="Battle Result"
    className="result-slam w-[650px] max-w-[90vw] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
  />
</div>

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
    onClick={shareOnX}
    className="bg-black border border-blue-400 hover:border-blue-300 text-blue-300 font-black uppercase tracking-widest text-xl px-10 py-5 rounded-xl shadow-xl transition-all duration-200 hover:bg-[#111111]"
  >
    Share on X
  </button>

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
  href="/street-league/leaderboard"
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

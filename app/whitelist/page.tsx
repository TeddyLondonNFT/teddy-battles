'use client';

import leftTeddy from './left-teddy.png';
import rightTeddy from './right-teddy.png';
import turfBg from './turf-bg.jpg';
import turfWarsLogo from './turfwars-logo.png';
import { NavBar } from '@/components/NavBar';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Fixed Free Mint allocations; live Final Call rankings reuse street_leaderboard.
const historicalPlayers = [
  {
    xHandle: '@Lorex',
    freeMints: 3,
    wallet: '0x8ed4700d225c2c445bbe1376b7e98492bdfa25aa',
  },
  {
    xHandle: '@ReiReiLoveYJW',
    freeMints: 3,
    wallet: '0x8f7975AA944eD08b1E9dA5cac0333e69f9E776bd',
  },
  {
    xHandle: '@_justGunn',
    freeMints: 2,
    wallet: '0x31C01e719B1C869992FF812f6DfF53fEde8b221F',
  },
  {
    xHandle: '@olddumbum',
    freeMints: 2,
    wallet: '0x2bF8cf4b2cd0168CAE6a4b4c5175355c4E477262',
  },
  {
    xHandle: '@jpeghedge',
    freeMints: 2,
    wallet: '0xa4e7918fb5f4a8c12f9513b193be1d764d5757dc',
  },
  {
    xHandle: '@AlwaysWinning',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@A_R_C_NFTs',
    freeMints: 1,
    wallet: '0x5933144b5f9f5e71fef149c7f60e8229906a1f26',
  },
  {
    xHandle: '@cann0nnft',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@dgkacid',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@Tjay_sznn',
    freeMints: 1,
    wallet: '0xbfBFB28754F2ae61Cef971BB702cdf8d9fbBeD73',
  },
  {
    xHandle: '@kadirbykl616161',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@eastmahnn',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@milesmuso',
    freeMints: 1,
    wallet: '0xf2e4a05cBae83fb3173BECEe7a31686e8A6ae3Ce',
  },
  {
    xHandle: '@no-handle',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@yungartist',
    freeMints: 1,
    wallet: '0xa89d38997c31383ca1d7b2a496ead1a1444fb718',
  },
  {
    xHandle: '@Joshstuner',
    freeMints: 1,
    wallet: '0xc7115b6C7A4278E2709336A8816b183D01e33D8A',
  },
  {
    xHandle: '@yung',
    freeMints: 1,
    wallet: '0xa89d38997c31383ca1d7b2a496ead1a1444fb718',
  },
  {
    xHandle: '@daboyonix',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@Kevinwburger',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@Kiwimitchy',
    freeMints: 1,
    wallet: '',
  },
  {
    xHandle: '@voodoonemesi',
    freeMints: 1,
    wallet: '0x56aea8FC69b39F62A8d76b6f19aa6Ce974112ABe',
  },
  {
    xHandle: '@krespo',
    freeMints: 1,
    wallet: '0xbfBFB28754F2ae61Cef971BB702cdf8d9fbBeD73',
  },
];

// Screenshot order is final. Confirmation is a status, never a fabricated wallet.
const streetLeaguePlayers = [
  '@bigduggy12', '@Not1Sure1', '@kingkhay_16', '@FavesHub_',
  '@danielmercy83', '@camilatina90', '@andrew_mike2011', '@panchabets',
  '@alphapricedao', '@waffles_c', '@samnft90', '@codezenith_',
  '@x_plorern',
  '@sanemma82', '@MrCrypto220', '@Muah_ola', '@_Oneortwo',
  '@medim83547', '@baptoshisafe',
  '@Mukarzi_is_here', '@dribble31',
].map((xHandle, index) => ({
  xHandle,
  freeMints: 1,
  bonus: 0,
  confirmed: true,
  source: 'STREET LEAGUE' as const,
}));

const lockedPlayers = [
  ...streetLeaguePlayers,
  ...historicalPlayers.map((player) => ({
    ...player,
    bonus: 0,
    confirmed: Boolean(player.wallet),
    source: 'ORIGINAL TURF WARS' as const,
  })),
];

export default function FinalCallPage() {
  const totalLocked = lockedPlayers.reduce((total, player) => total + player.freeMints, 0);

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 text-white sm:px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(8,8,18,0.30), rgba(8,8,18,0.40)), url(${turfBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <NavBar />
      <img src={leftTeddy.src} alt="" className="pointer-events-none fixed bottom-0 left-0 z-0 hidden w-[32vw] max-w-[520px] select-none lg:block" />
      <img src={rightTeddy.src} alt="" className="pointer-events-none fixed bottom-0 right-0 z-0 hidden w-[32vw] max-w-[520px] select-none lg:block" />

      <div className="relative z-10 mx-auto max-w-5xl pb-10 pt-12 sm:pt-16">
        <div className="mb-5 flex justify-center">
          <img src={turfWarsLogo.src} alt="Teddy London Turf Wars" className="w-[680px] max-w-[92vw] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]" />
        </div>

<section aria-labelledby="final-call-title" className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-yellow-400/40 bg-black/80 shadow-2xl backdrop-blur-md">
          <div className="bg-gradient-to-br from-yellow-400/10 via-transparent to-blue-400/5 px-5 py-8 text-center sm:px-8 sm:py-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">The next chapter of Turf Wars</p>
            <h1 id="final-call-title" className="mt-5 font-black uppercase leading-tight">
              <span className="block text-2xl sm:text-4xl">Friends of Teddy</span>
              <span className="block text-5xl tracking-tight text-yellow-400 sm:text-6xl">Final Call</span>
            </h1>
            <p className="mt-4 text-lg font-bold sm:text-xl">One last round. Earn your place.</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">100 GTD spots for the Friends of Teddy mint phase.</p>
            <div className="mt-7 grid items-stretch gap-4 sm:grid-cols-[0.85fr_1.35fr]">
              <div className="relative flex flex-col justify-center overflow-hidden rounded-xl bg-yellow-400 px-7 py-5 text-black shadow-[0_6px_24px_rgba(250,204,21,0.12)]" style={{ WebkitMaskImage: 'radial-gradient(circle at 0 50%, transparent 15px, black 16px), radial-gradient(circle at 100% 50%, transparent 15px, black 16px)', WebkitMaskComposite: 'source-in', maskImage: 'radial-gradient(circle at 0 50%, transparent 15px, black 16px), radial-gradient(circle at 100% 50%, transparent 15px, black 16px)', maskComposite: 'intersect' }}>
                <p className="text-7xl font-black leading-none tracking-tight sm:text-8xl">100</p>
                <p className="mt-1 text-lg font-black uppercase">GTD spots</p>
                <p className="mt-4 border-t border-dashed border-black/40 pt-3 text-[10px] font-black uppercase tracking-[0.2em]">Friends of Teddy</p>
              </div>
              <div className="flex flex-col justify-center rounded-xl border border-white/20 bg-black/30 px-4 py-5 sm:px-5">
                <p className="text-xs font-bold uppercase tracking-widest text-white">Final Call countdown</p>
                <FinalCallCountdown />
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
              <a href="#gtd-leaderboard" className="w-full rounded-xl bg-yellow-400 px-6 py-4 text-sm font-black text-black transition hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 sm:w-auto">Final Call Leaderboard ↓</a>
              <a href="#locked-mints" className="relative flex min-h-[64px] w-full items-center justify-center rounded-xl border border-yellow-400/50 bg-black/50 py-3 pl-16 pr-5 text-center transition hover:border-yellow-300 hover:bg-yellow-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 sm:w-auto">
                <img src="/logo/padlock.png" alt="" className="pointer-events-none absolute -left-2 -top-3 w-16 rotate-[-10deg] select-none drop-shadow-[0_6px_12px_rgba(0,0,0,0.7)]" />
                <span>
                  <span className="block text-sm font-black text-yellow-400">{totalLocked} FREE MINTS LOCKED</span>
                  <span className="mt-1 block text-xs text-gray-300">View your permanent allocation ↓</span>
                </span>
              </a>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-gray-400">GTD grants mint access. Mint purchase required.</p>
          </div>
        </section>


        <section id="gtd-leaderboard" aria-labelledby="gtd-title" className="mx-auto mt-8 max-w-3xl scroll-mt-24 overflow-hidden rounded-xl border border-blue-400/50 bg-black/80 shadow-2xl backdrop-blur-md">
          <div className="px-5 py-8 text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-blue-300">Friends of Teddy</p>
            <h2 id="gtd-title" className="text-2xl font-black sm:text-3xl">FINAL CALL LEADERBOARD</h2>
            <p className="mt-4 text-sm text-gray-300">Up to 100 GTD spots. Free-mint winners are excluded. One place per wallet.</p>
            <p className="mt-2 text-xs text-gray-400">Ranked by wins, then fewer games. Standings remain provisional until the competition closes.</p>
          </div>
          <LiveLeaderboard />
        </section>
        <section id="locked-mints" aria-labelledby="locked-title" className="mx-auto mt-16 max-w-3xl scroll-mt-24 overflow-hidden rounded-xl border border-yellow-400/50 bg-black/80 shadow-2xl backdrop-blur-md">
          <div className="border-b border-yellow-400/30 bg-black/50 px-5 py-8 text-center sm:px-6">
            <img src="/logo/padlock.png" alt="" className="pointer-events-none mx-auto mb-2 w-20 rotate-[-8deg] select-none drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)]" />
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-yellow-400">Earned. Locked. Yours.</p>
            <h2 id="locked-title" className="text-3xl font-black sm:text-4xl">{totalLocked} FREE MINTS LOCKED</h2>
            <p className="mt-3 text-gray-300">The Turf Wars Free Mint battle is over. These allocations are permanent and cannot change.</p>
            <p className="mt-3 text-xs leading-relaxed text-gray-400">21 Street League mints + 29 original Turf Wars mints.<br />The new GTD competition does not affect these earned allocations.</p>
            <a href="https://teddylondon.xyz/#eligibility" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-black text-black transition hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400">
              Check your wallet <span aria-hidden="true">→</span>
            </a>
          </div>
          <table className="w-full table-fixed text-left">
            <caption className="sr-only">Permanent free Crew allocations: Street League winners followed by original Turf Wars winners</caption>
            <thead className="border-b border-white/10 text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">
              <tr>
                <th scope="col" className="w-[43%] px-3 py-4 sm:px-6">Turf Warrior</th>
                <th scope="col" className="w-[23%] px-2 py-4 text-right">Free Crew</th>
                <th scope="col" className="px-3 py-4 text-right sm:px-6">Wallet Status</th>
              </tr>
            </thead>
            <tbody>
              {lockedPlayers.map((player) => (
                <tr key={`${player.source}-${player.xHandle}`} className="border-b border-white/10 last:border-b-0">
                  <th scope="row" className="px-3 py-5 sm:px-6">
                    <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-3 sm:flex-nowrap">
                      <span className="min-w-0">
                        <span className="block break-words text-sm font-bold sm:text-lg">{player.xHandle}</span>
                        <span className={`mt-1 block text-[9px] font-normal uppercase tracking-wider sm:text-xs ${player.source === 'STREET LEAGUE' ? 'text-blue-300' : 'text-gray-400'}`}>{player.source}</span>
                      </span>

                    </span>
                  </th>
                  <td className="px-2 py-5 text-right">
                    <span className="block text-xl font-black text-yellow-400 sm:text-2xl">×{player.freeMints}</span>
                    <span className="block text-[9px] uppercase text-gray-400 sm:text-xs">Free Crew</span>
                  </td>
                  <td className="px-3 py-5 text-right sm:px-6">
                    <span className={`block text-xs font-bold sm:text-base ${player.confirmed ? 'text-green-400' : 'text-yellow-400'}`}>{player.confirmed ? '✓ Confirmed' : 'Wallet Required'}</span>
                    <span className="mt-1 block text-[10px] leading-relaxed text-gray-400 sm:text-xs">
                      {player.confirmed ? (player.source === 'STREET LEAGUE' ? 'Final result confirmed' : 'Wallet received') : 'Reply to the Turf Wars roll call'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="mx-auto mt-10 max-w-3xl rounded-xl border border-yellow-400/40 bg-black/70 p-6 text-center backdrop-blur-sm">
          <p className="text-2xl font-black text-yellow-400 sm:text-3xl">{totalLocked} FREE CREW MINTS. PERMANENTLY LOCKED.</p>
          <p className="mt-2 text-sm text-gray-300">29 earned through original Turf Wars. 21 earned through Street League.</p>
          <p className="mt-5 text-xs text-gray-400">Closes October 10 at midnight JST</p>
        </footer>
      </div>
    </main>
  );
}




// End of Saturday, October 10 in Japan; independent of the visitor's timezone.
const CLOSES_AT = '2026-10-11T00:00:00+09:00';

function FinalCallCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!CLOSES_AT) return;
    const deadline = Date.parse(CLOSES_AT);
    const tick = () => setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = remaining === null ? null : [
    Math.floor(remaining / 86400),
    Math.floor((remaining % 86400) / 3600),
    Math.floor((remaining % 3600) / 60),
    remaining % 60,
  ];

  return (
    <>
      <div className="mt-6 grid grid-cols-4 divide-x divide-white/15" role="timer" aria-label="Time remaining until Final Call closes">
        {['Days', 'Hours', 'Mins', 'Secs'].map((label, index) => (
          <div key={label}>
            <span className="block text-3xl font-black tabular-nums text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.65)] sm:text-4xl">{values ? String(values[index]).padStart(2, '0') : '--'}</span>
            <span className="mt-2 block text-[10px] uppercase text-gray-400">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-white/15 pt-3 text-xs text-gray-300" aria-live="polite">
        {remaining === 0 ? 'Final Call has closed.' : 'Closes October 10 at midnight JST'}
      </p>
    </>
  );
}






// Wallets supplied by the owner for the final 21; normalize case for comparisons.
const streetWinnerWallets = [
  '0x3988ba49aa1e22d2f83727dc54fb9d91de5141d9',
  '0x71B67a959C8Bb01A09a48972C2C7Cd971181241D',
  '0x4a602104ed51bfDD165FD058Bb1A7A1652707A2F',
  '0x6a1ba16e65f9e2ea5483ffc4675ab6ead85ee7e9',
  '0xf90e3b3957f74c8F7bf9355cd919DAd5cdC2BE82',
  '0x8d73EBa5FB3a8c2d08aF47D4598a748549613F54',
  '0xaab4066edb8c070c67fb14f707d3755cbbd7bc30',
  '0x52f6B9900DC459630815de68fBb4277b2c46bc3f',
  '0x7d447dc5bbcd4bfe26a96f9bd1bb081072efe576',
  '0x612Fd40D7926D76Eacf30563876eac965fF5ce90',
  '0x5cceb57D691999309Bc76A7Fbb3A748753155452',
  '0x81f1cc17ae1efffeb9328a0d340ca3e13116dad1',
  '0xcdea42bd7787a01cded9959418189d543efe3a72',
  '0x19dB39D3320c3ceC14CC31bd85fb7265B6b0C4d5',
  '0x50748Ba814d0894cabcb1E5e567B3B15244b2910',
  '0x6CD4E247bce221f2cb3F3E4Ce4dEe65bb7517060',
  '0xbD062Ce03f9C1f12D6342cB0b1B1c1d28EC8e007',
  '0x6DaD85ee43236DC9b6EBfc586Be5D0c1c934eC2b',
  '0xc514083383970a3db555e406dd1f5a24b2b6ae8d',
  '0x0a2c7f6c51af05d56dcda53a950bef1d3c3f9bd2',
  '0xA54071ECD1f34F56f6ab4b1E80DA9257832239B9',
];
const normalizeWallet = (value: string | null) => (value ?? '').trim().toLowerCase();
const normalizeHandle = (value: string | null) => (value ?? '').trim().replace(/^@/, '').toLowerCase();
const excludedWallets = new Set([...streetWinnerWallets, ...historicalPlayers.map(p => p.wallet)].map(normalizeWallet).filter(Boolean));
// Handle fallback for historical winners whose wallets have not been supplied.
// Add their wallets above when collected; handles alone cannot enforce identity.
const excludedHandles = new Set([...lockedPlayers.map(p => normalizeHandle(p.xHandle)), 'codezenith']);

type LeaderboardPlayer = { id: number; x_handle: string | null; wins: number; games: number; wallet_address: string | null };

function rankPlayers(rows: LeaderboardPlayer[]) {
  const seen = new Set<string>();
  return [...rows].sort((a, b) => b.wins - a.wins || a.games - b.games || a.id - b.id).filter(player => {
    const wallet = normalizeWallet(player.wallet_address);
    if (excludedWallets.has(wallet) || excludedHandles.has(normalizeHandle(player.x_handle))) return false;
    if (wallet && seen.has(wallet)) return false;
    if (wallet) seen.add(wallet);
    return true;
  });
}

function LiveLeaderboard() {
  const [rows, setRows] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let running = false;
    const controller = new AbortController();
    const checkClosed = () => {
      const ended = Date.now() >= Date.parse(CLOSES_AT);
      if (!disposed) setClosed(ended);
      return ended;
    };
    async function refresh() {
      if (disposed || running) return;
      if (checkClosed()) { setLoading(false); return; }
      running = true;
      try {
        const fetched: LeaderboardPlayer[] = [];
        // Read all rows before exclusions/deduplication so lower eligible ranks can move up.
        // ID order keeps pagination stable; ranking happens after collection.
        for (let offset = 0; ; offset += 500) {
          const result = await supabase.from('street_leaderboard')
            .select('id, x_handle, wins, games, wallet_address')
            .order('id', { ascending: true }).range(offset, offset + 499)
            .abortSignal(controller.signal);
          if (result.error) throw result.error;
          if (disposed) return;
          const batch = (result.data ?? []) as LeaderboardPlayer[];
          fetched.push(...batch);
          if (batch.length < 500) break;
        }
        if (!disposed && !checkClosed()) { setRows(rankPlayers(fetched)); setError(false); }
      } catch {
        if (!disposed) setError(true);
      } finally {
        running = false;
        if (!disposed) setLoading(false);
      }
    }
    void refresh();
    const refreshTimer = window.setInterval(() => { void refresh(); }, 30000);
    const deadlineTimer = window.setInterval(checkClosed, 1000);
    return () => { disposed = true; controller.abort(); window.clearInterval(refreshTimer); window.clearInterval(deadlineTimer); };
  }, []);

  if (closed) return <p className="border-t border-white/10 px-5 py-8 text-center text-gray-300">Final Call has closed. Final GTD allocations will be published after verification.</p>;
  if (loading) return <p role="status" className="px-5 py-8 text-center text-gray-300">Loading standings…</p>;
  if (error) return <p role="alert" className="px-5 py-8 text-center text-yellow-300">Standings are temporarily unavailable. Retrying automatically.</p>;

  const displayed = rows.slice(0, 100);
  const qualifyingIds = new Set(displayed.filter(p => /^0x[a-f0-9]{40}$/i.test(normalizeWallet(p.wallet_address))).map(p => p.id));
  return (
    <>
      <p className="border-t border-white/10 px-5 py-4 text-center text-sm text-gray-300">
        Top 100 after exclusions. No minimum wins. A recorded wallet is required to confirm your GTD place.
      </p>
      {displayed.length === 0 ? <p className="px-5 py-8 text-center text-gray-400">No eligible results yet. New standings will appear here as battles are recorded.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left text-sm">
            <caption className="sr-only">Final Call standings, excluding known free-mint winners and duplicate wallets</caption>
            <thead className="border-y border-white/10 text-xs uppercase text-gray-400"><tr>
              {['Rank', 'Turf Warrior', 'Wins', 'Games', 'Wallet Status'].map(label => <th key={label} scope="col" className="px-3 py-4">{label}</th>)}
            </tr></thead>
            <tbody>{displayed.map((player, index) => {
              const validWallet = /^0x[a-f0-9]{40}$/.test(normalizeWallet(player.wallet_address));
              return <tr key={player.id} className="border-b border-white/10 last:border-0">
                <td className="px-3 py-4 font-bold">{index + 1}</td>
                <th scope="row" className="px-3 py-4 font-bold">
                  @{(player.x_handle ?? '').trim().replace(/^@/, '') || 'unlisted'}
                  {qualifyingIds.has(player.id) && <span className="mt-1 block text-[10px] font-normal uppercase text-emerald-400">Currently qualifying</span>}
                </th>
                <td className="px-3 py-4 font-black tabular-nums text-emerald-400">{player.wins}</td>
                <td className="px-3 py-4 tabular-nums">{player.games}</td>
                <td className={`px-3 py-4 ${validWallet ? 'text-emerald-400' : 'text-yellow-400'}`}>{validWallet ? '✓ Confirmed' : 'Wallet Required'}</td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}
      <p className="px-5 py-4 text-center text-xs text-gray-400">Updates every 30 seconds. Duplicate wallets retain their highest-ranked entry; scores are not combined.</p>
    </>
  );
}


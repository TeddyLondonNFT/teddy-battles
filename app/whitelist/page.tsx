import { supabase } from '@/lib/supabase';

import leftTeddy from './left-teddy.png';
import rightTeddy from './right-teddy.png';
import turfBg from './turf-bg.jpg';
import turfWarsLogo from './turfwars-logo.png';
import { NavBar } from '@/components/NavBar';

export const dynamic = 'force-dynamic';

const historicalPlayers = [
  { xHandle: '@Lorex', freeMints: 3, wallet: '' },
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
  { xHandle: '@jpeghedge', freeMints: 2, wallet: '0xa4e7918fb5f4a8c12f9513b193be1d764d5757dc' },

  { xHandle: '@AlwaysWinning', freeMints: 1, wallet: '' },
  {
    xHandle: '@A_R_C_NFTs',
    freeMints: 1,
    wallet: '0x5933144b5f9f5e71fef149c7f60e8229906a1f26',
  },
  { xHandle: '@cann0nnft', freeMints: 1, wallet: '' },
  { xHandle: '@dgkacid', freeMints: 1, wallet: '' },
  { xHandle: '@Tjay_sznn', freeMints: 1, wallet: '' },
  { xHandle: '@kadirbykl616161', freeMints: 1, wallet: '' },
  { xHandle: '@eastmahnn', freeMints: 1, wallet: '' },
  {
    xHandle: '@milesmuso',
    freeMints: 1,
    wallet: '0xf2e4a05cBae83fb3173BECEe7a31686e8A6ae3Ce',
  },
  { xHandle: '@no-handle', freeMints: 1, wallet: '' },
  { xHandle: '@yungartist', freeMints: 1, wallet: '' },
  { xHandle: '@Joshstuner', freeMints: 1, wallet: '' },
  { xHandle: '@yung', freeMints: 1, wallet: '' },
  { xHandle: '@daboyonix', freeMints: 1, wallet: '' },
  { xHandle: '@Kevinwburger', freeMints: 1, wallet: '' },
  { xHandle: '@Kiwimitchy', freeMints: 1, wallet: '' },
  { xHandle: '@voodoonemesi', freeMints: 1, wallet: '0x56aea8FC69b39F62A8d76b6f19aa6Ce974112ABe' },
  { xHandle: '@krespo', freeMints: 1, wallet: '0xbfBFB28754F2ae61Cef971BB702cdf8d9fbBeD73' },
];

const TOTAL_TURF_WARS_MINTS = 50;
const LIVE_STREET_LEAGUE_SPOTS = 21;

export default async function WhitelistPage() {
  const historicalEarned = historicalPlayers.reduce(
    (total, player) => total + player.freeMints,
    0
  );

  const { data: liveLeaderboard, error } = await supabase
    .from('street_leaderboard')
    .select('id, x_handle, wins, games, wallet_address')
    .order('wins', { ascending: false })
    .order('games', { ascending: true })
    .limit(LIVE_STREET_LEAGUE_SPOTS);

  const currentQualifiers = liveLeaderboard ?? [];

  const progress =
    (historicalEarned / TOTAL_TURF_WARS_MINTS) * 100;

return (
  <main
    className="relative min-h-screen overflow-hidden text-white px-4 sm:px-6"
    style={{
      backgroundImage: `
        linear-gradient(
          rgba(8,8,18,0.30),
          rgba(8,8,18,0.40)
        ),
        url(${turfBg.src})
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}
  >
    <NavBar />

    {/* LEFT TEDDY */}
      <img
        src={leftTeddy.src}
        alt=""
        className="
          pointer-events-none
          select-none
          hidden
          lg:block
          fixed
          left-0
          bottom-0
          z-0
          w-[32vw]
          max-w-[520px]
        "
      />

      {/* RIGHT TEDDY */}
      <img
        src={rightTeddy.src}
        alt=""
        className="
          pointer-events-none
          select-none
          hidden
          lg:block
          fixed
          right-0
          bottom-0
          z-0
          w-[32vw]
          max-w-[520px]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto pt-12 sm:pt-16">
<div className="flex justify-center mb-3">
  <img
    src={turfWarsLogo.src}
    alt="Teddy London Turf Wars"
    className="w-[680px] max-w-[92vw] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
  />
</div>

<p className="text-center text-gray-200 mb-8 text-sm sm:text-base">
  The Crew — Free Mint Allocation
</p>

        {/* TOTALS */}
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
          <div className="border border-yellow-400/50 bg-black/60 backdrop-blur-sm rounded-xl p-5 text-center">
            <div className="text-yellow-400 text-4xl sm:text-5xl font-black">
              {historicalEarned}
            </div>

            <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">
              Locked
            </div>
          </div>

          <div className="border border-yellow-400/50 bg-black/60 backdrop-blur-sm rounded-xl p-5 text-center">
            <div className="text-white text-4xl sm:text-5xl font-black">
              {LIVE_STREET_LEAGUE_SPOTS}
            </div>

            <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">
              Up for Grabs!
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-yellow-400"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="text-center text-sm text-gray-300 mt-4 leading-relaxed">
            29 free Crew mints were permanently earned through the original
            Turf Wars. The final 21 places will be decided through Street
            League.
          </p>
        </div>

{/* HISTORICAL TABLE */}
<div className="max-w-3xl mx-auto border border-yellow-400/50 bg-black/80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">

  {/* HISTORICAL TITLE */}
  <div className="text-center px-6 py-7 border-b border-yellow-400/30 bg-black/50">
    <p className="text-yellow-400 tracking-[0.25em] text-xs uppercase mb-2">
      Original Turf Wars
    </p>

    <h2 className="text-3xl sm:text-4xl font-black text-white">
      29 FREE MINTS LOCKED
    </h2>

    <p className="text-gray-300 mt-2">
      These allocations were already earned and cannot change.
    </p>
  </div>
          <div className="hidden sm:grid grid-cols-[1fr_140px_180px] gap-4 px-6 py-4 border-b border-white/10 text-xs text-gray-400 uppercase tracking-widest">
            <div>Turf Warrior</div>

            <div className="text-right">
              Free Crew
            </div>

            <div className="text-right">
              Wallet Status
            </div>
          </div>

          {historicalPlayers.map((player) => {
            const walletConfirmed = Boolean(player.wallet);

            return (
              <div
                key={player.xHandle}
                className="
                  grid
                  grid-cols-[1fr_auto]
                  sm:grid-cols-[1fr_140px_180px]
                  gap-4
                  items-center
                  px-5
                  sm:px-6
                  py-5
                  border-b
                  border-white/10
                  last:border-b-0
                "
              >
                <div>
                  <div className="text-lg font-bold">
                    {player.xHandle}
                  </div>

                  <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                    Original Turf Wars
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-yellow-400 text-2xl font-black">
                    ×{player.freeMints}
                  </div>

                  <div className="text-xs text-gray-500 uppercase">
                    Free Mint
                    {player.freeMints === 1 ? '' : 's'}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 sm:text-right">
                  {walletConfirmed ? (
                    <>
                      <div className="text-green-400 font-bold">
                        ✓ Confirmed
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        Wallet received
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-yellow-400 font-bold">
                        Wallet Required
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        Reply to the Turf Wars roll call
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>



        {/* SUPABASE ERROR */}
        {error && (
          <div className="max-w-3xl mx-auto mb-5 border border-red-500/50 bg-red-950/60 rounded-xl p-5 text-center">
            <p className="text-red-300 font-bold">
              Street League leaderboard temporarily unavailable.
            </p>
          </div>
        )}

{/* LIVE TABLE */}
{!error && (
  <div className="max-w-3xl mx-auto mt-16 border border-blue-400/50 bg-black/80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">

    {/* LIVE STREET LEAGUE TITLE */}
    <div className="text-center px-6 py-7 border-b border-blue-400/30 bg-black/50">
      <p className="text-blue-400 tracking-[0.25em] text-xs uppercase mb-2">
        Live Street League
      </p>

      <h2 className="text-3xl sm:text-4xl font-black text-white">
        CURRENT TOP 21
      </h2>

      <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
        These are the current holders of the remaining free Crew mint
        spots. Positions remain live until Turf Wars closes.
      </p>
    </div>
            <div className="hidden sm:grid grid-cols-[70px_1fr_100px_100px_160px] gap-3 px-5 py-4 border-b border-white/10 text-xs text-gray-400 uppercase tracking-widest">
              <div>Rank</div>
              <div>Turf Warrior</div>
              <div className="text-right">Wins</div>
              <div className="text-right">Games</div>
              <div className="text-right">Wallet</div>
            </div>

            {currentQualifiers.length === 0 ? (
              <div className="px-6 py-10 text-center text-gray-400">
                No Street League results yet.
              </div>
            ) : (
              currentQualifiers.map((player, index) => {
                const walletConfirmed = Boolean(player.wallet_address);

                const medal =
                  index === 0
                    ? '🥇'
                    : index === 1
                    ? '🥈'
                    : index === 2
                    ? '🥉'
                    : `#${index + 1}`;

                return (
                  <div
                    key={player.id}
                    className="
                      grid
                      grid-cols-[60px_1fr_auto]
                      sm:grid-cols-[70px_1fr_100px_100px_160px]
                      gap-3
                      items-center
                      px-5
                      py-5
                      border-b
                      border-white/10
                      last:border-b-0
                    "
                  >
                    <div className="text-xl font-black">
                      {medal}
                    </div>

                    <div>
                      <div className="text-lg font-bold">
                        @{player.x_handle}
                      </div>

                      <div className="text-xs text-blue-400 uppercase tracking-widest mt-1">
                        Currently Qualifying
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-blue-400 text-2xl font-black">
                        {player.wins}
                      </div>

                      <div className="text-xs text-gray-500 uppercase sm:hidden">
                        Wins
                      </div>
                    </div>

                    <div className="col-start-2 sm:col-start-auto text-left sm:text-right">
                      <div className="text-white font-bold">
                        {player.games}
                      </div>

                      <div className="text-xs text-gray-500 uppercase sm:hidden">
                        Games
                      </div>
                    </div>

                    <div className="col-start-3 sm:col-start-auto text-right">
                      {walletConfirmed ? (
                        <>
                          <div className="text-green-400 font-bold">
                            ✓ Confirmed
                          </div>

                          <div className="text-xs text-gray-500 mt-1">
                            Wallet recorded
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-yellow-400 font-bold">
                            Wallet Required
                          </div>

                          <div className="text-xs text-gray-500 mt-1">
                            Re-enter Street League
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="text-center mt-10 border border-yellow-400/40 bg-black/60 backdrop-blur-sm rounded-xl p-6">
          <p className="text-yellow-400 font-black text-2xl sm:text-3xl">
            50 FREE CREW MINTS
          </p>

          <p className="text-gray-300 mt-2">
            29 locked through the original Turf Wars. 21 fought for through
            Street League.
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 mb-8">
          Street League positions update automatically as battles are recorded.
        </p>
      </div>
    </main>
  );
}
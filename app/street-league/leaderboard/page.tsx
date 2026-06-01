import { supabase } from '@/lib/supabase';
import { NavBar } from '@/components/NavBar';

export const dynamic = 'force-dynamic';

export default async function StreetLeagueLeaderboardPage() {
  const { data: leaderboard } = await supabase
  .from('street_leaderboard')
    .select('*')
    .order('wins', { ascending: false })
    .order('games', { ascending: true });

  return (
<main
  className="min-h-screen relative flex flex-col bg-cover bg-center bg-no-repeat text-white"
  style={{
    backgroundImage: "url('/bg/turfwars_leaderboard.png')",
    backgroundAttachment: 'fixed',
  }}
>
  <NavBar />

  <img
    src="/characters/left-teddy.png"
    className="pointer-events-none fixed left-[2%] bottom-0 w-[45vw] min-w-[200px] max-w-[500px] md:min-w-[250px] z-10"
    alt="Left Teddy"
  />

  <img
    src="/characters/right-teddy.png"
    className="pointer-events-none fixed right-[2%] bottom-0 w-[45vw] min-w-[200px] max-w-[500px] md:min-w-[250px] z-10"
    alt="Right Teddy"
  />

  <div className="fixed top-[4%] left-1/2 -translate-x-1/2 z-30">
    <img
      src="/ui/teddylondon.png"
      alt="Teddy London"
      className="h-10 md:h-14 w-auto opacity-100 drop-shadow-[0_10px_14px_rgba(0,0,0,1)]"
    />
  </div>

  <div className="fixed top-[8%] md:top-[2%] left-1/2 -translate-x-1/2 z-20">
    <img
      src="/logo/turfwars_logo.png"
      alt="Turf Wars"
      className="w-[55vw] md:w-[45vw] min-w-[180px] md:min-w-[280px] max-w-[700px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
    />
  </div>

  <div className="relative z-20 max-w-4xl mx-auto pt-[18vh] md:pt-[36vh] pb-20 px-3 md:px-0">

    <div className="max-w-3xl mx-auto mb-10">
      <div className="bg-black/95 border-2 border-blue-500/40 rounded-2xl px-4 md:px-8 py-4 md:py-5 shadow-2xl mx-3 md:mx-0">

<div className="text-center text-yellow-400 font-black text-xl md:text-5xl uppercase whitespace-nowrap">
  STREET LEAGUE TABLE
</div>

<div className="text-center text-white font-bold uppercase tracking-normal md:tracking-wider text-xs md:text-base mt-2">
  Top 10 Teddy London Crew WL Spots This Week
</div>

      </div>
    </div>

        <div className="border border-blue-400/50 bg-black/70 rounded-xl overflow-hidden">
          {(leaderboard ?? []).map((player, index) => {
            const winRate =
              player.games > 0
                ? Math.round((player.wins / player.games) * 100)
                : 0;

            const medal =
              index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🍺';

            return (
              <div
                key={player.x_handle}
                className="grid grid-cols-[40px_1fr_60px_60px] md:grid-cols-[60px_1fr_120px_120px] gap-2 md:gap-4 items-center px-3 md:px-6 py-4 md:py-5 border-b border-white/10 last:border-b-0"
              >
                <div className="text-3xl">{medal}</div>

                <div>
                  <div className="text-sm md:text-lg font-bold truncate">
                    @{player.x_handle}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">
                    Rank #{index + 1}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-blue-400 text-2xl font-black">
                    {player.wins}
                  </div>
                  <div className="text-xs text-gray-500 uppercase">
                    Wins
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white text-2xl font-black">
                    {winRate}%
                  </div>
                  <div className="text-xs text-gray-500 uppercase">
                    Win Rate
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
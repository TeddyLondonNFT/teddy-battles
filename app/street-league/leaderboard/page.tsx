import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function StreetLeagueLeaderboardPage() {
  const { data: leaderboard } = await supabase
  .from('street_leaderboard')
    .select('*')
    .order('wins', { ascending: false })
    .order('games', { ascending: true });

  return (
    <main className="min-h-screen bg-[#080812] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-blue-400 tracking-[0.35em] text-xs uppercase mb-3">
          Teddy London
        </p>

        <h1 className="text-6xl font-black text-center text-blue-400 mb-2">
          STREET TABLE
        </h1>

        <p className="text-center text-gray-400 mb-10">
          20 Teddy London Crew WL spots available this week.
        </p>

        <div className="border border-blue-400/50 bg-white/5 rounded-xl overflow-hidden">
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
                className="grid grid-cols-[60px_1fr_120px_120px] gap-4 items-center px-6 py-5 border-b border-white/10 last:border-b-0"
              >
                <div className="text-3xl">{medal}</div>

                <div>
                  <div className="text-lg font-bold">
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
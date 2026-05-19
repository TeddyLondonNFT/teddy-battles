import fs from 'fs';
import path from 'path';

const leaderboardPath = path.join(
  process.cwd(),
  'leaderboard.json'
);

export async function POST(request: Request) {
  const data = await request.json();

  let leaderboard = [];

  if (fs.existsSync(leaderboardPath)) {
    leaderboard = JSON.parse(
      fs.readFileSync(
        leaderboardPath,
        'utf8'
      )
    );
  }

  const existing = leaderboard.find(
    (p: any) =>
      p.wallet_address ===
      data.wallet_address
  );

  if (existing) {
    existing.wins +=
      data.winner === 'player'
        ? 1
        : 0;

    existing.games += 1;
  } else {
    leaderboard.push({
      wallet_address:
        data.wallet_address,

      wins:
        data.winner === 'player'
          ? 1
          : 0,

      games: 1,
    });
  }

  fs.writeFileSync(
    leaderboardPath,
    JSON.stringify(
      leaderboard,
      null,
      2
    )
  );

  return Response.json({
    success: true,
  });
}
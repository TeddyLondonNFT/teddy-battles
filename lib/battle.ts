import { TeddyStats, STAT_KEYS } from './nft';
import { RoundResult } from './supabase';

export type BattleState = {
  phase: 'select_nft' | 'battling' | 'round_result' | 'battle_over';

  currentRound: number;

  playerWins: number;

  villainWins: number;

  rounds: RoundResult[];

  selectedStat: keyof TeddyStats | null;

  villain: any | null;

  nft: any | null;

  usedStats: (keyof TeddyStats)[];
};

export const initialBattleState: BattleState = {
  phase: 'select_nft',
  currentRound: 1,
  playerWins: 0,
  villainWins: 0,
  rounds: [],
  selectedStat: null,
  villain: null,
  nft: null,
  usedStats: [],
};

export function resolveRound(
  stat: keyof TeddyStats,
  playerStats: TeddyStats,
  villainStats: TeddyStats,
  roundNumber: number
): RoundResult {
  const playerVal = playerStats[stat];
  const villainVal = villainStats[stat];
  let winner: 'player' | 'villain' | 'draw';
  if (playerVal > villainVal) winner = 'player';
  else if (villainVal > playerVal) winner = 'villain';
  else winner = 'draw';
  return {
    round: roundNumber,
    stat,
    player_value: playerVal,
    villain_value: villainVal,
    winner,
  };
}

export function getBattleWinner(playerWins: number, villainWins: number): 'player' | 'villain' | 'draw' {
  if (playerWins > villainWins) return 'player';
  if (villainWins > playerWins) return 'villain';
  return 'draw';
}
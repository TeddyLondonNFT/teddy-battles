export type TeddyStats = {
  style: number;
  aggression: number;
  street_cred: number;
  loyalty: number;
  rarity: number;
  overall: number;
};

export type TeddyNFT = {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  card_name: string;
  card_number: number;
  stats: TeddyStats;
  attributes: { trait_type: string; value: string }[];
};

export type Villain = {
  id: string;
  name: string;
  image: string;
  description: string;
  stats: TeddyStats;
};

export const STAT_LABELS: Record<keyof TeddyStats, string> = {
  style: '💅 Style',
  aggression: '⚔️ Aggression',
  street_cred: '🏙️ Street Cred',
  loyalty: '🤝 Loyalty',
  rarity: '💎 Rarity',
  overall: '⭐ Overall',
};

export const STAT_KEYS = Object.keys(STAT_LABELS) as (keyof TeddyStats)[];

export function resolveIpfsUrl(url: string): string {
  if (!url) return '/placeholder-teddy.png';
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return url;
}

export async function fetchNFTMetadata(tokenURI: string): Promise<TeddyNFT | null> {
  try {
    const url = resolveIpfsUrl(tokenURI);
    const res = await fetch(url);
    const data = await res.json();
    const dev = data.dev || {};
    return {
      tokenId: data.ID || 0,
      name: data.name || `Teddy #${data.ID}`,
      description: data.description || '',
      image: resolveIpfsUrl(data.image || ''),
      card_name: dev.card_name || data.name,
      card_number: dev.card_number || data.ID,
      attributes: data.attributes || [],
      stats: {
        style: dev.style || 0,
        aggression: dev.aggression || 0,
        street_cred: dev.street_cred || 0,
        loyalty: dev.loyalty || 0,
        rarity: dev.rarity || 0,
        overall: Math.round(dev.overall || 0),
      },
    };
  } catch (err) {
    console.error('Failed to fetch NFT metadata:', err);
    return null;
  }
}

export const VILLAINS: Villain[] = [
  {
    id: 'the_baron',
    name: 'The Baron',
    image: '/villains/baron.png',
    description: 'Old money. Cold eyes. Rules Mayfair with an iron cane.',
    stats: { style: 82, aggression: 55, street_cred: 45, loyalty: 30, rarity: 78, overall: 62 },
  },
  {
    id: 'razor_rick',
    name: 'Razor Rick',
    image: '/villains/razor_rick.png',
    description: 'South London enforcer. Never loses. Never forgets.',
    stats: { style: 50, aggression: 90, street_cred: 85, loyalty: 60, rarity: 55, overall: 72 },
  },
  {
    id: 'duchess',
    name: 'The Duchess',
    image: '/villains/duchess.png',
    description: 'Chelsea aristocrat by day. Underworld queen by night.',
    stats: { style: 95, aggression: 60, street_cred: 70, loyalty: 40, rarity: 88, overall: 75 },
  },
  {
    id: 'brick',
    name: 'Brick',
    image: '/villains/brick.png',
    description: 'No one knows his real name. No one asks twice.',
    stats: { style: 30, aggression: 95, street_cred: 80, loyalty: 75, rarity: 40, overall: 68 },
  },
];
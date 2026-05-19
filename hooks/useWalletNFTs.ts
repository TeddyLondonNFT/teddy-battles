'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { teddyStats } from '@/lib/teddyStats';

export function useWalletNFTs() {
  const { address } = useAccount();

  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;

    async function loadNFTs() {
      setLoading(true);

      try {
        const key = "z-evHsoYSNwPpMebUEnUI";

        const url =
          `https://base-mainnet.g.alchemy.com/nft/v3/${key}` +
          `/getNFTsForOwner?owner=${address}` +
          `&contractAddresses[]=0x9127f47389c5959561e3b82f405fd26776849ccc`;

        const res = await fetch(url);

        const data = await res.json();

        const owned = data.ownedNfts || [];

const fixedNFTs = owned.map((nft: any) => ({
  tokenId: Number(nft.tokenId),
  name: nft.name || `Teddy #${nft.tokenId}`,
  image: nft.image?.cachedUrl || nft.image?.originalUrl || '',
stats: teddyStats[Number(nft.tokenId)] || {
  style: 70,
  aggression: 70,
  street_cred: 70,
  loyalty: 70,
  rarity: 70,
  overall: 70,
},
}));

setNfts(fixedNFTs);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    loadNFTs();

  }, [address]);

  return {
    nfts,
    loading,
    error: null,
    balance: nfts.length,
  };
}
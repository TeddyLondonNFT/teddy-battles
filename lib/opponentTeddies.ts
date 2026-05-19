import { teddyStats } from './teddyStats';

export async function getRandomOpponentTeddy() {

  const tokenIds = Object.keys(teddyStats);

  const randomTokenId =
    Number(
      tokenIds[
        Math.floor(
          Math.random() *
          tokenIds.length
        )
      ]
    );

  const paddedId =
    String(randomTokenId)
      .padStart(3, '0');

  return {
    tokenId: randomTokenId,

name:
  `Teddy #${randomTokenId} ${
    teddyStats[randomTokenId]?.name || ''
  }`,

    image:
      `/teddies/Teddy_${paddedId}.png`,

    stats:
      teddyStats[randomTokenId],
  };
}
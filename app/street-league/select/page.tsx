'use client';

import { teddyStats } from '@/lib/teddyStats';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';

const mercenaries = Array.from({ length: 4 }, () => {
  const availableIds = Object.keys(teddyStats).map(Number);
  const id =
    availableIds[Math.floor(Math.random() * availableIds.length)];

  const padded = id.toString().padStart(3, '0');

return {
  id,
  tokenId: id,
  name: teddyStats[id].name,
  image: `/teddies/Teddy_${padded}.png`,
  stats: teddyStats[id],
};
});

export default function StreetLeagueSelectPage() {
  const router = useRouter();

  const chooseTeddy = (teddy: typeof mercenaries[number]) => {
    localStorage.setItem('streetLeagueTeddy', JSON.stringify(teddy));
    router.push('/street-league/battle');
  };

  return (
<main
  className="h-screen relative overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat text-white"
  style={{ backgroundImage: "url('/bg/landing_background.jpg')" }}
>
<img
  src="/characters/left-teddy.png"
  className="pointer-events-none absolute left-[2%] bottom-0 w-[45vw] min-w-[200px] max-w-[500px] md:min-w-[250px] z-10 teddy-exit-left"
  alt="Left Teddy"
/>

<img
  src="/characters/right-teddy.png"
  className="pointer-events-none absolute right-[2%] bottom-0 w-[45vw] min-w-[200px] max-w-[500px] md:min-w-[250px] z-10 teddy-exit-right"
  alt="Right Teddy"
/>

<div className="absolute top-[2%] left-1/2 -translate-x-1/2 z-20">
  <img
    src="/logo/turfwars_logo.png"
    alt="Turf Wars"
    className="w-[45vw] min-w-[280px] max-w-[700px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
  />
</div>
      <NavBar />

      <section className="flex-1 flex flex-col items-center justify-end text-center px-4 pb-20">
<div className="text-center mb-8">
  <div className="step-banner whitespace-nowrap !text-[11px] md:!text-base lg:!text-xl">
    <span className="text-blue-400">STEP 1</span>
    <span className="mx-3 text-white">—</span>
    <span>PICK YOUR TEDDY</span>
  </div>

<p className="hidden md:block text-center text-lg text-gray-300 mt-2">
  Different traits, different strengths.
  Choose wisely.
</p>
</div>

        <div className="grid grid-cols-2 gap-3 md:gap-6">
{mercenaries.map((teddy, index) => (
  <button
    key={teddy.id}
    onMouseEnter={() => {
      new Audio('/sounds/hover.mp3').play();
    }}
    onClick={() => chooseTeddy(teddy)}
    className="teddy-card-fly bg-black/85 border border-blue-500/40 rounded-2xl p-5 shadow-2xl hover:border-blue-300 transition-all duration-200 cursor-pointer"
    style={{ animationDelay: `${index * 90}ms` }}
  >
              <img
                src={teddy.image}
                alt={teddy.name}
                className="w-[34vw] h-[34vw] max-w-56 max-h-56 object-cover rounded-xl mb-3"
              />

              <div className="text-sm md:text-2xl font-black text-white truncate">
                {teddy.name}
              </div>

              <div className="text-blue-400 text-sm uppercase tracking-widest mt-2">
                Choose
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
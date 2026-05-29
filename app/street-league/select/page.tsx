'use client';

import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';

const mercenaries = Array.from({ length: 3 }, () => {
  const id = Math.floor(Math.random() * 400) + 1;
  const padded = id.toString().padStart(3, '0');

  return {
    id: `street-${padded}`,
    name: `Teddy #${padded}`,
    image: `/teddies/Teddy_${padded}.png`,
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
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg/landing_background.png')" }}
    >
      <NavBar />

      <section className="flex-1 flex flex-col items-center justify-end text-center px-4 pb-20">
        <h1 className="text-5xl font-black text-blue-400 mb-8">
          Choose Your Mercenary
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mercenaries.map((teddy) => (
            <button
              key={teddy.id}
              onMouseEnter={() => {
                new Audio('/sounds/hover.mp3').play();
              }}
              onClick={() => chooseTeddy(teddy)}
              className="bg-black/85 border border-blue-500/40 rounded-2xl p-5 shadow-2xl hover:border-blue-300 transition-all duration-200"
            >
              <img
                src={teddy.image}
                alt={teddy.name}
                className="w-56 h-56 object-cover rounded-xl mb-4"
              />

              <div className="text-2xl font-black text-white">
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
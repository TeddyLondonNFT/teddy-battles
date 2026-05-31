'use client';

import Link from 'next/link';
import { NavBar } from '@/components/NavBar';

export default function StreetLeaguePage() {
  return (
<main
  className="h-screen relative overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat text-white"
  style={{ backgroundImage: "url('/bg/landing_background.jpg')" }}
>
<img
  src="/characters/left-teddy.png"
  className="pointer-events-none absolute left-[2%] bottom-0 w-[45vw] min-w-[200px] max-w-[500px] md:min-w-[250px] z-10"
  alt="Left Teddy"
/>

<img
  src="/characters/right-teddy.png"
  className="pointer-events-none absolute right-[2%] bottom-0 w-[45vw] min-w-[200px] max-w-[500px] md:min-w-[250px] z-10"
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

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 -mt-[20vh] lg:mt-40">
        <div className="bg-black/80 border border-blue-500/40 rounded-2xl p-8 max-w-xl shadow-2xl">
          <h1 className="text-5xl font-black text-blue-400 mb-4">
            STREET LEAGUE
          </h1>

          <p className="text-gray-300 mb-8">
            Play Turf Wars without an OG Teddy. Battle with a street Teddy, earn Street Cred, and compete for whitelist rewards.
          </p>

          <Link
            href="/street-league/play"
            onMouseEnter={() => {
              new Audio('/sounds/hover.mp3').play();
            }}

onClick={() => {
  new Audio('/sounds/whoosh.mp3').play();
}}
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all duration-200"
          >
            Enter Street League
          </Link>
        </div>
      </section>
    </main>
  );
}
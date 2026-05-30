'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { NavBar } from '@/components/NavBar';

export default function HomePage() {

useEffect(() => {
  const whoosh = new Audio('/sounds/whoosh.mp3');

  whoosh.volume = 0.5;

  whoosh.play();
}, []);

  return (
<main
  className="h-screen relative overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg/landing_background.jpg')" }}
    >
      <NavBar />
<Link
  href="/street-league"
  onMouseEnter={() => {
    new Audio('/sounds/hover.mp3').play();
  }}
  onClick={() => {
    new Audio('/sounds/streetleague.mp3').play();
  }}
  className="bubble-pop absolute left-1/2 -translate-x-1/2 bottom-[58%] w-[52vw] min-w-[240px] max-w-[380px] z-20 transition-all duration-200 hover:scale-105 hover:-translate-y-1 active:scale-95 lg:left-[30%] lg:translate-x-0 lg:bottom-[35%] lg:w-[22vw] lg:min-w-[200px] lg:max-w-[340px]"
>
  <img
    src="/logo/streetleague.png"
    alt="Street League"
    className="w-full"
  />
</Link>
<img
  src="/characters/left-teddy.png"
  className="pointer-events-none absolute left-[2%] bottom-0 w-[40vw] min-w-[170px] max-w-[520px] md:min-w-[220px] z-10 teddy-left-enter"
  alt="Left Teddy"
/>

<Link
  href="/og-league"
  onMouseEnter={() => {
    new Audio('/sounds/hover.mp3').play();
  }}
  onClick={() => {
    new Audio('/sounds/og.mp3').play();
  }}
  className="bubble-pop absolute left-1/2 -translate-x-1/2 bottom-[43%] w-[52vw] min-w-[240px] max-w-[380px] z-20 transition-all duration-200 hover:scale-105 hover:-translate-y-2 active:scale-95 lg:left-auto lg:right-[30%] lg:translate-x-0 lg:bottom-[35%] lg:w-[22vw] lg:min-w-[200px] lg:max-w-[340px]"
>
  <img
    src="/logo/ogleague.png"
    alt="OG League"
    className="w-full"
  />
</Link>
<img
  src="/characters/right-teddy.png"
  className="pointer-events-none absolute right-[2%] bottom-0 w-[40vw] min-w-[170px] max-w-[520px] md:min-w-[220px] z-10 teddy-right-enter"
  alt="Right Teddy"
/>

<div className="absolute top-[2%] left-1/2 -translate-x-1/2 z-20">
  <img
    src="/logo/turfwars_logo.png"
    alt="Turf Wars"
    className="turf-logo w-[45vw] min-w-[280px] max-w-[700px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
  />
</div>

      <section className="flex-1 flex flex-col items-center justify-end text-center px-4 pb-[14vh]">
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/street-league"
 onMouseEnter={() => {
  new Audio('/sounds/hover.mp3').play();
}}
onClick={() => {
  new Audio('/sounds/whoosh.mp3').play();
}}
            className="px-10 py-5 text-lg md:text-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all duration-200 hover:scale-105"
          >
            Street League
          </Link>

          <Link
            href="/og-league"
onMouseEnter={() => {
  new Audio('/sounds/hover.mp3').play();
}}
onClick={() => {
  new Audio('/sounds/whoosh.mp3').play();
}}
            className="px-10 py-5 text-lg md:text-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-widest rounded-xl transition-all duration-200 hover:scale-105"
          >
            OG League
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-6 text-center text-gray-600 text-xs">
        TEDDY LONDON © 2026
      </footer>
    </main>
  );
}
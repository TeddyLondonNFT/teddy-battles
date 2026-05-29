'use client';

import Link from 'next/link';
import { NavBar } from '@/components/NavBar';

export default function StreetLeaguePage() {
  return (
    <main
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg/landing_background.png')" }}
    >
      <NavBar />

      <section className="flex-1 flex flex-col items-center justify-end text-center px-4 pb-24">
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
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all duration-200"
          >
            Enter Street League
          </Link>
        </div>
      </section>
    </main>
  );
}
'use client';

import Link from 'next/link';
import { NavBar } from '@/components/NavBar';

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg/landing_background.png')" }}
    >
      <NavBar />

      <section className="flex-1 flex flex-col items-center justify-end text-center px-4 pb-24">
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/street-league"
            onMouseEnter={() => {
              new Audio('/sounds/hover.mp3').play();
            }}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all duration-200"
          >
            Street League
          </Link>

          <Link
            href="/og-league"
            onMouseEnter={() => {
              new Audio('/sounds/hover.mp3').play();
            }}
            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-widest rounded-xl transition-all duration-200"
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
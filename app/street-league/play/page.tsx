'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';

export default function StreetLeaguePlayPage() {
  const router = useRouter();
  const [handle, setHandle] = useState('');

  const enterStreetLeague = () => {
    const cleanHandle = handle.trim().replace('@', '');

    if (!cleanHandle) {
      alert('Enter your X handle first.');
      return;
    }

    localStorage.setItem('streetLeagueHandle', cleanHandle);
    router.push('/street-league/select');
  };

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

          <p className="text-gray-300 mb-6">
            Enter your X handle to join the streets.
          </p>

          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@yourhandle"
            className="w-full mb-6 px-5 py-4 rounded-xl bg-black/70 border border-white/20 text-white text-xl text-center outline-none focus:border-blue-400"
          />

          <button
            onMouseEnter={() => {
              new Audio('/sounds/hover.mp3').play();
            }}
            onClick={enterStreetLeague}
            className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all duration-200"
          >
            Enter The Streets
          </button>
        </div>
      </section>
    </main>
  );
}
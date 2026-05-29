'use client';

import { useEffect, useState } from 'react';
import { NavBar } from '@/components/NavBar';

export default function StreetLeagueBattlePage() {
  const [teddy, setTeddy] = useState<any>(null);
  const [handle, setHandle] = useState('');

  useEffect(() => {
    const savedTeddy = localStorage.getItem('streetLeagueTeddy');
    const savedHandle = localStorage.getItem('streetLeagueHandle');

    if (savedTeddy) {
      setTeddy(JSON.parse(savedTeddy));
    }

    if (savedHandle) {
      setHandle(savedHandle);
    }
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg/turfwars_background.png')" }}
    >
      <NavBar />

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-black/85 border border-blue-500/40 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-5xl font-black text-blue-400 mb-4">
            STREET LEAGUE BATTLE
          </h1>

          <p className="text-gray-300 mb-6">
            Player: @{handle}
          </p>

          {teddy && (
            <div>
              <img
                src={teddy.image}
                alt={teddy.name}
                className="w-64 h-64 object-cover rounded-xl mx-auto mb-4"
              />

              <h2 className="text-3xl font-black">
                {teddy.name}
              </h2>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
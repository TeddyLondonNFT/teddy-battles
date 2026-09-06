'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import turfBg from '@/app/whitelist/turf-bg.jpg';
import turfWarsLogo from '@/app/whitelist/turfwars-logo.png';

export default function StreetLeaguePlayPage() {
  const router = useRouter();

  const [handle, setHandle] = useState('');
  const [wallet, setWallet] = useState('');

  const enterStreetLeague = () => {
    const cleanHandle = handle.trim().replace('@', '');
    const cleanWallet = wallet.trim();

    if (!cleanHandle) {
      alert('Enter your X handle first.');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(cleanWallet)) {
      alert('Enter a valid Base wallet address.');
      return;
    }

    localStorage.setItem('streetLeagueHandle', cleanHandle);
    localStorage.setItem('streetLeagueWallet', cleanWallet);

    router.push('/street-league/select');
  };

  return (
    <main
      className="h-screen relative overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${turfBg.src})` }}
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
  src={turfWarsLogo.src}
  alt="Turf Wars"
  className="w-[45vw] min-w-[280px] max-w-[700px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
/>
      </div>

      <NavBar />

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 -mt-[20vh] lg:mt-40">
        <div className="bg-black/80 border border-blue-500/40 rounded-2xl p-8 max-w-xl w-full shadow-2xl">
          <h1 className="text-5xl font-black text-blue-400 mb-4">
            STREET LEAGUE
          </h1>

          <p className="text-gray-300 mb-6">
            Enter your X handle and Base wallet to join the streets.
          </p>

          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@yourhandle"
            className="w-full mb-4 px-5 py-4 rounded-xl bg-black/70 border border-white/20 text-white text-xl text-center outline-none focus:border-blue-400"
          />

          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Base wallet address 0x..."
            className="w-full mb-6 px-5 py-4 rounded-xl bg-black/70 border border-white/20 text-white text-base text-center outline-none focus:border-blue-400"
          />

          <button
            onMouseEnter={() => {
              new Audio('/sounds/hover.mp3').play();
            }}
            onClick={() => {
              new Audio('/sounds/whoosh.mp3').play();
              enterStreetLeague();
            }}
            className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all duration-200"
          >
            Enter The Streets
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Your wallet will be used to confirm Street League whitelist eligibility.
          </p>
        </div>
      </section>
    </main>
  );
}
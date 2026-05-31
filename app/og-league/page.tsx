'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavBar } from '@/components/NavBar';
import { useAccount } from 'wagmi';

export default function OGLeaguePage() {
  const { isConnected } = useAccount();

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg/landing_background.png')" }}
    >
      <NavBar />

      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-black/80 border border-yellow-500/30 rounded-2xl p-8 max-w-xl shadow-2xl">
          <h1 className="text-5xl font-black text-yellow-400 mb-4">
            OG LEAGUE
          </h1>

          <p className="text-gray-300 mb-8">
            Connect your wallet and put your OG Teddy London NFTs to work. Battle, earn Street Cred, and rise to Boss status.
          </p>

<div className="relative inline-block">
  <div className="inline-block px-8 py-4 bg-gray-700 text-gray-300 font-black uppercase tracking-widest rounded-xl opacity-70 cursor-not-allowed">
    Enter OG Arena
  </div>

  <div className="absolute -top-3 -right-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full rotate-12 shadow-lg">
    COMING SOON
  </div>
</div>
        </div>
      </section>
    </main>
  );
}
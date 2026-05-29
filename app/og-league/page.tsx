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

          {!isConnected ? (
            <ConnectButton />
          ) : (
            <Link
              href="/battle"
              className="inline-block px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-widest rounded-xl transition-all duration-200"
            >
              Enter OG Arena
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
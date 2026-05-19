'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavBar } from '@/components/NavBar';
import { useAccount } from 'wagmi';

export default function HomePage() {
  const { isConnected } = useAccount();

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0f 70%)',
      }}
    >
      <NavBar />

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">

        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="text-yellow-400">Teddy</span>
          <br />
          <span className="text-white">Battles</span>
        </h1>

        <p className="text-gray-400 mb-10">
          Connect wallet → Pick Teddy → Battle → Win NFTs
        </p>

        {!isConnected ? (
          <ConnectButton />
        ) : (
          <Link
            href="/battle"
            className="px-8 py-4 bg-yellow-400 text-black"
          >
            Enter Arena
          </Link>
        )}

      </section>

      <footer className="border-t border-white/5 py-6 text-center text-gray-600 text-xs">
        TEDDY LONDON © 2026
      </footer>

    </main>
  );
}
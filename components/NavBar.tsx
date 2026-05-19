'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <Link href="/" className="font-bold text-xl text-yellow-400">
        Teddy Battles
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/battle"
          className="text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
        >
          Battle
        </Link>
        <Link
          href="/leaderboard"
          className="text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
        >
          Leaderboard
        </Link>
        <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
      </div>
    </nav>
  );
}
'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';

export function NavBar() {
  const pathname = usePathname();

  const isStreetLeague = pathname.startsWith('/street-league');
  const isHomePage = pathname === '/';
  const isOGLeague = pathname.startsWith('/og-league');

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-white/10">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="font-black text-xl tracking-wider text-yellow-400 hover:text-white transition-colors"
        >
          HOME
        </Link>

        <span className="font-black text-xl text-yellow-400">|</span>

        <a
          href="https://opensea.io/collection/teddy-london-the-beginning"
          target="_blank"
          rel="noopener noreferrer"
          className="font-black text-xl tracking-wider text-yellow-400 hover:text-white transition-colors"
        >
          Teddy London - OpenSea
        </a>

        {isStreetLeague && (
          <>
            <span className="font-black text-xl text-yellow-400">|</span>

            <Link
              href="/street-league/leaderboard"
              className="font-black text-xl tracking-wider text-yellow-400 hover:text-white transition-colors"
            >
              LEADERBOARD
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-6">
        {!isHomePage && !isStreetLeague && !isOGLeague && (
          <Link
            href="/battle"
            className="text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
          >
            Battle
          </Link>
        )}

        {!isHomePage && !isStreetLeague && !isOGLeague && (
          <ConnectButton
            showBalance={false}
            chainStatus="none"
            accountStatus="avatar"
          />
        )}
      </div>
    </nav>
  );
}
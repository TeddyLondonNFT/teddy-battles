'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

 const isStreetLeague =
  pathname.startsWith('/street-league') || pathname === '/whitelist';
  const isHomePage = pathname === '/';
  const isOGLeague = pathname.startsWith('/og-league');

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-white/10">

      {/* Left side */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="font-black text-xl tracking-wider text-yellow-400 hover:text-white transition-colors"
        >
          HOME
        </Link>

        {/* Desktop only */}
        <div className="hidden md:flex items-center gap-3">
          <span className="font-black text-xl text-yellow-400">|</span>

          <a
            href="https://opensea.io/collection/teddy-london-the-beginning"
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-xl tracking-wider text-yellow-400 hover:text-white transition-colors"
          >
            NFTS
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
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-6">
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

      {/* Mobile Burger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-yellow-400 text-3xl font-black"
        >
          ☰
        </button>

        {menuOpen && (
          <div className="absolute right-4 top-16 bg-black/95 border border-yellow-500/30 rounded-xl p-4 shadow-2xl flex flex-col gap-3 min-w-[180px]">

            <a
              href="https://opensea.io/collection/teddy-london-the-beginning"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-yellow-400"
            >
              Teddy London - OpenSea
            </a>

            {isStreetLeague && (
              <Link
                href="/street-league/leaderboard"
                className="font-black text-yellow-400"
              >
                LEADERBOARD
              </Link>
            )}

            {!isHomePage && !isStreetLeague && !isOGLeague && (
              <Link
                href="/battle"
                className="font-black text-yellow-400"
              >
                BATTLE
              </Link>
            )}
          </div>
        )}
      </div>

    </nav>
  );
}
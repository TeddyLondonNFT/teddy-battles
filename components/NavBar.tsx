'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname } from 'next/navigation';

export function NavBar() {
  const pathname = usePathname();

  const isStreetLeague = pathname.startsWith('/street-league');
  const isHomePage = pathname === '/';

  const simplifiedNav = isStreetLeague || isHomePage;

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
     <div className="flex items-center gap-3">
  <Link
    href="/"
    className="font-black text-xl tracking-wider text-yellow-400"
  >
    HOME
  </Link>

  {!isHomePage && (
    <>
      <span className="font-black text-yellow-400">|</span>

      <Link
        href={isStreetLeague ? '/street-league/leaderboard' : '/leaderboard'}
        className="font-black text-xl tracking-wider text-yellow-400"
      >
        LEADERBOARD
      </Link>
    </>
  )}
</div>

      <div className="flex items-center gap-6">



        {!simplifiedNav && (
          <Link
            href="/battle"
            className="text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
          >
            Battle
          </Link>
        )}




        {!simplifiedNav && (
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
'use client';

import { useEffect, useState } from 'react';

const DEADLINE = new Date('2026-10-03T23:59:00+09:00').getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  closed: boolean;
};

function getTimeLeft(): TimeLeft {
  const difference = DEADLINE - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      closed: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    closed: false,
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return null;
  }

  if (timeLeft.closed) {
    return (
      <div className="text-center">
        <div className="text-yellow-400 text-xs sm:text-sm font-black uppercase tracking-[0.25em]">
          Free Mint
        </div>

        <div className="text-red-500 text-2xl sm:text-3xl font-black uppercase mt-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
          Closed
        </div>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hrs' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <div className="text-center">
      <div className="text-yellow-400 text-xs sm:text-sm font-black uppercase tracking-[0.25em] mb-3">
        Free Mint WL Closes In
      </div>

      <div className="flex items-start justify-center gap-2 sm:gap-3">
        {units.map((unit, index) => (
          <div key={unit.label} className="flex items-start">
            <div>
              <div className="text-green-400 text-2xl sm:text-3xl font-black tabular-nums drop-shadow-[0_0_10px_rgba(74,222,128,0.9)]">
                {String(unit.value).padStart(2, '0')}
              </div>

              <div className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                {unit.label}
              </div>
            </div>

            {index < units.length - 1 && (
              <div className="text-yellow-400 text-xl sm:text-2xl font-black mx-1 mt-1">
                :
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-3">
        WL Closes 3 October 2026 · 11:59 PM JST
      </div>
    </div>
  );
}
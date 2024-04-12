"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from 'next/link'

export default function Navbar() {
  const { address, connector, isConnected } = useAccount();

  return (
    <div className="fixed top-0 z-10 border-b-2 border-black w-full flex items-center justify-between max-w-5xl font-mono text-sm backdrop-blur px-4 py-4">
      <Link
        href="/"
        className="flex static w-auto rounded-xl bg-gray-200 p-3 dark:bg-zinc-800/30"
      >
        Toll Payment BC
      </Link>
      <div className="flex bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <ConnectButton />
      </div>
    </div>
  );
}
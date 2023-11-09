"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from 'next/link'

export default function Navbar() {
  const { address, connector, isConnected } = useAccount();

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <Link
        href="/"
        className="fixed left-0 top-0 flex w-full justify-center  bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl  dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
      >
        Toll Payment BC
      </Link>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <ConnectButton />
      </div>
    </div>
  );
}
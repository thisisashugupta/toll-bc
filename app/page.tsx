"use client";

import React, { useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function Home() {

  function handleClick(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("ono");
  }

  useEffect(() => {
    if (window.ethereum) {
      
    } else {
      console.log("install an ethereum Wallet");
    }
  })

  return (
    <main className="flex h-screen w-screen flex-col items-center p-24">

      <nav className="font-mono font-bold fixed top-0 flex w-full justify-center p-5 items-center text-xl border border-gray-400">
        <p>Toll Payment using BC</p>
      </nav>

      <div className="m-2 relative flex place-items-center">
        <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleClick(e)}>
          <label htmlFor="tollId">Toll ID</label>
          <input className="m-2 p-2 border border-blue-300 rounded-xl" type='text' name='tollId' />
          <button className=" m-2 p-2 bg-blue-300 rounded-xl" type='submit' >Pay Toll Tax</button>
        </form>
      </div>

    </main>
  )
}

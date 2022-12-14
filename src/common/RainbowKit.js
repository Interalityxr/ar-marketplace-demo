import React from 'react'

import '@rainbow-me/rainbowkit/dist/index.css';

import { getDefaultWallets, RainbowKitProvider,midnightTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "interality",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

export const RainbowKit = ({children}) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={midnightTheme()}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

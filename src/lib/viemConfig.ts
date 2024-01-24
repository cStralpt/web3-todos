import { createWalletClient, custom, createPublicClient } from "viem";
import { mainnet } from "viem/chains";

export const localNetChain = {
  id: 1337,
  name: "LocalNet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:8545"],
    },
  },
};

export const moonbaseNet = {
  id: 1287,
  name: "Moonbase Alpha",
  nativeCurrency: { name: "Ether", symbol: "DEV", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.moonbeam.network"],
    },
  },
};

export const berachainTestnet = {
  id: 80085,
  name: "Berchain Artio",
  nativeCurrency: { name: "Berachain", symbol: "BERA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://artio.rpc.berachain.com/"],
    },
  },
};

export const arbitrumStylus = {
  id: 23011913,
  name: "Arbitrum Stylus",
  nativeCurrency: { name: "Arb", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://stylus-testnet.arbitrum.io/rpc"],
    },
  },
};

declare global {
  interface Window {
    ethereum: any;
  }
}
export let walletClient: any;
export let publicClient: any;

if (globalThis.window) {
  publicClient = createPublicClient({
    chain: mainnet,
    transport: custom(window?.ethereum),
  });
  walletClient = createWalletClient({
    // account,
    chain: mainnet,
    transport: custom(window?.ethereum),
  });
}

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

export const walletClient = createWalletClient({
  // account,
  chain: mainnet,
  transport: custom((window as any).ethereum),
});

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: custom((window as any).ethereum),
});

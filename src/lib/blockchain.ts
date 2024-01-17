import { createWalletClient, custom, createPublicClient, Address } from "viem";
import { mainnet } from "viem/chains";

export const connectToWallet = async () => {
  const [account] = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });
  return account;
};
// const [account] = await (window as any).ethereum.request({
//   method: "eth_requestAccounts",
// });
let account;
connectToWallet().then((acc) => {
  account = acc;
});
export const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: custom((window as any).ethereum),
});

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: custom((window as any).ethereum),
});

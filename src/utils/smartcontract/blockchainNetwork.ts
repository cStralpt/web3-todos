import { walletClient } from "@/lib/viemConfig";

export const getAccountAddresses = async () => {
  const addresses = await walletClient.getAddresses();
  return addresses;
};

export const getWalletAddress = async () => {
  const account = await getAccountAddresses();
  return account[0];
};

declare global {
  interface Window {
    ethereum: any;
  }
}
export const connectToWallet = async () => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return account;
};

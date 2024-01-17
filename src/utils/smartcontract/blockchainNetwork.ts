import { walletClient } from "@/lib/viemConfig";

export const getAccountAddresses = async () => {
  const addresses = await walletClient.getAddresses();
  return addresses;
};

export const getWalletAddress = async () => {
  const account = await getAccountAddresses();
  return account[0];
};

export const connectToWallet = async () => {
  const [account] = await (window as any).ethereum.request({
    method: "eth_requestAccounts",
  });
  return account;
};

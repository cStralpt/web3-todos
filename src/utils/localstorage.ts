import { TNetworkTarget } from "./smartcontract/contractReadOrWrite";

export const setCurrentNetwork = (networkName: TNetworkTarget) => {
  if (globalThis?.localStorage) {
    localStorage.setItem("currentNetwork", networkName);
  }
};

export const getCurrentNetwork = () => {
  if (globalThis?.localStorage) {
    return localStorage.getItem("currentNetwork");
  }
};

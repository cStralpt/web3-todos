import { Abi } from "abitype";
import abi from "../../lib/todoABI.json";
import {
  berachainTestnet,
  moonbaseNet,
  publicClient,
  walletClient,
} from "@/lib/viemConfig";
import { getWalletAddress } from "./blockchainNetwork";

export const chainList = {
  berachainTestnet: {
    contractAddress: "0x4c5859f0f772848b2d91f1d83e2fe57935348029",
    chainConfig: berachainTestnet,
  },
  moonbaseNet: {
    contractAddress: "0x9c65f85425c619A6cB6D29fF8d57ef696323d188",
    chainConfig: moonbaseNet,
  },
};
export type TNetworkTarget = "moonbaseNet" | "berachainTestnet";
export const getAllTodos = async (networkTarget: TNetworkTarget) => {
  const todo = await publicClient.readContract({
    abi: abi as Abi,
    address: chainList[networkTarget].contractAddress,
    functionName: "getAllTodos",
  });
  console.log({ todo });
  return todo;
};

export const getTodoByName = async (
  name: string,
  networkTarget: TNetworkTarget,
) => {
  const todo = await publicClient.readContract({
    account: await getWalletAddress(),
    abi: abi as Abi,
    address: chainList[networkTarget].contractAddress,
    functionName: "getTodo",
    args: [name],
  });
  console.log({ todo });
  return todo;
};

export const addTodo = async (
  name: string,
  content: string,
  networkTarget: TNetworkTarget,
) => {
  const { request } = await publicClient.simulateContract({
    account: await getWalletAddress(),
    chain: chainList[networkTarget].chainConfig,
    abi: abi as Abi,
    address: chainList[networkTarget].contractAddress,
    functionName: "createTodo",
    args: [name, content],
  });
  const todo = await walletClient.writeContract(request);
  console.log({ todo });
  return todo;
};

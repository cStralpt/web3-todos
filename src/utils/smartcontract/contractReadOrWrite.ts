import { Abi } from "abitype";
import abi from "../../lib/todoABI.json";
import { localNetChain, publicClient, walletClient } from "@/lib/viemConfig";
import { getWalletAddress } from "./blockchainNetwork";

const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export const getAllTodos = async () => {
  const todo = await publicClient.readContract({
    abi: abi as Abi,
    address: contractAddress,
    functionName: "getAllTodos",
  });
  console.log({ todo });
  return todo;
};

export const getTodoByName = async (name: string) => {
  const todo = await publicClient.readContract({
    account: await getWalletAddress(),
    abi: abi as Abi,
    address: contractAddress,
    functionName: "getTodo",
    args: [name],
  });
  console.log({ todo });
  return todo;
};

export const addTodo = async (name: string, content: string) => {
  const { request } = await publicClient.simulateContract({
    account: await getWalletAddress(),
    chain: localNetChain,
    abi: abi as Abi,
    address: contractAddress,
    functionName: "createTodo",
    args: [name, content],
  });
  const todo = await walletClient.writeContract(request);
  console.log({ todo });
  return todo;
};

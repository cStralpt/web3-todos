import { publicClient, walletClient } from "@/lib/blockchain";
import { Abi } from "abitype";
import abi from "../../lib/todoABI.json";

export const getAllTodos = async () => {
  const todo = await publicClient.readContract({
    abi: abi as Abi,
    address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    functionName: "getAllTodos",
  });
  console.log({ todo });
  return todo;
};

export const getTodoByName = async (name: string) => {
  const todo = await publicClient.readContract({
    abi: abi as Abi,
    address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    functionName: "getTodo",
    args: [name],
  });
  console.log({ todo });
  return todo;
};

const getAccount = async () => {
  const [account] = await walletClient.getAddresses();
  return account;
};
export const addTodo = async (name: string, content: string) => {
  const { request } = await publicClient.simulateContract({
    account: await getAccount(),
    chain: {
      id: 1337,
      name: "LocalNet",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        default: {
          http: ["http://localhost:8545"],
        },
      },
    },
    abi: abi as Abi,
    address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    functionName: "createTodo",
    args: [name, content],
  });
  const todo = await walletClient.writeContract(request);
  console.log({ todo });
  return todo;
};

import { publicClient } from "@/lib/blockchain";
import { Abi } from "abitype";
import abi from "../../lib/todoABI.json";

export const getAllTodos = async () => {
  const todo = await publicClient.readContract({
    abi: abi as Abi,
    address: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
    functionName: "getAllTodos",
  });
  console.log({ todo });
  return todo;
};

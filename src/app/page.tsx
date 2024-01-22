"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  TNetworkTarget,
  addTodo,
  getAllTodos,
  getTodoByName,
} from "@/utils/smartcontract/contractReadOrWrite";
import TodoAction from "@/components/TodoAction";
import {
  connectToWallet,
  getWalletAddress,
} from "@/utils/smartcontract/blockchainNetwork";
import Image from "next/image";
import { moonbaseNet, berachainTestnet, walletClient } from "@/lib/viemConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentNetwork, setCurrentNetwork } from "@/utils/localstorage";

declare global {
  interface Window {
    ethereum: any;
  }
}
export default function Home() {
  type TTodoItem = {
    id: string;
    name: string;
    content: string;
  };
  const [allTodos, setAllTodos] = useState<TTodoItem[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>();
  const [networkName, setNetworkName] = useState<TNetworkTarget>(
    getCurrentNetwork() as TNetworkTarget,
  );

  const fetchTodos = async () => {
    const todos = await getAllTodos(getCurrentNetwork() as TNetworkTarget);
    setAllTodos(todos as TTodoItem[]);
  };

  const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number,
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<F>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearchInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputText = event.target.value;
    if (inputText === "") {
      fetchTodos();
    }
    const todo = (await getTodoByName(
      inputText,
      getCurrentNetwork() as TNetworkTarget,
    )) as TTodoItem;
    setAllTodos([todo]);
  };

  const debouncedHandleSearchInput = debounce(handleSearchInput, 500);
  useEffect(() => {
    setCurrentNetwork(networkName);
  }, [networkName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          setWalletAddress(await getWalletAddress());
          fetchTodos();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (getCurrentNetwork() === null) {
      setCurrentNetwork("moonbaseNet");
    }
    fetchData();
  }, []);

  return (
    <main className="p-4 flex justify-center flex-col items-center bg-[url('/rose-petals.svg')] h-screen bg-no-repeat bg-cover">
      <section className="max-w-7xl flex flex-col w-full gap-4 bg-gradient-to-r from-pink-400 to-pink-600 p-4 rounded-xl">
        <div className="flex gap-4">
          <Input
            placeholder="find todo by name"
            onChange={debouncedHandleSearchInput}
          />
          <p className="px-4 bg-pink-50 text-xs rounded-md flex items-center justify-center">
            {walletAddress !== undefined ? walletAddress : "loading adress...."}
          </p>
          <Button
            onClick={() => connectToWallet()}
            variant="ghost"
            className="bg-pink-700"
          >
            <Image src="/metamask.svg" width={20} height={20} alt="metamask" />
            Connect Wallet
          </Button>
          <Button
            onClick={() => fetchTodos()}
            variant="secondary"
            className="bg-pink-100 hover:bg-pink-300"
          >
            Refresh Todo
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="secondary"
                className="bg-pink-100 hover:bg-pink-300"
              >
                Add/Switch Netwok
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Network List</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  walletClient.addChain({ chain: moonbaseNet });
                  setNetworkName("moonbaseNet");
                }}
              >
                <Image
                  src="/metamask.svg"
                  width={20}
                  height={20}
                  alt="metamask"
                />
                Moonbase Alpha
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  walletClient.addChain({ chain: berachainTestnet });
                  setNetworkName("berachainTestnet");
                }}
              >
                <Image
                  src="/metamask.svg"
                  width={20}
                  height={20}
                  alt="metamask"
                />
                Berachain Artio
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TodoAction buttonText="Add Todo" todoAction={addTodo} />
        </div>
        <div className="max-h-[600px] overflow-y-auto overflow-hidde">
          <div className="grid grid-cols-4 gap-4 pr-2">
            {allTodos.map((todoItem) => (
              <Card
                key={`${todoItem.content}+${todoItem.name}`}
                className="backdrop-blur bg-white/60"
              >
                <CardHeader>
                  <CardTitle>{todoItem.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{todoItem.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

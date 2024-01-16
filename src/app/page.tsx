"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { connectToWallet, walletClient } from "@/lib/blockchain";
import { useEffect, useState } from "react";
import { getAllTodos } from "@/utils/smartcontract/todos";

export default function Home() {
  type TTodoItem = {
    id: string;
    name: string;
    content: string;
  };
  const [allTodos, setAllTodos] = useState<TTodoItem[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>();
  const getAccountAddress = async () => {
    const address = await walletClient.getAddresses();
    console.log({ address });
    return address;
  };
  const fetchTodos = async () => {
    const todos = await getAllTodos();
    setAllTodos(todos as TTodoItem[]);
  };

  useEffect(() => {
    fetchTodos();
    getAccountAddress()
      .then((account) => {
        setWalletAddress(account[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="p-4 flex justify-center flex-col items-center bg-[url('/rose-petals.svg')] h-screen">
      <section className="max-w-7xl flex flex-col w-full gap-4 bg-gradient-to-r from-pink-400 to-pink-600 p-4 rounded-xl">
        <div className="flex gap-4">
          <Input placeholder="find todo by name" />
          <p className="px-4 bg-pink-50 text-xs rounded-md flex items-center justify-center">
            {walletAddress !== undefined ? walletAddress : "loading adress...."}
          </p>
          <Button
            onClick={() => connectToWallet()}
            variant="ghost"
            className="bg-pink-700"
          >
            Connect Wallet
          </Button>
          <Button
            onClick={() => fetchTodos()}
            variant="secondary"
            className="bg-pink-100 hover:bg-pink-300"
          >
            Refresh Todo
          </Button>
          <Button
            onClick={() => alert("add todo!")}
            variant="outline"
            className="bg-pink-300 hover:bg-pink-700"
          >
            Add Todo
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {allTodos.map((todoIetm) => (
            <Card key={todoIetm.name} className="backdrop-blur bg-white/60">
              <CardHeader>
                <CardTitle>{todoIetm.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{todoIetm.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

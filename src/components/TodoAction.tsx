"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { TNetworkTarget } from "@/utils/smartcontract/contractReadOrWrite";
import { getCurrentNetwork } from "@/utils/localstorage";

export default function TodoAction({
  buttonText,
  nameValue,
  contentValue,
  todoAction,
}: {
  buttonText: string;
  nameValue?: string;
  contentValue?: string;
  todoAction: (
    name: string,
    content: string,
    networkTarget: TNetworkTarget,
  ) => {};
}) {
  const [inputName, setInputName] = useState<string>();
  const [inputContent, setInputContent] = useState<string>();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-pink-300 hover:bg-pink-700">
          {buttonText}
        </Button>
      </DialogTrigger>
      <form action="">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>
              Make changes to your Todo here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                onChange={(e) => {
                  setInputName(e.target.value);
                }}
                defaultValue={nameValue !== undefined ? nameValue : ""}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                onChange={(e) => {
                  setInputContent(e.target.value);
                }}
                className="w-full grow"
                placeholder="your todo content here"
                defaultValue={contentValue !== undefined ? contentValue : ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (inputName !== undefined && inputContent !== undefined) {
                  todoAction(
                    inputName,
                    inputContent,
                    getCurrentNetwork() as unknown as TNetworkTarget,
                  );
                } else {
                  alert("check your input");
                }
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

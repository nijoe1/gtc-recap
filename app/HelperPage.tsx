"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import SliderWithData from "@/components/SliderWithData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { dummyRecapData } from "@/lib/dummy-data";
import { RecapStatus } from "@/lib/types";
import { isValidEthereumAddress, isValidENS } from "@/lib/utils";

export default function HelperPage() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<RecapStatus>("idle");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = () => {
    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      toast({
        title: "Error",
        description: "Please enter an address or ENS name",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEthereumAddress(trimmedAddress) && !isValidENS(trimmedAddress)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address or ENS name",
        variant: "destructive",
      });
      return;
    }

    setStatus("loading");
    router.push(`/${trimmedAddress}`);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Discover Your Gitcoin Impact</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Enter your Ethereum address to see your contribution journey
        </p>

        <div className="mx-auto flex max-w-md gap-2">
          <Input
            placeholder="Enter ETH address or ENS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                console.log("Enter key pressed");
                handleSubmit();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSubmit} disabled={status === "loading"}>
            {status === "loading" ? "Loading..." : "View Recap"}
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <SliderWithData params={{ address: "0x0", demo: true }} />
      </div>
    </main>
  );
}

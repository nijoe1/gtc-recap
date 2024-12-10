import { useState } from "react";
import { RecapStatus } from "@/lib/types";
import { RecapCarousel } from "@/components/recap-carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dummyRecapData } from "@/lib/dummy-data";
import { useRouter } from "next/navigation";
import { isValidEthereumAddress, isValidENS } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import SliderWithData from "@/components/SliderWithData";

const getMetadata = async() => {
  return "https://gateway.pinata.cloud/ipfs/bafybeiascfaj7n4zt37xhf6pphstmf6cyhvbvia4oa4tfjluj2rnk67g6i";
}

export async function generateMetadata(){
  const image = await getMetadata();

  return {
  title: "Gitcoin | Recap 2024",
  description: "Discover Your Gitcoin Impact",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://recap.gitcoin.co",
    title: "Gitcoin | Recap 2024",
    description: "Discover Your Gitcoin Impact",
    siteName: "Gitcoin",
    images: [
      {
        url: image,
        width: 1200,
        height: 564,
        alt: "Gitcoin Recap 2024",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Gitcoin",
    creator: "@Gitcoin",
    title: "Gitcoin | Recap 2024",
    description: "Discover Your Gitcoin Impact",
    images: [
      {
        url: image,
        alt: "Gitcoin Recap 2024",
      },
    ],
  },
};
}

export default async function Home() {
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

    if (
      !isValidEthereumAddress(trimmedAddress) &&
      !isValidENS(trimmedAddress)
    ) {
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
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Discover Your Gitcoin Impact
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Enter your Ethereum address to see your contribution journey
        </p>

        <div className="flex gap-2 max-w-md mx-auto">
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
        <SliderWithData
          params={{ address: "0x0", demo: true }}
        />
      </div>
    </main>
  );
}

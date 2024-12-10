import HelperPage from "./helperpage";

const getMetadata = async () => {
  return "https://gateway.pinata.cloud/ipfs/bafybeiascfaj7n4zt37xhf6pphstmf6cyhvbvia4oa4tfjluj2rnk67g6i";
};

export async function generateMetadata() {
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
  return <HelperPage />;
}

import HelperPage from "../../HelperPage";

const getMetadata = async () => {
  return "https://recap.gitcoin.co/twitter-image.png";
};

export async function generateMetadata() {
  const image = await getMetadata();

  return {
    metadataBase: new URL("https://recap.gitcoin.co/"),
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

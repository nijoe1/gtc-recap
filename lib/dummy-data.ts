import { RecapData } from "./types";

export const dummyRecapData: RecapData = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  ens: "dummy1234.eth",
  totalDonated: 5000.345,
  projectsCount: 150,
  roundCount: 15,
  totalMatched: 150.25,
  rounds: [
    {
      name: "Community Grants Round #5",
      totalAmount: 2000.5,
      projectsCount: 50,
    },
    {
      name: "Innovators Fund Q2",
      totalAmount: 1200.75,
      projectsCount: 25,
    },
    {
      name: "Builders Support Round",
      totalAmount: 900.35,
      projectsCount: 40,
    },
  ],
  topRound: {
    name: "Community Grants Round #5",
    totalAmount: 2000.5,
    projectsCount: 50,
  },
  topProjects: [
    {
      name: "Alice Johnson - Community Leader",
      logo: "bafkreihbauobycfxsvr5gm5kad7r74vequsz3dcuozvqori3aukm7hnsju",
      roundName: "Community Grants Round #5",
      amount: 100.0,
    },
    {
      name: "Tech Innovators Initiative",
      logo: "bafkreihbauobycfxsvr5gm5kad7r74vequsz3dcuozvqori3aukm7hnsju",
      roundName: "Innovators Fund Q2",
      amount: 120.0,
    },
    {
      name: "Future of Web3 Conference",
      logo: "bafkreihbauobycfxsvr5gm5kad7r74vequsz3dcuozvqori3aukm7hnsju",
      roundName: "Builders Support Round",
      amount: 95.0,
    },
  ],
  chains: [
    {
      name: "Ethereum Mainnet",
      amount: 3000.123,
      color: "hsl(210, 100%, 50%)",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 417"><g fill="#000000"><polygon fill="#343434" points="127.9,0 125.8,7.4 125.8,286.4 127.9,288.5 255.8,208.3 "/><polygon fill="#8C8C8C" points="127.9,0 0,208.3 127.9,288.5 127.9,154.2 "/><polygon fill="#3C3C3B" points="127.9,319.9 126.5,321.5 126.5,414.2 127.9,417 255.9,236.4 "/><polygon fill="#8C8C8C" points="127.9,417 127.9,319.9 0,236.4 "/><polygon fill="#141414" points="127.9,288.5 255.8,208.3 127.9,154.2 "/><polygon fill="#393939" points="0,208.3 127.9,288.5 127.9,154.2 "/></g></svg>',
    },
    {
      name: "Polygon",
      amount: 2000.222,
      color: "hsl(260, 100%, 50%)",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 33"><path fill="#8247E5" d="M19.04 0l5.627 2.875L38 14.303v7.293l-6.675 4.168v3.29L19.04 33l-12.32-6.082v-3.303L0 21.596v-7.293L13.413 2.875z"/></svg>',
    },
  ],
};

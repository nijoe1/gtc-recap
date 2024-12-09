import { gql, request } from "graphql-request";
import {
  ApplicationMetadata,
  Donation,
  GetDonationsResponse,
  GetDonationsVariables,
  RecapData,
  Round,
  RoundMetadata,
} from "./types";
import { dummyRecapData } from "./dummy-data";
import { getChainById, getChains } from "@gitcoin/gitcoin-chain-data";
import dotenv from "dotenv";
import { createPublicClient, Hex, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

dotenv.config();

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const mainnetChainsIds = getChains()
  .filter((chain) => chain.type === "mainnet")
  .map((chain) => chain.id);

// Simulated API service
export async function fetchRecapData(
  addressOrEns: string,
): Promise<RecapData | null> {
  console.log("Fetching recap data for:", addressOrEns);
  let address: string | null = null;
  let ens: string | null = null;

  if (addressOrEns.endsWith(".eth")) {
    ens = addressOrEns;
    try {
      address = await publicClient.getEnsAddress({
        name: normalize(ens),
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  } else if (addressOrEns.startsWith("0x") && addressOrEns.length === 42) {
    address = addressOrEns;
    try {
      ens = await publicClient.getEnsName({
        address: address as Hex,
      });
    } catch (error) {
      console.error("Error fetching ENS:", error);
    }
  } else {
    console.error("Invalid address or ENS name:", addressOrEns);
    return null;
  }

  if (!address) {
    console.error("No address found for ENS:", ens);
    return null;
  }

  address = address.toLowerCase();

  let donations: Donation[] = [];
  try {
    donations = (await fetchDonations(
      address,
      mainnetChainsIds,
      "2024-01-01T00:00:1+00:00",
    )) as Donation[];
  } catch (error) {
    console.error("Error:", error);
  }

  const totals = getTotalsById(donations);
  const roundData = transformDonations(donations);

  return {
    ...dummyRecapData,
    address,
    ens: ens || undefined,
    totalDonated: donations
      .map((d) => d.amountInUsd)
      .reduce((a, b) => a + b, 0),
    projectsCount: totals.length,
    roundCount: roundData.rounds.length,
    topProjects: totals.slice(0, 3).map((t) => ({
      name: t.applicationMetadata.application.project.title,
      logo: t.applicationMetadata.application.project.logoImg,
      roundName: t.roundMetadata.name ?? t.roundMetadata.title ?? "undefined",
      amount: t.totalAmount,
    })),
    rounds: roundData.rounds.slice(0, 3),
    topRound: roundData.topRound,
    chains: getTotalAmountByChainId(donations)
      .slice(0, 3)
      .filter((chain) => chain.totalAmount >= 0.01)
      .map((chain, index) => ({
        name: getChainById(chain.chainId).prettyName,
        amount: chain.totalAmount,
        color: `hsl(var(--chart-${index + 1}))`,
        icon: getChainById(chain.chainId).icon,
      })),
  };
}

const GET_DONATIONS_QUERY = gql`
  query GetDonations(
    $address: String!
    $chainIds: [Int!]!
    $timestamp: Datetime!
  ) {
    donations(
      filter: {
        donorAddress: { equalTo: $address }
        timestamp: { greaterThan: $timestamp }
        chainId: { in: $chainIds }
      }
    ) {
      id
      timestamp
      amountInUsd
      round {
        roundMetadata
      }
      tokenAddress
      application {
        metadata
      }
      chainId
    }
  }
`;

const fetchDonations = async (
  address: string,
  chainIds: number[],
  timestamp: string,
) => {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL;

  if (!endpoint) {
    console.error("GraphQL endpoint not configured");
    return [];
  }

  const variables: GetDonationsVariables = {
    address,
    chainIds,
    timestamp,
  };

  try {
    const response: GetDonationsResponse = await request(
      endpoint,
      GET_DONATIONS_QUERY,
      variables,
    );

    return response.donations;
  } catch (error) {
    console.error("Error fetching donations:", error);
    // throw error;
  }
};

const getTotalsById = (
  arr: Donation[],
): {
  id: string;
  totalAmount: number;
  applicationMetadata: ApplicationMetadata;
  roundMetadata: RoundMetadata;
}[] => {
  if (!arr || arr.length === 0) {
    return [];
  }

  const result = arr.reduce((acc, obj) => {
    if (
      !obj.id ||
      !obj.amountInUsd ||
      !obj.application?.metadata ||
      !obj.round?.roundMetadata
    ) {
      console.error("Missing expected properties on object:", obj);
      return acc;
    }

    if (acc[obj.id]) {
      acc[obj.id].totalAmount += obj.amountInUsd;
    } else {
      acc[obj.id] = {
        totalAmount: obj.amountInUsd,
        applicationMetadata: obj.application.metadata,
        roundMetadata: obj.round.roundMetadata,
      };
    }
    return acc;
  }, {} as Record<string, { totalAmount: number; applicationMetadata: ApplicationMetadata; roundMetadata: RoundMetadata }>);

  const sortedResult = Object.keys(result)
    .map((id) => ({
      id,
      totalAmount: result[id].totalAmount,
      applicationMetadata: result[id].applicationMetadata,
      roundMetadata: result[id].roundMetadata,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);

  return sortedResult;
};

export const transformDonations = (
  donations: Donation[],
): { rounds: Round[]; topRound: Round } => {
  const roundMap: Record<
    string,
    { totalAmount: number; projectsCount: number }
  > = {};

  donations.forEach((donation) => {
    const roundName =
      donation.round.roundMetadata.name ?? donation.round.roundMetadata.title;
    if(roundName === undefined) {
      console.error("==> Missing expected properties on object:", donation);
      return;
    }
    if (!roundMap[roundName]) {
      roundMap[roundName] = { totalAmount: 0, projectsCount: 0 };
    }
    roundMap[roundName].totalAmount += donation.amountInUsd;
    roundMap[roundName].projectsCount += 1;
  });

  const rounds = Object.keys(roundMap).map((name) => ({
    name,
    totalAmount: roundMap[name].totalAmount,
    projectsCount: roundMap[name].projectsCount,
  }));

  const sortedRounds = rounds.sort((a, b) => b.totalAmount - a.totalAmount);

  return {
    rounds: sortedRounds,
    topRound: sortedRounds[0],
  };
};

const getTotalAmountByChainId = (
  donations: Donation[],
): { chainId: number; totalAmount: number }[] => {
  const result = donations.reduce((acc, donation) => {
    const { chainId, amountInUsd } = donation;

    if (acc[chainId]) {
      acc[chainId] += amountInUsd;
    } else {
      acc[chainId] = amountInUsd;
    }

    return acc;
  }, {} as Record<number, number>);

  return Object.keys(result)
    .map((chainId) => ({
      chainId: parseInt(chainId),
      totalAmount: result[parseInt(chainId)],
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
};

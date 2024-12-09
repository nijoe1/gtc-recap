export interface Project {
  name: string;
  logo?: string;
  roundName: string;
  amount: number;
}

export interface Round {
  name: string;
  totalAmount: number;
  projectsCount: number;
}

export interface Chain {
  name: string;
  amount: number;
  color: string;
  icon: string;
}

export interface RecapData {
  address: string;
  ens?: string;
  totalDonated: number;
  projectsCount: number;
  roundCount: number;
  totalMatched: number;
  rounds: Round[];
  topRound: Round 
    // projects: Project[];
  topProjects: Project[];
  chains: Chain[];
}

export type RecapStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "not-found";

export type Donation = {
  id: string;
  timestamp: string;
  amountInUsd: number;
  round: {
    roundMetadata: RoundMetadata;
  };
  tokenAddress: string;
  application: {
    metadata: ApplicationMetadata;
  };
  chainId: number;
};

export type GetDonationsResponse = {
  donations: Donation[];
};

export type GetDonationsVariables = {
  address: string;
  chainIds: number[];
  timestamp: string;
};

export type RoundMetadata = {
  name?: string;
  title?: string;
  programContractAddress: string;
  support?: {
    info: string;
    type: string;
  };
};

export type ApplicationMetadata = {
  signature: string;
  application: {
    round: string;
    answers: {
      type: string;
      hidden: boolean;
      question: string;
      questionId: number;
      encryptedAnswer?: {
        ciphertext: string;
        encryptedSymmetricKey: string;
      };
    }[];
    project: ProjectMetadata;
    recipient: string;
  };
};

export type ProjectMetadata = {
  title: string;
  description: string;
  website: string;
  bannerImg?: string;
  logoImg?: string;
  projectTwitter?: string;
  userGithub?: string;
  projectGithub?: string;
  createdAt: number;
  lastUpdated: number;
};

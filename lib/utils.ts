import { clsx, type ClassValue } from 'clsx';
import { keccak256 } from 'ethers';
import { twMerge } from 'tailwind-merge';
import { stringToBytes } from 'viem';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidENS(ens: string): boolean {
  return /^[a-zA-Z0-9-]+\.eth$/.test(ens);
}

export function formatAddress(address: string): string {
  if (!address) return '';
  if (address.endsWith('.eth')) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const pseudoRandom = (
  address: string,
  salt: string,
  n: number,
): number => {
  const input = address.toLowerCase() + salt;
  const hash = keccak256(stringToBytes(input));
  const hashInt = parseInt(hash.substring(2, 18), 16);
  return hashInt % n;
};

export const pR = pseudoRandom;

export function stringToBlobUrl(data: string): string {
  const blob = new Blob([data], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  return url;
}
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { isValidEthereumAddress, isValidENS } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AddressInputProps {
  onSubmit: (address: string) => void;
  isLoading?: boolean;
}

export function AddressInput({ onSubmit, isLoading = false }: AddressInputProps) {
  const [address, setAddress] = useState('');
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

    onSubmit(trimmedAddress);
  };

  return (
    <div className="flex gap-2 max-w-md mx-auto">
      <Input
        placeholder="Enter ETH address or ENS"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="flex-1"
      />
      <Button 
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "View Recap"}
      </Button>
    </div>
  );
}
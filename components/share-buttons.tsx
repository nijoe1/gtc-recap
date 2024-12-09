'use client';

import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  totalDonated: number;
  projectsCount: number;
  className?: string;
}

export function ShareButtons({ totalDonated, projectsCount, className = '' }: ShareButtonsProps) {
  const { toast } = useToast();
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async (platform: 'twitter' | 'farcaster') => {
    const text = `Check out my Gitcoin Grants impact! I've donated $${totalDonated.toFixed(
      2
    )} to ${projectsCount} projects! 🌟`;

    if (platform === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      );
    } else {
      toast({
        title: 'Coming Soon',
        description: 'Farcaster sharing will be available soon!',
      });
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: 'Link Copied',
      description: 'The link has been copied to your clipboard!',
    });
  };

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="w-full sm:w-auto"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share on Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('farcaster')}
        className="w-full sm:w-auto"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share on Farcaster
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={copyLink}
        className="w-full sm:w-auto"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy Link
      </Button>
    </div>
  );
}
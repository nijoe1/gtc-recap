"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { pR, stringToBlobUrl } from "@/lib/utils";
import { logo } from "@/app/assets/logo";
import { useEffect, useState } from "react";
import { welcomeMessages } from "@/lib/const/welcome";
import Replace from "../replace";
import { textStyles } from "@/lib/const/slideStyles";

interface WelcomeSlideProps {
  address: string;
  ens?: string;
  className?: string;
}

export function WelcomeSlide({ address, ens, className }: WelcomeSlideProps) {
  const [, setRendered] = useState(false);
  const [blobUrl] = useState<string | null>(stringToBlobUrl(logo));
  useEffect(() => {
    setRendered(true);
  }, []);

  const rand1 = pR(address, "WelcomeSlide-0", welcomeMessages.length);
  const rand2 = pR(address, "WelcomeSlide-1", welcomeMessages.length);

  const heading = welcomeMessages[rand1].heading;
  const subtext = welcomeMessages[rand2].subtext;

  const textRnd = pR(address, "WelcomeSlide-2", textStyles.length);
  const textStyle = textStyles[textRnd];

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
    >
      {blobUrl && (
        <div className="text-center space-y-6 sm:space-y-8 px-4 max-w-xl">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <Image
              src={blobUrl}
              alt="Recap logo"
              width={80}
              height={80}
              className="mx-auto"
              priority
              placeholder="blur"
              blurDataURL={blobUrl}
            />
          </motion.div>
          <div className="space-y-4">
            <motion.h2
              className="text-3xl sm:text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
              }}
            >
              {heading}
            </motion.h2>
            <motion.p
              className={`text-xl sm:text-2xl ${textStyle} max-w-lg mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 0.6,
              }}
            >
              <Replace
                text={subtext}
                placeholder="<userAddress>"
                replacement={
                  <span className="text-base font-mono">{ens || address}</span>
                }
              />
            </motion.p>
          </div>
        </div>
      )}
    </Card>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import { Chain } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { pR, stringToBlobUrl } from "@/lib/utils";
import { chainsMessages } from "@/lib/const/chains";
import { textStyles } from "@/lib/const/slideStyles";
import { grid } from "./assets/grid";

interface ChainsSlideProps {
  address: string;
  chains: Chain[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (percent: number) => ({
    width: `${percent}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.5,
    },
  }),
};

export function ChainsSlide({ address, chains, className }: ChainsSlideProps) {
  const total = chains.reduce((sum, chain) => sum + chain.amount, 0);

  const rand1 = pR(address, "ChainsSlide-0", chainsMessages.length);
  const rand2 = pR(address, "ChainsSlide-1", chainsMessages.length);

  const heading = chainsMessages[rand1].heading;
  const subtext = chainsMessages[rand2].subtext;

  const textRnd = pR(address, "ChainsSlide-2", textStyles.length);
  const textStyle = textStyles[textRnd];

  const otherTextStyles = textStyles.filter((style) => style !== textStyle);

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-8`}
      style={{
        backgroundImage: `url(${stringToBlobUrl(grid)})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-xl">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2">
            {heading}
          </h2>
          <p className={`text-sm sm:text-base ${textStyle}`}>{subtext}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {chains.map((chain, index) => {
            const percent = (chain.amount / total) * 100;

            return (
              <motion.div
                key={chain.name}
                variants={itemVariants}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-gray-100 shadow-sm flex items-center justify-center">
                    <motion.div
                      initial={{ rotate: -10, scale: 0.9 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.2,
                      }}
                    >
                      <Image
                        src={stringToBlobUrl(chain.icon)}
                        alt={chain.name}
                        width={24}
                        height={24}
                      />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold">{chain.name}</h3>
                      <span className="text-xl font-bold">
                        ${chain.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100/20 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: otherTextStyles[index]
                            .replace("text-", "")
                            .replace(/[\[\]']+/g, ""),
                        }}
                        variants={progressVariants}
                        custom={percent}
                      />
                    </div>
                  </div>
                </div>
                <div className={`text-xs ${textStyle} ml-16`}>
                  {percent.toFixed(1)}% of total contributions
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-8 pt-6 border-t text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className={`text-sm ${textStyle}`}>Total Chain Impact</div>
          <div className="text-3xl font-bold mt-1">${total.toFixed(2)}</div>
        </motion.div>
      </div>
    </Card>
  );
}

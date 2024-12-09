"use client";

import { Card } from "@/components/ui/card";
import { textStyles } from "@/lib/const/slideStyles";
import { summaryMessages } from "@/lib/const/summary";
import { pR } from "@/lib/utils";
import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
interface SummarySlideProps {
  address: string;
  totalDonated: number;
  projectsCount: number;
  roundCount: number;
  totalMatched: number;
  className?: string;
}

const flipVariants = {
  hidden: {
    rotateX: 90,
    opacity: 0,
  },
  visible: {
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export function SummarySlide({
  address,
  totalDonated,
  projectsCount,
  roundCount,
  totalMatched,
  className,
}: SummarySlideProps) {
  const rand1 = pR(address, "SummarySlide-0", summaryMessages.length);
  const rand2 = pR(address, "SummarySlide-1", summaryMessages.length);

  const heading = summaryMessages[rand1].heading;
  const subtext = summaryMessages[rand2].subtext;

  const textRnd = pR(address, "SummarySlide-0", textStyles.length);
  const textStyle = textStyles[textRnd];

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
    >
      <div className="w-full max-w-xl">
        <div className="text-center space-y-2 mb-8">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1],
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              times: [0, 1],
            }}
          >
            {/* <Globe2 className="w-12 h-12 mx-auto text-primary/80 mb-4" /> */}
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className={`text-sm sm:text-base ${textStyle}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {subtext}
          </motion.p>
        </div>

        <div className="grid gap-4">
          <motion.div
            className="bg-white/10 rounded-xl p-4 text-center perspective-1000"
            initial="hidden"
            animate="visible"
            variants={flipVariants}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold mb-1"
            >
              {roundCount} Rounds Supported
            </motion.div>
            <div className={`text-sm ${textStyle}`}>
              Rounds strengthened by your support
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 rounded-xl p-4 text-center perspective-1000"
            initial="hidden"
            animate="visible"
            variants={flipVariants}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold mb-1"
            >
              {projectsCount} Projects Funded
            </motion.div>
            <div className={`text-sm ${textStyle}`}>
              Projects made possible by your donations
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 rounded-xl p-4 text-center perspective-1000"
            initial="hidden"
            animate="visible"
            variants={flipVariants}
            transition={{ delay: 1.0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6, duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold mb-1"
            >
              ${totalDonated.toFixed(2)}
            </motion.div>
            <div className={`text-sm ${textStyle}`}>
              Total Contributions to Public Goods
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}
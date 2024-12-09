"use client";

import { Card } from "@/components/ui/card";
import { summaryIntro } from "@/lib/const/summaryIntro";
import { pR } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SummaryIntroSlideProps {
  address: string;
  className?: string;
}

export function SummaryIntroSlide({
  address,
  className,
}: SummaryIntroSlideProps) {
  const rand1 = pR(address, "SummaryIntroSlide-0", summaryIntro.length);
  const rand2 = pR(address, "SummaryIntroSlide-1", summaryIntro.length);

  const heading = summaryIntro[rand1].heading;
  const subtext = summaryIntro[rand2].subtext;

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
    >
      <div className="text-center space-y-8 px-4 max-w-xl">
        <div className="relative">
          <motion.div
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className="relative z-10"
          >
            <Sparkles
              className="w-16 h-16 mx-auto text-emerald-500"
              strokeWidth={1}
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.2 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="w-24 h-24 text-emerald-400" strokeWidth={1} />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-emerald-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            {heading}
          </motion.h2>

          <motion.p
            className="text-xl leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            {subtext}{" "}
          </motion.p>
        </div>
      </div>
    </Card>
  );
}

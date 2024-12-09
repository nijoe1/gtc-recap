"use client";

import { Card } from "@/components/ui/card";
import { chainsIntro } from "@/lib/const/chainsIntro";
import { pR } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import Replace from "../replace";
import { textStyles } from "@/lib/const/slideStyles";

interface ChainsIntroSlideProps {
  address: string;
  chainsCount: number;
  className?: string;
}

export function ChainsIntroSlide({
  address,
  chainsCount,
  className,
}: ChainsIntroSlideProps) {
  const rand1 = pR(address, "ChainsIntroSlide-0", chainsIntro.length);
  const rand2 = pR(address, "ChainsIntroSlide-1", chainsIntro.length);

  const heading = chainsIntro[rand1].heading;
  const subtext = chainsIntro[rand2].subtext;

  const textRnd = pR(address, "ChainsIntroSlide-2", textStyles.length);
  const textStyle = textStyles[textRnd];

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
    >
      <div className="text-center space-y-8 px-4 max-w-xl">
        <div className="relative h-32">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Link className={`w-20 h-20 ${textStyle}`} strokeWidth={1} />
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.2 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Link className={`w-24 h-24 ${textStyle}`} strokeWidth={1} />
          </motion.div>
        </div>

        <div className="space-y-6">
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <span className="text-5xl font-bold text-amber-500">
              {chainsCount}
            </span>
            <span className="text-2xl font-medium ml-2">Networks</span>
          </motion.div> */}

          <motion.p
            className="text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            {heading}
          </motion.p>

          <motion.p
            className={`${textStyle} text-lg leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            <Replace
              text={subtext}
              placeholder="<chainsCount>"
              replacement={
                <span className="font-extrabold text-2xl">{chainsCount}</span>
              }
            />
          </motion.p>
        </div>
      </div>
    </Card>
  );
}

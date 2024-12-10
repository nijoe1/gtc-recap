"use client";

import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { thankyouMessages } from "@/lib/const/thankyou";
import { pR } from "@/lib/utils";
import { textStyles } from "@/lib/const/slideStyles";
import Replace from "../replace";
import { ShareButtons } from "../share-buttons";

interface ThankYouSlideProps {
  address: string;
  totalDonated: number;
  projectsCount: number;
  className?: string;
}

const heartbeat = {
  scale: [1, 1.2, 1],
  transition: {
    duration: 1,
    repeat: Infinity,
    // repeatType: "reverse",
  },
};

export function ThankYouSlide({
  address,
  totalDonated,
  projectsCount,
  className,
}: ThankYouSlideProps) {
  const rand1 = pR(address, "ThankYouSlide-0", thankyouMessages.length);
  const rand2 = pR(address, "ThankYouSlide-1", thankyouMessages.length);

  const heading = thankyouMessages[rand1].heading;
  const subtext = thankyouMessages[rand2].subtext;

  const textRnd = pR(address, "ThankYouSlide-2", textStyles.length);
  const textStyle = textStyles[textRnd];

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
    >
      <div className="text-center space-y-6 sm:space-y-8 px-4 max-w-xl">
        <motion.div animate={heartbeat}>
          <Heart
            className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto ${textStyle}`}
            strokeWidth={1}
          />
        </motion.div>
        <div className="space-y-4">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className={`text-xl ${textStyle} max-w-lg mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Replace
              placeholder={"<newLine>"}
              text={subtext}
              replacement={
                <>
                  <br />
                  <br />
                </>
              }
            />
          </motion.p>
          <div className="text-black mt-5">
            <ShareButtons
              totalDonated={totalDonated}
              projectsCount={projectsCount}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

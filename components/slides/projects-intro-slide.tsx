"use client";

import { Card } from "@/components/ui/card";
import { projectsIntroMessages } from "@/lib/const/projectsIntro";
import { pR } from "@/lib/utils";
import { motion } from "framer-motion";
import { Rocket, Stars } from "lucide-react";
import Replace from "../replace";
import Pill from "../pill";

interface ProjectsIntroSlideProps {
  address: string;
  projectsCount: number;
  totalDonated: number;
  className?: string;
}

export function ProjectsIntroSlide({
  address,
  projectsCount,
  totalDonated,
  className,
}: ProjectsIntroSlideProps) {
  const rand1 = pR(
    address,
    "ProjectsIntroSlide-0",
    projectsIntroMessages.length,
  );
  const rand2 = pR(
    address,
    "ProjectsIntroSlide-1",
    projectsIntroMessages.length,
  );

  const heading = projectsIntroMessages[rand1].heading;
  const subtext = projectsIntroMessages[rand2].subtext;

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
    >
      <div className="text-center space-y-8 px-4 max-w-xl">
        <div className="relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Stars className="w-24 h-24 text-purple-400/30" strokeWidth={1} />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.8,
            }}
          >
            <Rocket
              className="w-16 h-16 mx-auto text-purple-500"
              strokeWidth={1}
            />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.1,
            }}
            className="space-y-2"
          >
            <div className="text-5xl font-bold text-purple-500">
              {projectsCount}
            </div>
            <div className="text-xl text-muted-foreground">{heading}</div>
          </motion.div>

          <motion.p
            className="text-2xl font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <Replace
              text={subtext}
              placeholder="<totalDonatedAmount>"
              replacement={`$${totalDonated.toFixed(2)}`}
            />
          </motion.p>

          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            Let&apos;s explore your{" "}
            <Pill bgColor="#A855F7">
              <span className="font-bold">
                Top {projectsCount >= 3 ? 3 : projectsCount}
              </span>
            </Pill>{" "}
            projects you&apos;ve supported this year!
          </motion.p>
        </div>
      </div>
    </Card>
  );
}

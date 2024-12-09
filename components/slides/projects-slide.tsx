"use client";

import { Card } from "@/components/ui/card";
import projectMessages from "@/lib/const/projects";
import { textStyles } from "@/lib/const/slideStyles";
import { Project } from "@/lib/types";
import { pR } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProjectsSlideProps {
  address: string;
  projects: Project[];
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function ProjectsSlide({
  address,
  projects,
  className,
}: ProjectsSlideProps) {
  const rand1 = pR(address, "ProjectsSlide-0", projectMessages.length);
  const rand2 = pR(address, "ProjectsSlide-1", projectMessages.length);

  const heading = projectMessages[rand1].heading;
  const subtext = projectMessages[rand2].subtext;

  const textRnd = pR(address, "ProjectsSlide-2", textStyles.length);
  const textStyle = textStyles[textRnd];

  return (
    <Card
      className={`${className} flex items-center justify-center p-4 sm:p-6`}
    >
      <div className="w-full max-w-xl">
        <motion.div
          className="text-center space-y-2 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
            {heading}
          </h2>
          <p className={`text-sm sm:text-base ${textStyle}`}>{subtext}</p>
        </motion.div>
        <motion.div
          className="grid gap-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white/10 rounded-xl p-3 sm:p-4 transition-colors hover:bg-white/20"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 bg-white/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  <img
                    src={`https://d16c97c2np8a2o.cloudfront.net/ipfs/${
                      project.logo ??
                      "bafkreihbauobycfxsvr5gm5kad7r74vequsz3dcuozvqori3aukm7hnsju"
                    }`}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold truncate">
                    {project.name.length > 40
                      ? project.name.slice(0, 40) + "..."
                      : project.name}
                  </h3>
                  <p className={`text-xs sm:text-sm ${textStyle} truncate`}>
                    {project.roundName}
                  </p>
                </div>
                <div className="text-lg sm:text-xl font-bold shrink-0">
                  ${project.amount.toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Card>
  );
}

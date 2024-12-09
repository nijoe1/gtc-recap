"use client";

import { useEffect, useState } from "react";
import { RecapData } from "@/lib/types";
import { CarouselControls } from "@/components/ui/carousel-controls";
import { motion, AnimatePresence } from "framer-motion";
import { WelcomeSlide } from "./slides/welcome-slide";
import { SummarySlide } from "./slides/summary-slide";
import { RoundsSlide } from "./slides/rounds-slide";
import { ProjectsSlide } from "./slides/projects-slide";
import { ChainsSlide } from "./slides/chains-slide";
import { ThankYouSlide } from "./slides/thank-you-slide";
import { ShareButtons } from "./share-buttons";
import { Button } from "./ui/button";
import { Pause, Play } from "lucide-react";
import { pR } from "@/lib/utils";
import { slideStyles } from "@/lib/const/slideStyles";
import { SummaryIntroSlide } from "./slides/summary-intro-slide";
import { RoundsIntroSlide } from "./slides/rounds-intro-slide";
import { ProjectsIntroSlide } from "./slides/projects-intro-slide";
import { ChainsIntroSlide } from "./slides/chains-intro-slide";

interface RecapCarouselProps {
  data: RecapData;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export function RecapCarousel({ data }: RecapCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    <WelcomeSlide
      key="welcome"
      address={data.address}
      ens={data.ens}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "WelcomeSlide-0", slideStyles.length)]
      }`}
    />,
    <SummaryIntroSlide
      key="summary-intro"
      address={data.address}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "SummaryIntroSlide-6", slideStyles.length)]
      }`}
    />,
    <SummarySlide
      key="summary"
      address={data.address}
      totalDonated={data.totalDonated}
      projectsCount={data.projectsCount}
      roundCount={data.roundCount}
      totalMatched={data.totalMatched}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "SummarySlide-1", slideStyles.length)]
      }`}
    />,
    <RoundsIntroSlide
      key="rounds-intro"
      address={data.address}
      roundsCount={data.roundCount}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "RoundsIntroSlide-7", slideStyles.length)]
      }`}
    />,
    <RoundsSlide
      key="rounds"
      address={data.address}
      rounds={data.rounds}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "RoundsSlide-2", slideStyles.length)]
      }`}
    />,
    <ProjectsIntroSlide
      key="projects-intro"
      address={data.address}
      projectsCount={data.projectsCount}
      totalDonated={data.totalDonated}
      className={`w-full h-full ${
        slideStyles[
          pR(data.address, "ProjectsIntroSlide-8", slideStyles.length)
        ]
      }`}
    />,
    <ProjectsSlide
      key="projects"
      address={data.address}
      projects={data.topProjects}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "ProjectsSlide-3", slideStyles.length)]
      }`}
    />,
    <ChainsIntroSlide
      key="chains-intro"
      address={data.address}
      chainsCount={data.chains.length}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "ChainsIntroSlide-9", slideStyles.length)]
      }`}
    />,
    <ChainsSlide
      key="chains"
      address={data.address}
      chains={data.chains}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "ChainsSlide-4", slideStyles.length)]
      }`}
    />,
    <ThankYouSlide
      key="thank-you"
      address={data.address}
      className={`w-full h-full ${
        slideStyles[pR(data.address, "ThankYouSlide-5", slideStyles.length)]
      }`}
    />,
  ];

  const paginate = (newDirection: number) => {
    setPage(([current]) => [
      (current + newDirection + slides.length) % slides.length,
      newDirection,
    ]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    // Double the duration for the last slide
    const duration = page === slides.length - 1 ? 10000 : 7500;

    const timer = setInterval(() => paginate(1), duration);
    return () => clearInterval(timer);
  }, [isPlaying, page, slides.length]);

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4">
      <div className="w-full max-w-4xl mx-auto aspect-[3/4] sm:aspect-[16/10] relative overflow-hidden rounded-xl shadow-xl">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background scale-75 sm:scale-90"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
          >
            {slides[page]}
          </motion.div>
        </AnimatePresence>
      </div>

      <CarouselControls
        currentSlide={page}
        totalSlides={slides.length}
        onPrevious={() => paginate(-1)}
        onNext={() => paginate(1)}
        onDotClick={(index) => setPage([index, index > page ? 1 : -1])}
        className="mt-4"
      />

      <ShareButtons
        totalDonated={data.totalDonated}
        projectsCount={data.projectsCount}
        className="mt-6"
      />
    </div>
  );
}

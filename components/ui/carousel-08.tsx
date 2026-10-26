"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ReactNode } from "react";

export interface CardItem {
  id: string;
  category: string;
  title: ReactNode;
  src: string;
  alt?: string;
  href?: string;
  icon?: ReactNode;
}

const defaultCards: CardItem[] = [
  {
    id: "1",
    category: "Design Excellence",
    title: <>Elegant experiences, thoughtfully created.</>,
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    category: "Quality",
    title: <>Attention to detail, from start to finish.</>,
    src: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    category: "Technology",
    title: <>Powerful solutions, beautifully engineered.</>,
    src: "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    category: "Growth",
    title: (
      <>
        Built to scale,
        <br /> ready to lead.
      </>
    ),
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "5",
    category: "Design Excellence",
    title: <>Elegant experiences, thoughtfully created.</>,
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "6",
    category: "Quality",
    title: <>Attention to detail, from start to finish.</>,
    src: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "7",
    category: "Technology",
    title: <>Powerful solutions, beautifully engineered.</>,
    src: "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "8",
    category: "Growth",
    title: (
      <>
        Built to scale,
        <br /> ready to lead.
      </>
    ),
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
  },
];

interface AppleCardCarouselProps {
  items?: CardItem[];
  title?: ReactNode;
  showHeader?: boolean;
}

const AppleCardCarousel = ({
  items = defaultCards,
  title = "Get to know shadcnspace",
  showHeader = true,
}: AppleCardCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="w-full py-5 sm:py-8">
      {/* Header */}
      {showHeader && (
        <div className="px-4 sm:px-8 mb-6 sm:mb-8 flex items-center justify-between">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white">
            {title}
          </h2>
          {/* Header controls for desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-xs hover:bg-slate-50 cursor-pointer disabled:opacity-40"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-xs hover:bg-slate-50 cursor-pointer disabled:opacity-40"
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Card Strip */}
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-6 px-4 sm:px-8 py-4">
          {items.map((card) => {
            const cardContent = (
              <div className="group relative w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] lg:w-[360px] lg:h-[520px] border border-slate-200/80 dark:border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-8 rounded-3xl hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer bg-slate-900">
                <img
                  src={card.src}
                  alt={
                    card.alt ||
                    (typeof card.title === "string"
                      ? card.title
                      : card.category)
                  }
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-2 sm:gap-3 text-white">
                  <div className="flex items-center gap-2">
                    {card.icon && <span className="text-white/90">{card.icon}</span>}
                    <p className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-white/80">
                      {card.category}
                    </p>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-display font-bold tracking-tight leading-tight text-white">
                    {card.title}
                  </div>
                </div>

                <div className="relative z-10 flex justify-end">
                  <div className="h-10 w-10 rounded-full shadow-md bg-white hover:bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowUpRight className="h-4 w-4 text-slate-900 transition-transform duration-300 group-hover:rotate-45 will-change-transform" />
                  </div>
                </div>
              </div>
            );

            return (
              <CarouselItem key={card.id} className="pl-6 basis-auto">
                {card.href ? (
                  <Link href={card.href} className="block">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Bottom controls for mobile */}
      <div className="flex sm:hidden justify-end gap-2 px-4 sm:px-8 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 shadow-xs"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 shadow-xs"
          aria-label="Next slide"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export { AppleCardCarousel };
export default AppleCardCarousel;

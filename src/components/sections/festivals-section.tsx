"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Wheat, Sun, Mountain, Ship } from 'lucide-react';
import { KiteIcon } from '../icons/kite-icon';

gsap.registerPlugin(ScrollTrigger);

const festivals = [
  {
    name: 'Uttarayan',
    region: 'Gujarat',
    icon: <Sun className="size-6 text-primary" />,
    description: 'The famous international kite festival where the sky is filled with vibrant kites of all shapes and sizes, symbolizing the awakening of the gods from their long slumber.',
    food: 'Undhiyu, Jalebi, Chikki',
  },
  {
    name: 'Pongal',
    region: 'Tamil Nadu',
    icon: <Wheat className="size-6 text-primary" />,
    description: 'A four-day harvest festival dedicated to the Sun God. The name "Pongal" means "to boil, overflow" and refers to the traditional dish prepared from the new harvest of rice.',
    food: 'Sakkarai Pongal, Ven Pongal',
  },
  {
    name: 'Lohri',
    region: 'Punjab',
    icon: <Mountain className="size-6 text-primary" />,
    description: 'A joyous winter harvest festival celebrated with a community bonfire, folk songs, and dances. It marks the end of winter and the return of longer days.',
    food: 'Gajak, Sarson da Saag, Makki di Roti',
  },
  {
    name: 'Magh Bihu',
    region: 'Assam',
    icon: <Ship className="size-6 text-primary" />,
    description: 'Also known as Bhogali Bihu, it is a harvest festival celebrating the abundance of food. Feasts and bonfires are the main highlights of this celebration.',
    food: 'Pitha, Laru, Jolpan',
  },
];

type KiteStyle = {
  top: string;
  left: string;
  width: string;
  height: string;
  opacity: number;
  transform: string;
  color: string;
};

export default function FestivalsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [kiteStyles, setKiteStyles] = useState<KiteStyle[]>([]);

  useEffect(() => {
    // This effect runs only on the client
    const styles = Array.from({ length: 15 }, () => ({
      top: `${gsap.utils.random(0, 100)}%`,
      left: `${gsap.utils.random(0, 100)}%`,
      width: `${gsap.utils.random(30, 100)}px`,
      height: `${gsap.utils.random(30, 100)}px`,
      opacity: gsap.utils.random(0.05, 0.2),
      transform: `rotate(${gsap.utils.random(-45, 45)}deg)`,
      color: `hsl(${gsap.utils.random(20, 60)}, 90%, 60%)`,
    }));
    setKiteStyles(styles);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const accordion = accordionRef.current;
    if (!section || !accordion) return;

    gsap.set(accordion, { autoAlpha: 0, y: 100 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 80%',
      onEnter: () => {
        gsap.to(accordion, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(accordion, {
          autoAlpha: 0,
          y: 100,
          duration: 0.5,
          ease: 'power3.in',
        });
      },
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-background/50 overflow-hidden">
       {kiteStyles.length > 0 && kiteStyles.map((style, i) => (
        <KiteIcon
          key={i}
          className="absolute pointer-events-none"
          style={style as React.CSSProperties}
        />
      ))}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-headline text-foreground">One Sun, Many Festivals</h2>
          <p className="text-lg text-foreground/70 mt-4 max-w-3xl mx-auto">
            On this auspicious day, the sun begins its northward journey. Across India, this celestial event is celebrated with unique traditions, foods, and festivities.
          </p>
        </div>
        <div ref={accordionRef} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {festivals.map((festival, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-primary/10 last:border-b-0 bg-background/50 rounded-lg mb-2 px-4 shadow-sm">
                <AccordionTrigger className="py-6 text-left hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                      {festival.icon}
                    </div>
                    <div>
                      <h3 className="font-headline text-xl md:text-2xl text-foreground font-semibold">{festival.name}</h3>
                      <p className="text-foreground/60 text-sm">{festival.region}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-16">
                  <p className="text-foreground/80 mb-4">{festival.description}</p>
                  <p className="text-foreground/80">
                    <span className="font-semibold text-primary/90">Try: </span>
                    {festival.food}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

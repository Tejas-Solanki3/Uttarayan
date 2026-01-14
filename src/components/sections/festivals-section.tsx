"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Wheat, Sun, Mountain, Ship } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const festivals = [
  {
    name: 'Uttarayan',
    region: 'Gujarat',
    icon: <Sun className="size-8 text-primary" />,
    description: 'The famous international kite festival where the sky is filled with vibrant kites of all shapes and sizes, symbolizing the awakening of the gods from their long slumber.',
    food: 'Undhiyu, Jalebi, Chikki',
  },
  {
    name: 'Pongal',
    region: 'Tamil Nadu',
    icon: <Wheat className="size-8 text-primary" />,
    description: 'A four-day harvest festival dedicated to the Sun God. The name "Pongal" means "to boil, overflow" and refers to the traditional dish prepared from the new harvest of rice.',
    food: 'Sakkarai Pongal, Ven Pongal',
  },
  {
    name: 'Lohri',
    region: 'Punjab',
    icon: <Mountain className="size-8 text-primary" />,
    description: 'A joyous winter harvest festival celebrated with a community bonfire, folk songs, and dances. It marks the end of winter and the return of longer days.',
    food: 'Gajak, Sarson da Saag, Makki di Roti',
  },
  {
    name: 'Magh Bihu',
    region: 'Assam',
    icon: <Ship className="size-8 text-primary" />,
    description: 'Also known as Bhogali Bihu, it is a harvest festival celebrating the abundance of food. Feasts and bonfires are the main highlights of this celebration.',
    food: 'Pitha, Laru, Jolpan',
  },
];

const FestivalCard = ({ festival }: { festival: (typeof festivals)[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      gsap.to(card, {
        rotationY: x * 20,
        rotationX: -y * 20,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.5,
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 1,
      });
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} style={{ transformStyle: 'preserve-3d' }}>
      <Card className="h-full bg-card/50 backdrop-blur-lg border-primary/20 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow duration-300">
        <CardHeader className="items-center text-center">
          {festival.icon}
          <CardTitle className="font-headline text-2xl text-primary">{festival.name}</CardTitle>
          <CardDescription className="text-foreground/80">{festival.region}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-foreground/90 mb-4">{festival.description}</p>
          <p className="text-center">
            <span className="font-semibold text-primary/90">Try: </span>
            <span className="text-foreground/80">{festival.food}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};


export default function FestivalsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = gsap.utils.toArray<HTMLDivElement>('.festival-card');
    
    gsap.set(cards, { autoAlpha: 0, y: 100, scale: 0.9 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 80%',
      onEnter: () => {
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
        });
      },
      onLeaveBack: () => {
        gsap.to(cards, {
          autoAlpha: 0,
          y: 100,
          scale: 0.9,
          duration: 0.5,
          ease: 'power3.in',
          stagger: 0.1
        })
      },
    });

  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-headline text-foreground">One Sun, Many Festivals</h2>
          <p className="text-lg text-foreground/70 mt-4 max-w-3xl mx-auto">
            On this auspicious day, the sun begins its northward journey. Across India, this celestial event is celebrated with unique traditions, foods, and festivities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {festivals.map((festival, index) => (
            <div key={index} className="festival-card">
              <FestivalCard festival={festival} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

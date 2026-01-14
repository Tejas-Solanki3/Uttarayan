"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sunrise, Wind, Gift, Users, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    time: 'Morning',
    title: 'Holy Dip & Prayers',
    description: 'Devotees take a holy dip in sacred rivers like the Ganges to wash away sins. Prayers are offered to the Sun God for a bountiful harvest.',
    icon: <Sunrise className="size-6 text-primary" />,
  },
  {
    time: 'Day',
    title: 'Kite Flying',
    description: 'Terraces and open grounds fill with people flying colorful kites. The sky becomes a canvas of vibrant, dueling kites.',
    icon: <Wind className="size-6 text-primary" />,
  },
  {
    time: 'Afternoon',
    title: 'Charity & Donations',
    description: 'It is considered auspicious to donate food, clothing, and other items to the needy. This act of giving is called "Daan".',
    icon: <Gift className="size-6 text-primary" />,
  },
  {
    time: 'Evening',
    title: 'Feasts & Sweets',
    description: 'Families and friends gather to share special festive foods like Undhiyu and sweets made of sesame and jaggery.',
    icon: <Users className="size-6 text-primary" />,
  },
  {
    time: 'Night',
    title: 'Bonfires & Celebrations',
    description: 'In many parts of India, especially for Lohri, the day ends with community bonfires, folk music, and dancing.',
    icon: <Moon className="size-6 text-primary" />,
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const items = gsap.utils.toArray<HTMLDivElement>('.timeline-item');

    const ctx = gsap.context(() => {
      // Draw the timeline line
      gsap.from(timeline, {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 30%',
          end: 'bottom 80%',
          scrub: true,
        },
      });
      
      // Animate in items
      items.forEach((item) => {
        gsap.from(item, {
          x: item.classList.contains('timeline-left') ? -100 : 100,
          opacity: 0,
          ease: 'power3.out',
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });

        gsap.from(item.querySelector('.timeline-dot'), {
          scale: 0,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            duration: 0.5,
          }
        })
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-headline text-foreground">The Day's Traditions</h2>
          <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
            Follow the flow of festivities from sunrise to sunset.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div ref={timelineRef} className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2" style={{ transformOrigin: 'top center' }}></div>
          
          {timelineEvents.map((event, index) => (
            <div key={index} className={`timeline-item relative mb-12 flex items-center ${index % 2 === 0 ? 'timeline-left justify-start' : 'timeline-right justify-end'}`}>
              <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'order-1 text-right' : 'order-2 text-left'}`}>
                <Card className="bg-card/60 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'}}>
                      {index % 2 !== 0 && event.icon}
                      <span className="text-xl">{event.title}</span>
                      {index % 2 === 0 && event.icon}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{event.description}</p>
                    <p className="text-sm font-bold text-primary mt-2">{event.time}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="timeline-dot absolute left-1/2 top-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary/50 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              <div className="w-[calc(50%-2rem)] order-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

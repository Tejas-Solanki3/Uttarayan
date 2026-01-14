"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KiteIcon } from '../icons/kite-icon';

gsap.registerPlugin(ScrollTrigger);

const storyPoints = [
  {
    title: 'Solar Transition',
    text: 'Makar Sankranti marks the day the sun begins its journey into the northern hemisphere, a moment known as Uttarayan.',
  },
  {
    title: 'Harvest Significance',
    text: 'This transition signals the end of winter and the beginning of the harvest season, a time of abundance and gratitude.',
  },
  {
    title: 'New Beginnings',
    text: 'Across India, it symbolizes a fresh start, a time to let go of the old and welcome the new with joy and festivities.',
  }
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


export default function SolarTransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [kiteStyles, setKiteStyles] = useState<KiteStyle[]>([]);

  useEffect(() => {
    // This effect runs only on the client
    const styles = Array.from({ length: 25 }, () => ({
      top: `${gsap.utils.random(0, 100)}%`,
      left: `${gsap.utils.random(0, 100)}%`,
      width: `${gsap.utils.random(30, 100)}px`,
      height: `${gsap.utils.random(30, 100)}px`,
      opacity: gsap.utils.random(0.05, 0.15),
      transform: `rotate(${gsap.utils.random(-45, 45)}deg)`,
      color: `hsl(${gsap.utils.random(20, 60)}, 90%, 60%)`,
    }));
    setKiteStyles(styles);
  }, []);


  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    
    const panels = gsap.utils.toArray<HTMLDivElement>('.story-panel');
    const trackWidth = track.offsetWidth;
    const sectionWidth = section.offsetWidth;

    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      gsap.to(track, {
        x: -(trackWidth - sectionWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${trackWidth - sectionWidth}`,
        }
      });
      
      // Animate panels
      panels.forEach((panel, i) => {
        gsap.from(panel, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getTweensOf(track)[0],
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          }
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
       {kiteStyles.length > 0 && kiteStyles.map((style, i) => (
        <KiteIcon
          key={i}
          className="absolute pointer-events-none"
          style={style as React.CSSProperties}
        />
      ))}
      <div ref={trackRef} className="flex h-full items-center relative w-max">
        {storyPoints.map((point, index) => (
          <div 
            key={index} 
            className="story-panel flex flex-col justify-center px-12 md:px-24 w-screen md:w-[70vw] lg:w-[50vw] h-full"
          >
            <h3 className="text-3xl md:text-5xl font-bold font-headline text-primary mb-4">{point.title}</h3>
            <p className="text-lg md:text-xl text-foreground/80 max-w-md">{point.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KiteIcon } from '../icons/kite-icon';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  { text: "RISE", direction: "left" },
  { text: "SOAR", direction: "right" },
  { text: "CELEBRATE", direction: "left" },
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


export default function MotionTypographySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    if (!section) return;

    const ctx = gsap.context(() => {
      quotes.forEach((quote, index) => {
        const el = section.querySelector(`.quote-${index}`);
        if (!el) return;
        
        const isLeft = quote.direction === 'left';
        
        gsap.fromTo(el,
          {
            xPercent: isLeft ? -50 : 50,
            opacity: 0,
            scale: 1.2
          },
          {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            duration: 1.5,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'center 50%',
              scrub: 1.5
            }
          }
        );
        
        gsap.to(el, {
            scale: 0.8,
            opacity: 0.5,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: el,
              start: 'center 40%',
              end: 'bottom top',
              scrub: 1.5
            }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
        {kiteStyles.length > 0 && kiteStyles.map((style, i) => (
        <KiteIcon
          key={i}
          className="absolute pointer-events-none"
          style={style as React.CSSProperties}
        />
      ))}
      <div className="container mx-auto px-4 flex flex-col gap-16 md:gap-24">
        {quotes.map((quote, index) => (
          <div key={index} className={`quote-${index} text-center`}>
            <h2 
              className="text-7xl md:text-9xl lg:text-[12rem] font-black font-headline uppercase text-foreground"
            >
              {quote.text}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}

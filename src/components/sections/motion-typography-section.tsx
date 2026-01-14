"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  { text: "RISE", direction: "left" },
  { text: "SOAR", direction: "right" },
  { text: "CELEBRATE", direction: "left" },
];

export default function MotionTypographySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

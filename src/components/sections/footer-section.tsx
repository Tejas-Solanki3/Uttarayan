"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KiteIcon } from '../icons/kite-icon';

gsap.registerPlugin(ScrollTrigger);

type KiteStyle = {
  left: string;
  bottom: string;
  width: string;
  height: string;
  opacity: number;
  transform: string;
  color: string;
};

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [kiteStyles, setKiteStyles] = useState<KiteStyle[]>([]);

  useEffect(() => {
    const styles = Array.from({ length: 15 }, () => ({
      left: `${gsap.utils.random(5, 95)}%`,
      bottom: `${gsap.utils.random(-20, 20)}%`,
      width: `${gsap.utils.random(20, 80)}px`,
      height: `${gsap.utils.random(20, 80)}px`,
      opacity: gsap.utils.random(0.2, 0.6),
      transform: `rotate(${gsap.utils.random(-30, 30)}deg)`,
      color: `hsl(${gsap.utils.random(20, 60)}, 100%, 50%)`,
    }));
    setKiteStyles(styles);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || kiteStyles.length === 0) return;

    const ctx = gsap.context(() => {
      const kites = gsap.utils.toArray<SVGElement>('.footer-kite');
      if (kites.length === 0) return;
      
      // Animate background gradient
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        backgroundPosition: '50% 100%',
        ease: 'none',
      });
      
      // Animate kites
      kites.forEach(kite => {
        gsap.to(kite, {
          y: '-=500',
          opacity: 0,
          scale: gsap.utils.random(0.5, 1.2),
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })
      });

    }, section);
    return () => ctx.revert();
  }, [kiteStyles]);

  return (
    <footer 
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col justify-center items-center text-center p-8 overflow-hidden bg-gradient-to-t from-yellow-200/80 via-orange-300/80 to-background"
      style={{ backgroundSize: '100% 200%' }}
    >
      <div className="z-10 relative">
        <h2 className="text-5xl md:text-8xl font-black font-headline text-primary mb-4"
          style={{ textShadow: '0 0 15px hsl(var(--primary) / 0.5)' }}
        >
          Happy Makar Sankranti
        </h2>
        <p className="text-lg md:text-2xl text-foreground/80 max-w-2xl mx-auto">
          May the rising sun of Makar Sankranti fill your life with bright and happy moments.
        </p>
      </div>

      {/* Floating Kites */}
      {kiteStyles.map((style, i) => (
        <KiteIcon
          key={i}
          className="footer-kite absolute text-primary/50"
          style={style as React.CSSProperties}
        />
      ))}
    </footer>
  );
}

"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KiteIcon } from '../icons/kite-icon';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type KiteStyle = {
  '--depth': number;
  '--rotation': number;
  top: string;
  left: string;
  width: string;
  height: string;
  transform: string;
  opacity: number;
  color: string;
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [kiteStyles, setKiteStyles] = useState<KiteStyle[]>([]);

  useEffect(() => {
    const styles = Array.from({ length: 120 }, () => {
      const depth = gsap.utils.random(0.1, 1);
      return {
        '--depth': depth,
        '--rotation': gsap.utils.random(-45, 45),
        top: `${gsap.utils.random(5, 95)}%`,
        left: `${gsap.utils.random(5, 95)}%`,
        width: `${gsap.utils.random(20, 80) * (1.2 - depth)}px`,
        height: `${gsap.utils.random(20, 80) * (1.2 - depth)}px`,
        transform: `rotate(${gsap.utils.random(-45, 45)}deg) scale(${1.2 - depth})`,
        opacity: gsap.utils.mapRange(0.1, 1, 0.1, 0.7, depth),
        color: `hsl(${gsap.utils.random(20, 60)}, 90%, 60%)`,
      };
    });
    setKiteStyles(styles);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || kiteStyles.length === 0) return;

    const tl = gsap.timeline();
    
    const ctx = gsap.context(() => {
      const kites = gsap.utils.toArray('.parallax-kite');
      if (kites.length === 0) return;

      // Entrance Animation
      tl.from('.hero-title-char', {
        yPercent: 100,
        stagger: 0.05,
        duration: 1,
        ease: 'power4.out',
      })
      .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5')
      .from(kites, {
        opacity: 0,
        scale: 0.5,
        y: 100,
        stagger: 0.03,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1.2');

      // Parallax Scroll Animation for Kites
      kites.forEach(kite => {
        const depth = gsap.getProperty(kite, '--depth') as number;
        const rotation = gsap.getProperty(kite, '--rotation') as number;
        gsap.to(kite, {
          y: -400 * depth,
          x: 200 * depth * (Math.random() > 0.5 ? 1 : -1),
          rotate: rotation + gsap.utils.random(-20, 20),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
      
      // Animate scroll down indicator
      gsap.to('.scroll-indicator', {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 1
      })

    }, section);

    return () => ctx.revert();
  }, [kiteStyles]);

  const titleText = "UTTARAYAN";

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-center p-4 overflow-hidden bg-background"
    >
      {/* Parallax Kites */}
      {kiteStyles.map((style, i) => (
          <KiteIcon
            key={i}
            className="parallax-kite absolute"
            style={style as React.CSSProperties}
          />
        )
      )}

      {/* Hero Text Content */}
      <div className="relative z-10">
        <h1 className="hero-title font-black text-6xl md:text-9xl lg:text-[10rem] text-foreground tracking-tighter font-headline" aria-label={titleText}>
          {titleText.split("").map((char, index) => (
            <span key={index} className="inline-block overflow-hidden">
              <span className="hero-title-char inline-block">{char}</span>
            </span>
          ))}
        </h1>
        <p className="hero-subtitle text-lg md:text-2xl text-foreground/80 mt-4 max-w-2xl mx-auto">
          An immersive digital celebration of the sun's journey and the festival of kites.
        </p>
      </div>

      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/70">
        <span className="text-sm tracking-widest">Scroll</span>
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}

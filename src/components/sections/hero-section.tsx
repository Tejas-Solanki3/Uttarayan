"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KiteIcon } from '../icons/kite-icon';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline();
    const kites = gsap.utils.toArray('.parallax-kite');

    const ctx = gsap.context(() => {
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
        stagger: 0.05,
        duration: 1,
        ease: 'power3.out',
      }, '-=1.2');

      // Parallax Scroll Animation for Kites
      kites.forEach(kite => {
        const depth = gsap.getProperty(kite, '--depth') as number;
        gsap.to(kite, {
          y: -200 * depth,
          x: 100 * depth * (Math.random() > 0.5 ? 1 : -1),
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
  }, []);

  const titleText = "UTTARAYAN";

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-center p-4 overflow-hidden bg-gradient-to-b from-sky-200 via-blue-100 to-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-800/[0.05] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      
      {/* Parallax Kites */}
      {[...Array(20)].map((_, i) => (
        <KiteIcon
          key={i}
          className="parallax-kite absolute text-primary/70"
          style={{
            ['--depth' as string]: gsap.utils.random(0.2, 1),
            top: `${gsap.utils.random(10, 80)}%`,
            left: `${gsap.utils.random(5, 95)}%`,
            width: `${gsap.utils.random(30, 100)}px`,
            height: `${gsap.utils.random(30, 100)}px`,
            transform: `rotate(${gsap.utils.random(-45, 45)}deg)`,
            opacity: gsap.utils.random(0.3, 0.8),
            color: `hsl(${gsap.utils.random(20, 60)}, 100%, 50%)`
          }}
        />
      ))}

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

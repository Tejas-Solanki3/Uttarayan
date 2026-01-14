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
      .from('.hero-sun', {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      }, 0)
      .from(kites, {
        opacity: 0,
        scale: 0.5,
        y: 100,
        stagger: 0.1,
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
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-center p-4 overflow-hidden bg-gradient-to-b from-sky-900 via-blue-900 to-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-800/[0.2] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>

      {/* Floating Sun */}
      <div className="hero-sun absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
          <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div 
            className="absolute inset-5 bg-primary rounded-full"
            style={{boxShadow: '0 0 80px 20px hsl(var(--primary)), inset 0 0 40px hsl(var(--primary-foreground)/.5)'}}
          ></div>
        </div>
      </div>
      
      {/* Parallax Kites */}
      {[...Array(7)].map((_, i) => (
        <KiteIcon
          key={i}
          className="parallax-kite absolute text-white/70"
          style={{
            ['--depth' as string]: gsap.utils.random(0.2, 1),
            top: `${gsap.utils.random(10, 80)}%`,
            left: `${gsap.utils.random(5, 95)}%`,
            width: `${gsap.utils.random(30, 80)}px`,
            height: `${gsap.utils.random(30, 80)}px`,
            transform: `rotate(${gsap.utils.random(-45, 45)}deg)`,
          }}
        />
      ))}

      {/* Hero Text Content */}
      <div className="relative z-10">
        <h1 className="hero-title font-black text-6xl md:text-9xl lg:text-[10rem] text-white tracking-tighter font-headline" aria-label={titleText}>
          {titleText.split("").map((char, index) => (
            <span key={index} className="inline-block overflow-hidden">
              <span className="hero-title-char inline-block">{char}</span>
            </span>
          ))}
        </h1>
        <p className="hero-subtitle text-lg md:text-2xl text-white/80 mt-4 max-w-2xl mx-auto">
          An immersive digital celebration of the sun's journey and the festival of kites.
        </p>
      </div>

      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
        <span className="text-sm tracking-widest">Scroll</span>
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}

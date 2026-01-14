"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/sections/hero-section';
import SolarTransitionSection from '@/components/sections/solar-transition-section';
import FestivalsSection from '@/components/sections/festivals-section';
import TimelineSection from '@/components/sections/timeline-section';
import GallerySection from '@/components/sections/gallery-section';
import MotionTypographySection from '@/components/sections/motion-typography-section';
import FooterSection from '@/components/sections/footer-section';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // All animations are self-contained in their respective section components.
      // This context ensures proper cleanup of GSAP animations.
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-background relative w-full overflow-x-hidden">
      <HeroSection />
      <SolarTransitionSection />
      <FestivalsSection />
      <TimelineSection />
      <GallerySection />
      <MotionTypographySection />
      <FooterSection />
    </main>
  );
}

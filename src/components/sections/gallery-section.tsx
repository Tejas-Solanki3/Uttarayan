"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '../ui/card';

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const images = gsap.utils.toArray<HTMLDivElement>('.gallery-image');

    const ctx = gsap.context(() => {
      images.forEach((image) => {
        gsap.fromTo(image, 
          { autoAlpha: 0, scale: 0.8, y: 100 }, 
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        // Parallax effect
        gsap.to(image.querySelector('img'), {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-headline text-foreground">Moments of Joy</h2>
          <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
            A glimpse into the vibrant celebrations that light up the nation.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {galleryImages.map((image, index) => {
            const width = parseInt(image.imageUrl.split('/')[5]);
            const height = parseInt(image.imageUrl.split('/')[6]);
            const isTall = height > width;
            const colSpan = (index % 5 === 1 || index % 5 === 3) ? 'md:col-span-2' : 'col-span-1';
            const rowSpan = isTall ? 'row-span-2' : 'row-span-1';

            return (
              <div key={image.id} className={`gallery-image ${isTall ? 'row-span-2' : ''}`}>
                <Card className="group overflow-hidden rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-500 w-full h-full">
                  <div className="relative overflow-hidden w-full h-full" style={{minHeight: '250px'}}>
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    data-ai-hint={image.imageHint}
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

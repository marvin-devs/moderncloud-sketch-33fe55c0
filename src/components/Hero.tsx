
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simple parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const bgElement = containerRef.current.querySelector('.bg-gradient') as HTMLElement;
        const titleElement = containerRef.current.querySelector('.hero-title') as HTMLElement;
        
        if (bgElement) {
          bgElement.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        if (titleElement) {
          titleElement.style.transform = `translateY(${scrollY * 0.05}px)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      id="hero"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient z-0 opacity-20" style={{ 
        background: 'radial-gradient(circle at 20% 20%, hsl(var(--primary)), transparent 60%)'
      }}></div>
      
      <div className="absolute top-1/2 -translate-y-1/2 left-1/4 w-64 h-64 rounded-full bg-accent/30 blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/3 -translate-y-1/2 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container px-4 sm:px-6 relative z-10 max-w-6xl mx-auto text-center">
        <div className="space-y-2 mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs tracking-wider mb-4">
            Refined Simplicity
          </div>
          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tight mb-6">
            Elevate Your <span className="font-normal text-primary">Experience</span>
            <br />
            <span className="font-normal">With Minimalist Design</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Discover the perfect balance of form and function with our meticulously crafted products designed for modern life.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#features" 
            className="px-8 py-3 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 inline-flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 rounded-md border border-border hover:bg-accent transition-all duration-200 w-full sm:w-auto text-center"
          >
            Contact Us
          </a>
        </div>
        
        <div className="mt-24 md:mt-32 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="glass-panel rounded-xl p-6 md:p-8 max-w-4xl mx-auto hover-scale">
            <div className="aspect-video rounded-lg bg-accent/50 flex items-center justify-center">
              <span className="text-accent-foreground/70">Product Preview</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
        <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
        <div className="w-5 h-9 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full mt-2 animate-[bounce_1.5s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

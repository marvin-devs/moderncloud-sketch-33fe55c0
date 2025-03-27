
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      text: "The attention to detail and minimalist approach perfectly balances aesthetics and functionality. It's transformed how I work.",
      author: "Alexandra Chen",
      role: "Creative Director"
    },
    {
      text: "I've never experienced a product with such thoughtful design. Every interaction feels intentional and considered.",
      author: "Michael Rivera",
      role: "Product Designer"
    },
    {
      text: "The simplicity of the design belies the sophistication of what it can do. It's become an essential part of my daily workflow.",
      author: "Sarah Johnson",
      role: "UX Architect"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          testimonialsRef.current?.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }
    
    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="py-24 md:py-32 bg-accent/30" id="testimonials">
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs tracking-wider mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
            What Our <span className="text-primary font-normal">Clients</span> Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            The experiences of those who have embraced our design philosophy.
          </p>
        </div>
        
        <div 
          ref={testimonialsRef}
          className="max-w-4xl mx-auto opacity-0"
        >
          <div className="glass-panel rounded-xl p-8 md:p-12 relative">
            <div className="absolute top-8 left-8">
              <Quote className="w-12 h-12 text-accent-foreground/20" />
            </div>
            
            <div className="pt-12">
              <p className="text-xl md:text-2xl font-light mb-8 transition-all duration-500">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{testimonials[currentIndex].author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/50 transition-all duration-200"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/50 transition-all duration-200"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

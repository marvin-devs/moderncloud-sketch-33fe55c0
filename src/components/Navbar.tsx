
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-sm" : "py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-xl font-light tracking-tight animate-fade-in">Essence</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Products', 'Features', 'Testimonials', 'Contact'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 btn-link"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm transition-all duration-200 hover:opacity-90">
            Get Started
          </a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? 
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden transition-all duration-300 flex flex-col pt-24 px-6",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col gap-6">
          {['Products', 'Features', 'Testimonials', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-lg py-2 border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="mt-6 px-5 py-3 rounded-md bg-primary text-primary-foreground text-center transition-all duration-200 hover:opacity-90"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

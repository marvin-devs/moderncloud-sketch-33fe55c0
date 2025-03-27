
import React from 'react';
import { Instagram, Twitter, LinkedIn, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="mb-4">
              <a href="#" className="text-xl font-light tracking-tight">Essence</a>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Elevating everyday experiences through refined, minimalist design that seamlessly integrates form and function.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/50 transition-all duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/50 transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/50 transition-all duration-200">
                <LinkedIn className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent/50 transition-all duration-200">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Products</h4>
            <ul className="space-y-3">
              {['Overview', 'Features', 'Solutions', 'Pricing'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground btn-link text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Blog', 'Legal'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground btn-link text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Essence. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground btn-link">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground btn-link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React, { useEffect, useRef } from 'react';
import { Layers, Zap, Palette, Users } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
  return (
    <div 
      className="glass-panel rounded-xl p-6 hover-scale"
      style={{ animationDelay: `${index * 100 + 300}ms` }}
    >
      <div className="w-12 h-12 rounded-md bg-accent flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-normal mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  // Add scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const childElements = featuresRef.current?.querySelectorAll('.feature-item');
    childElements?.forEach(el => observer.observe(el));

    return () => {
      childElements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      title: "Elegant Design",
      description: "Clean aesthetics with careful attention to spacing, typography, and visual hierarchy.",
      icon: <Palette className="text-accent-foreground" />
    },
    {
      title: "Effortless Performance",
      description: "Enjoy swift, responsive interactions with optimized performance.",
      icon: <Zap className="text-accent-foreground" />
    },
    {
      title: "Intuitive Interface",
      description: "User-centered design principles make navigation feel natural and effortless.",
      icon: <Layers className="text-accent-foreground" />
    },
    {
      title: "Thoughtful Experience",
      description: "Every interaction has been considered to create a cohesive, delightful experience.",
      icon: <Users className="text-accent-foreground" />
    }
  ];

  return (
    <section className="py-24 md:py-32" id="features">
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs tracking-wider mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
            Designed for <span className="text-primary font-normal">Perfection</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Our thoughtfully crafted features bring together form and function in perfect harmony.
          </p>
        </div>

        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <div key={index} className="feature-item opacity-0">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            </div>
          ))}
        </div>

        <div className="mt-24 opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="glass-panel rounded-xl p-8 md:p-12 hover-scale">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs tracking-wider mb-4">
                  Premium Quality
                </div>
                <h3 className="text-2xl md:text-3xl font-light mb-4">
                  Meticulous attention to <span className="text-primary font-normal">detail</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  Every aspect of our product has been carefully considered and refined to deliver an exceptional experience that delights at every interaction.
                </p>
                <ul className="space-y-3">
                  {['Premium materials', 'Thoughtful design', 'Sustainable approach', 'Timeless aesthetic'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-square rounded-lg bg-accent/30 flex items-center justify-center">
                <span className="text-accent-foreground/70">Product Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

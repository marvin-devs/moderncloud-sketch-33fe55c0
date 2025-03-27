
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you as soon as possible.',
      });
    }, 1500);
  };
  
  return (
    <section className="py-24 md:py-32" id="contact">
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs tracking-wider mb-4">
            Contact
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
            Get In <span className="text-primary font-normal">Touch</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Have questions or ready to start your journey with us? Reach out and let's discuss how we can help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass-panel rounded-xl p-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-first lg:order-last animate-fade-in" style={{ animationDelay: '600ms' }}>
            <h3 className="text-2xl font-light mb-6">We'd love to hear from you</h3>
            <p className="mb-8 text-muted-foreground">
              Whether you have a question about our products, services, or just want to say hello, we're here to help.
            </p>
            
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-xl hover-scale">
                <h4 className="font-medium mb-2">Visit our studio</h4>
                <p className="text-sm text-muted-foreground">
                  123 Design Avenue<br />
                  San Francisco, CA 94107
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl hover-scale">
                <h4 className="font-medium mb-2">Email us</h4>
                <a href="mailto:hello@example.com" className="text-sm text-primary hover:underline">
                  hello@example.com
                </a>
              </div>
              
              <div className="glass-panel p-6 rounded-xl hover-scale">
                <h4 className="font-medium mb-2">Call us</h4>
                <a href="tel:+11234567890" className="text-sm text-primary hover:underline">
                  +1 (123) 456-7890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

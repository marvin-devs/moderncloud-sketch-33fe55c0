
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md glass-panel rounded-xl p-8 md:p-12 animate-fade-in">
        <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs tracking-wider mb-6">
          404 Error
        </div>
        <h1 className="text-4xl md:text-5xl font-light mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Team', path: '/team' },
  { name: 'Events', path: '/events' },
  { name: 'Register', path: '/register' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Terminal className="w-8 h-8 text-primary group-hover:text-terminal-cyan transition-colors" />
            <span className="text-xl font-display font-bold text-primary group-hover:text-terminal-cyan transition-colors">
              ARTEMIZ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "relative font-mono text-sm uppercase tracking-wider transition-colors hover:text-primary",
                  isActive(item.path) 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary glow-text"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-primary/30 bg-card/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 font-mono text-sm uppercase tracking-wider transition-colors",
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  $ {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
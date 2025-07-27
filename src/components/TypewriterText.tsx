import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  prefix?: string;
}

export const TypewriterText = ({ 
  text, 
  speed = 50, 
  className, 
  onComplete,
  prefix = "$ "
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={cn("font-mono", className)}>
      <span className="text-terminal-green">{prefix}</span>
      {displayText}
      <span className="animate-blink-caret">|</span>
    </span>
  );
};
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TerminalBoxProps {
  children: ReactNode;
  className?: string;
  title?: string;
  showHeader?: boolean;
}

export const TerminalBox = ({ children, className, title, showHeader = true }: TerminalBoxProps) => {
  return (
    <div className={cn("terminal-box", className)}>
      {showHeader && (
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
          </div>
          {title && (
            <span className="text-sm text-muted-foreground font-mono">
              {title}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
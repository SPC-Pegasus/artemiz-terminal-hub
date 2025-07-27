import { useState, useEffect } from 'react';
import { TerminalBox } from './TerminalBox';
import { TypewriterText } from './TypewriterText';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [step, setStep] = useState(0);
  const [dots, setDots] = useState('');

  const loadingSteps = [
    "Initializing ARTEMIZ system...",
    "Loading terminal interface...",
    "Connecting to code repository...",
    "Establishing secure connection...",
    "Ready to hack the future!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step < loadingSteps.length - 1) {
      const timeout = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(onComplete, 2000);
      return () => clearTimeout(timeout);
    }
  }, [step, loadingSteps.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <TerminalBox className="w-full max-w-2xl mx-4">
        <div className="space-y-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-primary glow-text mb-2">
              ARTEMIZ
            </h1>
            <p className="text-terminal-cyan font-mono">
              Department of Computer Science
            </p>
          </div>
          
          <div className="space-y-2">
            {loadingSteps.slice(0, step + 1).map((stepText, index) => (
              <div key={index} className="font-mono text-sm">
                {index === step ? (
                  <TypewriterText
                    text={stepText}
                    speed={30}
                    className="text-terminal-green"
                  />
                ) : (
                  <span className="text-muted-foreground">
                    $ {stepText}
                  </span>
                )}
              </div>
            ))}
          </div>

          {step === loadingSteps.length - 1 && (
            <div className="text-center mt-8">
              <div className="inline-flex items-center space-x-2">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <span className="text-terminal-green font-mono">
                  Loading complete{dots}
                </span>
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </TerminalBox>
    </div>
  );
};
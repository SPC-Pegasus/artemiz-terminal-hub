import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MatrixBackground } from '@/components/MatrixBackground';

const TerminalEntry = () => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on component mount
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.toLowerCase().trim() === 'open') {
      setIsProcessing(true);
      setShowError(false);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setShowError(true);
      setInput('');
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const bootMessages = [
    'ARTEMIZ Terminal v2.1.0',
    'Department of Computer Science',
    'University Coding Club System',
    '',
    'Initializing connection...',
    'Establishing secure link...',
    'Authentication required.',
    '',
    'Welcome to ARTEMIZ Portal',
    'Type "open" to enter the system',
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <MatrixBackground />
      
      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black border-2 border-primary/30 rounded-lg p-8 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,20,0,0.9) 100%)',
            boxShadow: '0 0 50px rgba(0, 255, 0, 0.2)'
          }}
        >
          {/* Terminal Header */}
          <div className="flex items-center mb-6">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-terminal-green font-mono text-sm">
              artemiz@university:~$
            </div>
          </div>

          {/* Boot Messages */}
          <div className="mb-8 space-y-1">
            {bootMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`font-mono text-sm ${
                  message.includes('ARTEMIZ') || message.includes('v2.1.0')
                    ? 'text-terminal-cyan font-bold text-lg'
                    : message.includes('Department') || message.includes('University')
                    ? 'text-terminal-yellow'
                    : message.includes('Welcome') || message.includes('Type')
                    ? 'text-primary'
                    : 'text-terminal-green'
                }`}
              >
                {message || '\u00A0'}
              </motion.div>
            ))}
          </div>

          {/* Command Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-terminal-green font-mono mr-2">
              guest@artemiz:~$
            </span>
            <form onSubmit={handleSubmit} className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none text-terminal-green font-mono flex-1 w-full"
                placeholder="Type command..."
                disabled={isProcessing}
              />
            </form>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-terminal-green font-mono ml-1"
            >
              █
            </motion.span>
          </motion.div>

          {/* Error Message */}
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-terminal-red font-mono text-sm"
            >
              bash: {input}: command not found
              <br />
              Try typing "open" to access the ARTEMIZ system
            </motion.div>
          )}

          {/* Processing */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-1"
            >
              <div className="text-terminal-green font-mono text-sm">
                Processing command: open
              </div>
              <div className="text-terminal-yellow font-mono text-sm">
                Accessing ARTEMIZ portal...
              </div>
              <div className="text-terminal-cyan font-mono text-sm">
                Redirecting to main interface...
              </div>
            </motion.div>
          )}

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="mt-8 pt-4 border-t border-primary/20"
          >
            <div className="text-muted-foreground font-mono text-xs space-y-1">
              <div>Available commands:</div>
              <div className="text-terminal-green">• open - Access ARTEMIZ coding club portal</div>
              <div className="text-terminal-yellow">• Hint: The command is case-insensitive</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TerminalEntry;
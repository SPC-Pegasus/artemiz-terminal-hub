import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Calendar, Trophy, ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TerminalBox } from '@/components/TerminalBox';
import { TypewriterText } from '@/components/TypewriterText';
import { MatrixBackground } from '@/components/MatrixBackground';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowHero(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  const features = [
    {
      icon: Code,
      title: "Cutting-Edge Programming",
      description: "Learn modern technologies, frameworks, and best practices in software development."
    },
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Work on exciting projects with fellow developers and build lasting connections."
    },
    {
      icon: Calendar,
      title: "Regular Events",
      description: "Hackathons, coding competitions, workshops, and tech talks throughout the year."
    },
    {
      icon: Trophy,
      title: "Achievement Recognition",
      description: "Showcase your skills, earn certificates, and build an impressive portfolio."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MatrixBackground />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold text-primary glow-text mb-6">
              ARTEMIZ
            </h1>
            <p className="text-xl md:text-2xl text-terminal-cyan font-mono mb-4">
              Department of Computer Science
            </p>
            <p className="text-lg text-muted-foreground font-mono mb-8 max-w-2xl mx-auto">
              Where Code Meets Creativity
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showHero ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <TerminalBox title="hero_terminal.exe" className="mb-8">
              <div className="space-y-2">
                <TypewriterText
                  text="Welcome to ARTEMIZ - where future developers unite!"
                  speed={50}
                  className="text-terminal-green block"
                />
                <div className="mt-4 font-mono text-sm text-muted-foreground">
                  <p>$ Initializing coding journey...</p>
                  <p>$ Loading opportunities...</p>
                  <p className="text-terminal-yellow">$ Ready to transform your passion into expertise!</p>
                </div>
              </div>
            </TerminalBox>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="terminal" size="lg" className="w-full sm:w-auto">
                  <Terminal className="mr-2 w-5 h-5" />
                  JOIN ARTEMIZ
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="terminal-secondary" size="lg" className="w-full sm:w-auto">
                  EXPLORE EVENTS
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-primary mb-4">
              Why Join ARTEMIZ?
            </h2>
            <p className="text-lg text-muted-foreground font-mono">
              $ cat benefits.txt
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TerminalBox className="h-full hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-4 font-mono">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </TerminalBox>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TerminalBox className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-display font-bold text-primary mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg text-muted-foreground font-mono mb-8">
                Join ARTEMIZ today and become part of our thriving developer community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="terminal" size="lg" className="w-full sm:w-auto animate-pulse-glow">
                    REGISTER NOW
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </TerminalBox>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

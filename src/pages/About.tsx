import { motion } from 'framer-motion';
import { Code, Target, Heart, Zap } from 'lucide-react';
import { TerminalBox } from '@/components/TerminalBox';
import { TypewriterText } from '@/components/TypewriterText';
import { MatrixBackground } from '@/components/MatrixBackground';

const About = () => {
  const values = [
    {
      icon: Code,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and push the boundaries of what's possible in software development."
    },
    {
      icon: Heart,
      title: "Collaboration",
      description: "We believe in the power of teamwork and creating an inclusive environment where everyone can thrive."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for quality in everything we do, from code architecture to community building."
    },
    {
      icon: Zap,
      title: "Growth",
      description: "We're committed to continuous learning and helping our members evolve as developers and leaders."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <MatrixBackground />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-primary glow-text mb-6">
              About ARTEMIZ
            </h1>
            <div className="max-w-4xl mx-auto mt-10">
              <TerminalBox title="about.sh">
                <TypewriterText
                  text="Discovering the story behind our coding community..."
                  speed={40}
                  className="text-terminal-green"
                />
              </TerminalBox>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-1 ">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <TerminalBox title="mission.txt" className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h2 className="text-1xl font-display font-bold text-primary mb-4">
                    $ cat mission_statement.txt
                  </h2>
                  <p className="text-muted-foreground font-mono leading-relaxed">
                    ARTEMIZ is the premier coding club of the Department of Computer Science, 
                    dedicated to fostering a vibrant community of passionate developers. Our 
                    mission is to bridge the gap between academic learning and industry practices, 
                    providing students with practical experience, mentorship, and opportunities 
                    to collaborate on cutting-edge projects.
                  </p>
                </div>
                
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-terminal-cyan font-mono">
                    {'>'} &quot;Where theoretical knowledge meets practical application, 
                    and where individual talent becomes collective innovation.&quot;
                  </p>
                </div>
              </div>
            </TerminalBox>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground font-mono">
              $ grep -r "values" core_principles/
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TerminalBox className="h-full">
                  <div className="flex items-start space-x-4">
                    <value.icon className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-3 font-mono">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </TerminalBox>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TerminalBox title="activities.log" className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">
                  $ tail -f activities.log
                </h2>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-green">{'>'}</span>
                    <span className="text-muted-foreground">Weekly coding workshops and tutorials</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-green">{'>'}</span>
                    <span className="text-muted-foreground">Monthly hackathons and coding competitions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-green">{'>'}</span>
                    <span className="text-muted-foreground">Guest lectures from industry professionals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-green">{'>'}</span>
                    <span className="text-muted-foreground">Open source project collaborations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-green">{'>'}</span>
                    <span className="text-muted-foreground">Technical interview preparation sessions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-green">{'>'}</span>
                    <span className="text-muted-foreground">Career guidance and mentorship programs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-terminal-green">{'>'}</span>
                    <span className="text-muted-foreground">Networking events with tech companies</span>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-terminal-cyan/30 rounded bg-terminal-cyan/5">
                  <p className="text-terminal-cyan font-mono text-sm">
                    [INFO] All activities are designed to enhance both technical skills 
                    and professional development, preparing members for successful careers 
                    in the tech industry.
                  </p>
                </div>
              </div>
            </TerminalBox>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
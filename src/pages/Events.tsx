import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ExternalLink, Trophy, Code, Zap } from 'lucide-react';
import { TerminalBox } from '@/components/TerminalBox';
import { MatrixBackground } from '@/components/MatrixBackground';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  type: 'workshop' | 'hackathon' | 'competition' | 'talk' | 'networking';
  date: string;
  time: string;
  location: string;
  description: string;
  maxParticipants?: number;
  currentParticipants?: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationLink?: string;
  requirements?: string[];
  prizes?: string[];
}

const Events = () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Web Development Bootcamp',
      type: 'workshop',
      date: '2024-02-15',
      time: '10:00 AM - 4:00 PM',
      location: 'CS Lab 1',
      description: 'Intensive full-day workshop covering React, Node.js, and modern web development practices. Perfect for beginners and intermediate developers.',
      maxParticipants: 30,
      currentParticipants: 22,
      status: 'upcoming',
      registrationLink: 'https://forms.google.com/webdev-bootcamp',
      requirements: ['Laptop', 'Basic programming knowledge', 'Node.js installed'],
    },
    {
      id: '2',
      title: 'ARTEMIZ Hackathon 2024',
      type: 'hackathon',
      date: '2024-02-20',
      time: '9:00 AM - 9:00 PM',
      location: 'Main Auditorium',
      description: '12-hour hackathon focused on building innovative solutions for real-world problems. Teams of 2-4 members will compete for exciting prizes.',
      maxParticipants: 100,
      currentParticipants: 78,
      status: 'upcoming',
      registrationLink: 'https://forms.google.com/hackathon-2024',
      requirements: ['Team of 2-4 members', 'Laptop', 'Creative mindset'],
      prizes: ['₹50,000 First Prize', '₹30,000 Second Prize', '₹20,000 Third Prize', 'Special Category Awards'],
    },
    {
      id: '3',
      title: 'AI/ML Workshop Series',
      type: 'workshop',
      date: '2024-02-25',
      time: '2:00 PM - 5:00 PM',
      location: 'CS Lab 2',
      description: 'Explore machine learning fundamentals with hands-on projects using Python and TensorFlow. Build your first AI model!',
      maxParticipants: 25,
      currentParticipants: 18,
      status: 'upcoming',
      registrationLink: 'https://forms.google.com/ai-ml-workshop',
      requirements: ['Python knowledge', 'Jupyter Notebook', 'Google Colab account'],
    },
    {
      id: '4',
      title: 'Industry Expert Talk: Career in Tech',
      type: 'talk',
      date: '2024-03-01',
      time: '11:00 AM - 12:30 PM',
      location: 'Seminar Hall',
      description: 'Senior software engineers from top tech companies share insights about career paths, interview preparation, and industry trends.',
      maxParticipants: 150,
      currentParticipants: 95,
      status: 'upcoming',
      registrationLink: 'https://forms.google.com/career-talk',
    },
    {
      id: '5',
      title: 'Code Golf Championship',
      type: 'competition',
      date: '2024-01-15',
      time: '3:00 PM - 6:00 PM',
      location: 'CS Lab 3',
      description: 'Programming competition where participants solve algorithmic challenges with the shortest code possible. Test your problem-solving skills!',
      status: 'completed',
      prizes: ['₹10,000 Winner', '₹5,000 Runner-up', 'Certificates for top 10'],
    },
    {
      id: '6',
      title: 'Open Source Contribution Workshop',
      type: 'workshop',
      date: '2024-01-08',
      time: '1:00 PM - 4:00 PM',
      location: 'CS Lab 1',
      description: 'Learn how to contribute to open source projects, understand Git workflows, and make your first contribution to a real project.',
      status: 'completed',
    },
  ];

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'completed');

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'workshop': return Code;
      case 'hackathon': return Zap;
      case 'competition': return Trophy;
      case 'talk': return Users;
      case 'networking': return Users;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'workshop': return 'bg-terminal-cyan/20 text-terminal-cyan border-terminal-cyan/30';
      case 'hackathon': return 'bg-terminal-yellow/20 text-terminal-yellow border-terminal-yellow/30';
      case 'competition': return 'bg-terminal-red/20 text-terminal-red border-terminal-red/30';
      case 'talk': return 'bg-primary/20 text-primary border-primary/30';
      case 'networking': return 'bg-terminal-orange/20 text-terminal-orange border-terminal-orange/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const EventCard = ({ event, index }: { event: Event; index: number }) => {
    const IconComponent = getEventIcon(event.type);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <TerminalBox className="h-full hover:scale-105 transition-all duration-300">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <IconComponent className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-primary font-mono">
                    {event.title}
                  </h3>
                  <Badge className={`mt-1 ${getTypeColor(event.type)} font-mono text-xs`}>
                    {event.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              {event.maxParticipants && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>
                    {event.currentParticipants || 0}/{event.maxParticipants} participants
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground font-mono text-sm leading-relaxed">
              {event.description}
            </p>

            {/* Requirements */}
            {event.requirements && (
              <div>
                <h4 className="text-sm font-bold text-primary mb-2 font-mono">
                  Requirements:
                </h4>
                <ul className="text-xs font-mono text-muted-foreground space-y-1">
                  {event.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-terminal-green">{'>'}</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prizes */}
            {event.prizes && (
              <div>
                <h4 className="text-sm font-bold text-primary mb-2 font-mono">
                  Prizes:
                </h4>
                <ul className="text-xs font-mono text-muted-foreground space-y-1">
                  {event.prizes.map((prize, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-terminal-yellow">★</span>
                      <span>{prize}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Button */}
            {event.status === 'upcoming' && event.registrationLink && (
              <div className="pt-2">
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="terminal" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Register Now
                  </Button>
                </a>
              </div>
            )}
          </div>
        </TerminalBox>
      </motion.div>
    );
  };

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
              Events
            </h1>
            <div className="max-w-4xl mx-auto">
              <TerminalBox title="events_calendar.sh">
                <p className="text-terminal-green font-mono">
                  $ find ./events -name "*.json" -exec cat {} \; | grep -E "(upcoming|workshop|hackathon)"
                </p>
                <p className="text-muted-foreground font-mono mt-2">
                  Discover workshops, hackathons, and tech talks designed to level up your skills
                </p>
              </TerminalBox>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground font-mono">
              $ crontab -l | grep "upcoming"
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              Past Events
            </h2>
            <p className="text-muted-foreground font-mono">
              $ tail -f events.log | grep "completed"
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
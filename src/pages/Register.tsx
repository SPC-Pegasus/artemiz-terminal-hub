import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronRight, ChevronLeft, CheckCircle, Terminal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { TerminalBox } from '@/components/TerminalBox';
import { MatrixBackground } from '@/components/MatrixBackground';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  // Step 1: Basic Info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  studentId: z.string().min(1, 'Student ID is required'),
  
  // Step 2: Academic Details
  course: z.string().min(1, 'Please select your course'),
  year: z.string().min(1, 'Please select your year'),
  
  // Step 3: Experience Level
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  programmingLanguages: z.array(z.string()).min(1, 'Select at least one programming language'),
  
  // Step 4: Interests and Motivation
  areasOfInterest: z.array(z.string()).min(1, 'Select at least one area of interest'),
  previousProjects: z.string().optional(),
  motivation: z.string().min(1, 'Please share your motivation'),
  timeCommitment: z.string().min(1, 'Please select your time commitment'),
  
  // Step 5: Additional Info
  hasLaptop: z.boolean(),
  githubProfile: z.string().url().optional().or(z.literal('')),
  linkedinProfile: z.string().url().optional().or(z.literal('')),
  referralSource: z.string().min(1, 'Please tell us how you heard about ARTEMIZ'),
});

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 5;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programmingLanguages: [],
      areasOfInterest: [],
      hasLaptop: false,
    },
  });

  const programmingLanguages = watch('programmingLanguages') || [];
  const areasOfInterest = watch('areasOfInterest') || [];

  const programmingOptions = [
    'JavaScript', 'Python', 'Java', 'C++', 'C', 'React', 'Node.js', 
    'TypeScript', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ];

  const interestOptions = [
    'Web Development', 'Mobile Development', 'Machine Learning', 'Data Science',
    'DevOps', 'Cybersecurity', 'Game Development', 'UI/UX Design',
    'Blockchain', 'IoT', 'Cloud Computing', 'Open Source'
  ];

  const courseOptions = [
    { value: 'bca', label: 'BCA (Bachelor of Computer Applications)' },
    { value: 'bsc', label: 'BSc (Bachelor of Science)' },
    { value: 'bba', label: 'BBA (Bachelor of Business Administration)' },
    { value: 'bcom', label: 'BCom (Bachelor of Commerce)' },
    { value: 'ba', label: 'BA (Bachelor of Arts)' },
    { value: 'ma', label: 'MA (Master of Arts)' },
    { value: 'msc', label: 'MSc (Master of Science)' },
  ];

  const yearOptions = [
    { value: '1', label: 'I' },
    { value: '2', label: 'II' },
    { value: '3', label: 'III' },
  ];

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate as any);
    
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1: return ['name', 'email', 'phone', 'studentId'];
      case 2: return ['course', 'year'];
      case 3: return ['experienceLevel', 'programmingLanguages'];
      case 4: return ['areasOfInterest', 'motivation', 'timeCommitment'];
      case 5: return ['referralSource'];
      default: return [];
    }
  };

  const handleLanguageToggle = (language: string) => {
    const current = programmingLanguages;
    const updated = current.includes(language)
      ? current.filter(l => l !== language)
      : [...current, language];
    setValue('programmingLanguages', updated);
  };

  const handleInterestToggle = (interest: string) => {
    const current = areasOfInterest;
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    setValue('areasOfInterest', updated);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate successful registration
      console.log('Registration data:', {
        ...data,
        timestamp: new Date().toISOString(),
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSuccess(true);
      toast({
        title: "Registration Successful!",
        description: "Welcome to ARTEMIZ! We'll be in touch soon.",
        duration: 5000,
      });
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SuccessScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16"
    >
      <TerminalBox className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="w-20 h-20 text-terminal-green mx-auto" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              🎉 Registration Complete!
            </h2>
            <p className="text-terminal-green font-mono text-lg mb-2">
              $ echo "Welcome to ARTEMIZ!"
            </p>
            <p className="text-muted-foreground font-mono">
              You're now part of our coding community. See you at our next event!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-muted-foreground font-mono"
          >
            <p>Redirecting to homepage in 3 seconds...</p>
          </motion.div>
        </div>
      </TerminalBox>
    </motion.div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <MatrixBackground />
        <div className="container mx-auto px-4">
          <SuccessScreen />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <MatrixBackground />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary glow-text mb-6">
            Join ARTEMIZ
          </h1>
          <TerminalBox title="registration.sh" className="max-w-2xl mx-auto">
            <p className="text-terminal-green font-mono">
              $ ./register_member.sh --step {currentStep}/{totalSteps}
            </p>
            <p className="text-muted-foreground font-mono mt-2">
              Complete the registration process to become part of our coding community
            </p>
          </TerminalBox>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-mono font-bold ${
                  i + 1 <= currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-muted text-muted-foreground'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TerminalBox className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-display font-bold text-primary mb-6">
                      $ whoami
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-mono">Full Name</Label>
                        <Input
                          id="name"
                          {...register('name')}
                          className="font-mono"
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-terminal-red text-sm font-mono">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-mono">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="font-mono"
                          placeholder="your.email@domain.com"
                        />
                        {errors.email && (
                          <p className="text-terminal-red text-sm font-mono">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-mono">Phone Number</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          className="font-mono"
                          placeholder="+91 9876543210"
                        />
                        {errors.phone && (
                          <p className="text-terminal-red text-sm font-mono">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studentId" className="font-mono">Student ID</Label>
                        <Input
                          id="studentId"
                          {...register('studentId')}
                          className="font-mono"
                          placeholder="CS2024001"
                        />
                        {errors.studentId && (
                          <p className="text-terminal-red text-sm font-mono">{errors.studentId.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Academic Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-display font-bold text-primary mb-6">
                      $ cat academic_info.txt
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="course" className="font-mono">Course</Label>
                        <Select onValueChange={(value) => setValue('course', value)}>
                          <SelectTrigger className="font-mono">
                            <SelectValue placeholder="Select your course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courseOptions.map((course) => (
                              <SelectItem key={course.value} value={course.value} className="font-mono">
                                {course.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.course && (
                          <p className="text-terminal-red text-sm font-mono">{errors.course.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year" className="font-mono">Year</Label>
                        <Select onValueChange={(value) => setValue('year', value)}>
                          <SelectTrigger className="font-mono">
                            <SelectValue placeholder="Select your year" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOptions.map((year) => (
                              <SelectItem key={year.value} value={year.value} className="font-mono">
                                Year {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.year && (
                          <p className="text-terminal-red text-sm font-mono">{errors.year.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Experience Level */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-display font-bold text-primary mb-6">
                      $ ls skills/
                    </h3>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label className="font-mono">Experience Level</Label>
                        <RadioGroup
                          onValueChange={(value) => setValue('experienceLevel', value as any)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="beginner" id="beginner" />
                            <Label htmlFor="beginner" className="font-mono">
                              Beginner - Just starting my coding journey
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="intermediate" id="intermediate" />
                            <Label htmlFor="intermediate" className="font-mono">
                              Intermediate - Have some programming experience
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="advanced" id="advanced" />
                            <Label htmlFor="advanced" className="font-mono">
                              Advanced - Confident in multiple programming languages
                            </Label>
                          </div>
                        </RadioGroup>
                        {errors.experienceLevel && (
                          <p className="text-terminal-red text-sm font-mono">{errors.experienceLevel.message}</p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <Label className="font-mono">Programming Languages (Select all that apply)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {programmingOptions.map((language) => (
                            <div key={language} className="flex items-center space-x-2">
                              <Checkbox
                                id={language}
                                checked={programmingLanguages.includes(language)}
                                onCheckedChange={() => handleLanguageToggle(language)}
                              />
                              <Label htmlFor={language} className="font-mono text-sm">
                                {language}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.programmingLanguages && (
                          <p className="text-terminal-red text-sm font-mono">{errors.programmingLanguages.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Interests and Motivation */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-display font-bold text-primary mb-6">
                      $ cat interests.json
                    </h3>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label className="font-mono">Areas of Interest</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {interestOptions.map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                              <Checkbox
                                id={interest}
                                checked={areasOfInterest.includes(interest)}
                                onCheckedChange={() => handleInterestToggle(interest)}
                              />
                              <Label htmlFor={interest} className="font-mono text-sm">
                                {interest}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.areasOfInterest && (
                          <p className="text-terminal-red text-sm font-mono">{errors.areasOfInterest.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="previousProjects" className="font-mono">
                          Previous Projects (Optional)
                        </Label>
                        <Textarea
                          id="previousProjects"
                          {...register('previousProjects')}
                          className="font-mono"
                          placeholder="Tell us about any coding projects you've worked on..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation" className="font-mono">
                          Why do you want to join ARTEMIZ? *
                        </Label>
                        <Textarea
                          id="motivation"
                          {...register('motivation')}
                          className="font-mono"
                          placeholder="Share your motivation for joining our coding community..."
                          rows={4}
                        />
                        {errors.motivation && (
                          <p className="text-terminal-red text-sm font-mono">{errors.motivation.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeCommitment" className="font-mono">Time Commitment</Label>
                        <Select onValueChange={(value) => setValue('timeCommitment', value)}>
                          <SelectTrigger className="font-mono">
                            <SelectValue placeholder="How much time can you commit weekly?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2-4 hours" className="font-mono">2-4 hours per week</SelectItem>
                            <SelectItem value="4-8 hours" className="font-mono">4-8 hours per week</SelectItem>
                            <SelectItem value="8+ hours" className="font-mono">8+ hours per week</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.timeCommitment && (
                          <p className="text-terminal-red text-sm font-mono">{errors.timeCommitment.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Additional Info */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-display font-bold text-primary mb-6">
                      $ cat additional_info.yaml
                    </h3>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label className="font-mono">Do you have a laptop?</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hasLaptop"
                            {...register('hasLaptop')}
                          />
                          <Label htmlFor="hasLaptop" className="font-mono">
                            Yes, I have a laptop for coding
                          </Label>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="githubProfile" className="font-mono">
                            GitHub Profile (Optional)
                          </Label>
                          <Input
                            id="githubProfile"
                            {...register('githubProfile')}
                            className="font-mono"
                            placeholder="https://github.com/username"
                          />
                          {errors.githubProfile && (
                            <p className="text-terminal-red text-sm font-mono">{errors.githubProfile.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="linkedinProfile" className="font-mono">
                            LinkedIn Profile (Optional)
                          </Label>
                          <Input
                            id="linkedinProfile"
                            {...register('linkedinProfile')}
                            className="font-mono"
                            placeholder="https://linkedin.com/in/username"
                          />
                          {errors.linkedinProfile && (
                            <p className="text-terminal-red text-sm font-mono">{errors.linkedinProfile.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="referralSource" className="font-mono">
                          How did you hear about ARTEMIZ?
                        </Label>
                        <Select onValueChange={(value) => setValue('referralSource', value)}>
                          <SelectTrigger className="font-mono">
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="friends" className="font-mono">Friends/Classmates</SelectItem>
                            <SelectItem value="social-media" className="font-mono">Social Media</SelectItem>
                            <SelectItem value="faculty" className="font-mono">Faculty/Professor</SelectItem>
                            <SelectItem value="website" className="font-mono">College Website</SelectItem>
                            <SelectItem value="events" className="font-mono">College Events</SelectItem>
                            <SelectItem value="other" className="font-mono">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.referralSource && (
                          <p className="text-terminal-red text-sm font-mono">{errors.referralSource.message}</p>
                        )}
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-primary/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="font-mono"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    variant="terminal"
                    onClick={nextStep}
                    className="font-mono"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="terminal"
                    disabled={isSubmitting}
                    className="font-mono"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Terminal className="w-4 h-4 mr-2" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                )}
              </div>
            </TerminalBox>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
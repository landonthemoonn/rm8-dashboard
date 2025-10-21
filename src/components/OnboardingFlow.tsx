import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Users,
  Dog,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  X,
  Mail
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface OnboardingData {
  houseName: string;
  roommates: string[];
  dogName?: string;
  calendarEmail?: string;
  theme: 'fun' | 'minimal' | 'colorful';
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    houseName: '',
    roommates: [],
    dogName: '',
    calendarEmail: '',
    theme: 'fun'
  });
  const [currentRoommate, setCurrentRoommate] = useState('');

  const steps = [
    { title: 'Welcome', icon: Home },
    { title: 'Roommates', icon: Users },
    { title: 'Pets', icon: Dog },
    { title: 'Calendar', icon: Calendar },
    { title: 'Ready!', icon: Sparkles }
  ];

  const handleAddRoommate = () => {
    if (currentRoommate.trim() && !data.roommates.includes(currentRoommate.trim())) {
      setData({
        ...data,
        roommates: [...data.roommates, currentRoommate.trim()]
      });
      setCurrentRoommate('');
    }
  };

  const handleRemoveRoommate = (name: string) => {
    setData({
      ...data,
      roommates: data.roommates.filter(r => r !== name)
    });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return data.houseName.trim().length > 0;
      case 1: return data.roommates.length >= 2;
      case 2: return true; // Dog is optional
      case 3: return true; // Calendar is optional
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-pink-500/40 to-transparent"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-purple-500/40 to-transparent"
      />

      {/* Main Content */}
      <Card className="max-w-2xl w-full bg-white/5 backdrop-blur-2xl border-white/20 overflow-hidden relative z-10">
        {/* Progress Bar */}
        <div className="h-2 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: i === step ? 1.2 : i < step ? 1 : 0.8,
                    opacity: i <= step ? 1 : 0.3
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    i < step
                      ? 'bg-green-500'
                      : i === step
                      ? 'bg-gradient-to-br from-pink-500 to-purple-500'
                      : 'bg-white/10'
                  }`}
                >
                  {i < step ? (
                    <Check className="text-white" size={20} />
                  ) : (
                    <s.icon className="text-white" size={20} />
                  )}
                </motion.div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-1 mx-2 ${i < step ? 'bg-green-500' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>
          <motion.h2
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            {steps[step].title}
          </motion.h2>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Welcome */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center"
                    >
                      <Home className="text-white" size={48} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Welcome to Your Roommate Dashboard!</h3>
                    <p className="text-white/70">Let's set up your perfect shared living space in just a few steps.</p>
                  </div>

                  <div>
                    <Label htmlFor="houseName" className="text-white text-lg mb-2 block">
                      What's your house name?
                    </Label>
                    <Input
                      id="houseName"
                      placeholder="e.g., The Pink Palace, RM8, Casa de Roomies"
                      value={data.houseName}
                      onChange={(e) => setData({ ...data, houseName: e.target.value })}
                      className="bg-white/10 border-white/20 text-white text-lg py-6 placeholder:text-white/40"
                      autoFocus
                    />
                    <p className="text-white/50 text-sm mt-2">Give your place a fun name! This will appear on your dashboard.</p>
                  </div>
                </div>
              )}

              {/* Step 1: Roommates */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Who lives here?</h3>
                    <p className="text-white/70 mb-6">Add all your awesome roommates!</p>

                    <div className="flex gap-2 mb-6">
                      <Input
                        placeholder="Roommate name"
                        value={currentRoommate}
                        onChange={(e) => setCurrentRoommate(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddRoommate()}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                      <Button
                        onClick={handleAddRoommate}
                        className="bg-gradient-to-r from-pink-500 to-purple-500"
                      >
                        <Plus size={20} />
                      </Button>
                    </div>

                    {data.roommates.length === 0 ? (
                      <div className="text-center py-8 text-white/50">
                        Add at least 2 roommates to continue
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {data.roommates.map((roommate, i) => (
                          <motion.div
                            key={roommate}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/10 rounded-xl p-4 flex items-center justify-between border border-white/10"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                {roommate[0]}
                              </div>
                              <span className="text-white font-semibold">{roommate}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveRoommate(roommate)}
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <X size={16} />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Dog */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center"
                    >
                      <Dog className="text-white" size={40} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Do you have a furry friend?</h3>
                    <p className="text-white/70">We'll help you track walks and care!</p>
                  </div>

                  <div>
                    <Label htmlFor="dogName" className="text-white text-lg mb-2 block">
                      What's your dog's name? (Optional)
                    </Label>
                    <Input
                      id="dogName"
                      placeholder="e.g., Kepler, Max, Bella"
                      value={data.dogName}
                      onChange={(e) => setData({ ...data, dogName: e.target.value })}
                      className="bg-white/10 border-white/20 text-white text-lg py-6 placeholder:text-white/40"
                    />
                    <p className="text-white/50 text-sm mt-2">Leave blank if you don't have a pet, or add their name to enable tracking!</p>
                  </div>
                </div>
              )}

              {/* Step 3: Calendar */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center"
                    >
                      <Calendar className="text-white" size={40} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Shared Calendar</h3>
                    <p className="text-white/70">Connect a Google Calendar for house events</p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
                    <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                      <Mail size={18} />
                      Recommended: Create rm8dashboard@gmail.com
                    </h4>
                    <p className="text-blue-200/70 text-sm">
                      Set up a shared Gmail account for your house calendar. Everyone can add events!
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="calendarEmail" className="text-white text-lg mb-2 block">
                      Calendar Email (Optional)
                    </Label>
                    <Input
                      id="calendarEmail"
                      type="email"
                      placeholder="rm8dashboard@gmail.com"
                      value={data.calendarEmail}
                      onChange={(e) => setData({ ...data, calendarEmail: e.target.value })}
                      className="bg-white/10 border-white/20 text-white text-lg py-6 placeholder:text-white/40"
                    />
                    <p className="text-white/50 text-sm mt-2">
                      You can add this later! Check GOOGLE_CALENDAR_SETUP.md for instructions.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Complete */}
              {step === 4 && (
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.6 }}
                    className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                  >
                    <Check className="text-white" size={48} />
                  </motion.div>

                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">You're All Set!</h3>
                    <p className="text-white/70">Your {data.houseName} dashboard is ready to go!</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 space-y-3 text-left">
                    <div className="flex items-center gap-3 text-white">
                      <Home className="text-pink-400" size={20} />
                      <span><strong>House:</strong> {data.houseName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <Users className="text-purple-400" size={20} />
                      <span><strong>Roommates:</strong> {data.roommates.join(', ')}</span>
                    </div>
                    {data.dogName && (
                      <div className="flex items-center gap-3 text-white">
                        <Dog className="text-blue-400" size={20} />
                        <span><strong>Pet:</strong> {data.dogName}</span>
                      </div>
                    )}
                    {data.calendarEmail && (
                      <div className="flex items-center gap-3 text-white">
                        <Calendar className="text-green-400" size={20} />
                        <span><strong>Calendar:</strong> {data.calendarEmail}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-white/60 text-sm">
                    You can always change these settings later!
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-white/10 flex justify-between items-center">
          <Button
            onClick={handleBack}
            variant="ghost"
            disabled={step === 0}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back
          </Button>

          <div className="text-white/50 text-sm">
            Step {step + 1} of {steps.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50"
          >
            {step === steps.length - 1 ? (
              <>
                Launch Dashboard
                <Sparkles className="ml-2" size={18} />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2" size={18} />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

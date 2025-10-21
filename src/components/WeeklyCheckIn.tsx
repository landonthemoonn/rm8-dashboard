import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, TrendingUp, Users, Home, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface WeeklyCheckInProps {
  isOpen: boolean;
  onClose: () => void;
}

const checkInQuestions = [
  {
    id: 1,
    category: 'Chores',
    icon: CheckCircle2,
    question: 'Are all chores up to date?',
    color: '#ff2d95',
  },
  {
    id: 2,
    category: 'Expenses',
    icon: TrendingUp,
    question: 'Are all expenses settled?',
    color: '#ff6bb5',
  },
  {
    id: 3,
    category: 'Kepler',
    icon: Home,
    question: 'Is Kepler getting enough walks?',
    color: '#ffa0d0',
  },
  {
    id: 4,
    category: 'Communication',
    icon: MessageSquare,
    question: 'Any house issues to discuss?',
    color: '#ff2d95',
  },
];

export function WeeklyCheckIn({ isOpen, onClose }: WeeklyCheckInProps) {
  const [responses, setResponses] = useState<{ [key: number]: 'yes' | 'no' | null }>({});
  const [notes, setNotes] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleResponse = (questionId: number, response: 'yes' | 'no') => {
    setResponses({ ...responses, [questionId]: response });
    if (currentStep < checkInQuestions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleSubmit = () => {
    // In production, this would save to database
    alert('✅ Weekly check-in submitted! Your responses help keep the house running smoothly.');
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setResponses({});
    setNotes('');
    setCurrentStep(0);
  };

  const progress = (Object.keys(responses).length / checkInQuestions.length) * 100;
  const allAnswered = Object.keys(responses).length === checkInQuestions.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-2xl bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Clock className="text-[var(--neon-pink)]" size={24} />
            Weekly House Check-In
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Let's review how the house is running this week
          </DialogDescription>
        </DialogHeader>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Progress</span>
            <span className="text-white/60 text-sm">{Object.keys(responses).length} / {checkInQuestions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Separator className="bg-white/10 my-4" />

        {/* Questions */}
        <div className="space-y-6">
          {checkInQuestions.map((question, index) => {
            const Icon = question.icon;
            const isAnswered = responses[question.id] !== undefined;
            const isCurrentQuestion = index === currentStep;

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isAnswered || isCurrentQuestion ? 1 : 0.5, 
                  x: 0,
                  scale: isCurrentQuestion ? 1 : 0.98,
                }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl p-5 border transition-all ${
                  isCurrentQuestion ? 'ring-2 ring-[var(--neon-pink)]' : ''
                }`}
                style={{
                  background: isAnswered 
                    ? `${question.color}15` 
                    : 'rgba(255, 255, 255, 0.05)',
                  borderColor: isAnswered ? `${question.color}50` : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: `${question.color}20`,
                      }}
                    >
                      <Icon size={20} style={{ color: question.color }} />
                    </div>
                    <div>
                      <Badge
                        className="mb-2 rounded-full border-0"
                        style={{
                          background: `${question.color}30`,
                          color: question.color,
                        }}
                      >
                        {question.category}
                      </Badge>
                      <h4 className="text-white">{question.question}</h4>
                    </div>
                  </div>
                  {isAnswered && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      {responses[question.id] === 'yes' ? (
                        <CheckCircle2 className="text-green-400" size={24} />
                      ) : (
                        <XCircle className="text-red-400" size={24} />
                      )}
                    </motion.div>
                  )}
                </div>

                {!isAnswered && (
                  <div className="flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => handleResponse(question.id, 'yes')}
                        className="rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                      >
                        <CheckCircle2 size={16} className="mr-2" />
                        Yes
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => handleResponse(question.id, 'no')}
                        className="rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                      >
                        <XCircle size={16} className="mr-2" />
                        No
                      </Button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Notes Section */}
        {allAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <label className="text-white mb-2 block">Additional Notes (Optional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any other thoughts or concerns about the house this week?"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
            />
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 rounded-full bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="flex-1 rounded-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 border-0"
            style={{
              boxShadow: allAnswered ? '0 0 20px rgba(255, 45, 149, 0.5)' : 'none',
            }}
          >
            Submit Check-In
          </Button>
        </div>

        {/* Summary */}
        {allAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">This Week's Score:</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {Object.values(responses).filter(r => r === 'yes').length} / {checkInQuestions.length}
                </span>
                <span className="text-white/60">✅</span>
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}

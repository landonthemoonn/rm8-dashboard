import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, FileText, Calendar, Home, Dog, Users, DollarSign, AlertTriangle, Phone } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

interface WeekCheckIn {
  weekNumber: number;
  wentWell: string;
  needsAdjustment: string;
  comingWeek: string;
  actionItems: { id: number; text: string; completed: boolean }[];
}

export function RoommateAgreement() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['info']);
  const [weeklyCheckIns, setWeeklyCheckIns] = useState<WeekCheckIn[]>([
    { weekNumber: 1, wentWell: '', needsAdjustment: '', comingWeek: '', actionItems: [] },
    { weekNumber: 2, wentWell: '', needsAdjustment: '', comingWeek: '', actionItems: [] },
    { weekNumber: 3, wentWell: '', needsAdjustment: '', comingWeek: '', actionItems: [] },
    { weekNumber: 4, wentWell: '', needsAdjustment: '', comingWeek: '', actionItems: [] },
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    { id: 'info', title: 'Agreement Info', icon: FileText, color: '#ff2d95' },
    { id: 'checkin', title: 'Weekly Check-ins', icon: Calendar, color: '#ff6bb5' },
    { id: 'house', title: 'House Rules & Spaces', icon: Home, color: '#ffa0d0' },
    { id: 'kepler', title: "Kepler's Care", icon: Dog, color: '#ff8cc5' },
    { id: 'chores', title: 'Chores & Responsibilities', icon: Users, color: '#ff5ea8' },
    { id: 'communication', title: 'Communication & Conflict', icon: Users, color: '#ff2d95' },
    { id: 'timeline', title: 'Timeline & Exit Strategy', icon: Calendar, color: '#ff6bb5' },
    { id: 'financial', title: 'Financial Arrangement', icon: DollarSign, color: '#ffa0d0' },
    { id: 'substance', title: 'Substance Use', icon: AlertTriangle, color: '#ff3b30' },
    { id: 'crisis', title: 'Crisis Plans', icon: Phone, color: '#ff8cc5' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Header */}
      <div
        className="rounded-3xl p-8"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
        }}
      >
        <h1 className="text-white text-3xl mb-2">Roommate Agreement</h1>
        <p className="text-white/70">Living together successfully - documented and agreed upon</p>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <SectionCard
            section={section}
            isExpanded={expandedSections.includes(section.id)}
            onToggle={() => toggleSection(section.id)}
            weeklyCheckIns={weeklyCheckIns}
            setWeeklyCheckIns={setWeeklyCheckIns}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

interface SectionCardProps {
  section: { id: string; title: string; icon: any; color: string };
  isExpanded: boolean;
  onToggle: () => void;
  weeklyCheckIns: WeekCheckIn[];
  setWeeklyCheckIns: (checkIns: WeekCheckIn[]) => void;
}

function SectionCard({ section, isExpanded, onToggle, weeklyCheckIns, setWeeklyCheckIns }: SectionCardProps) {
  const Icon = section.icon;

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 8px 32px 0 rgba(255, 45, 149, 0.15)',
      }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          <div
            className="p-3 rounded-xl"
            style={{
              background: `${section.color}30`,
              boxShadow: `0 0 20px ${section.color}40`,
            }}
          >
            <Icon style={{ color: section.color }} size={24} />
          </div>
          <h2 className="text-white text-xl">{section.title}</h2>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="text-white/50" size={24} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">
              <Separator className="mb-6 bg-white/10" />
              <SectionContent sectionId={section.id} weeklyCheckIns={weeklyCheckIns} setWeeklyCheckIns={setWeeklyCheckIns} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SectionContentProps {
  sectionId: string;
  weeklyCheckIns: WeekCheckIn[];
  setWeeklyCheckIns: (checkIns: WeekCheckIn[]) => void;
}

function SectionContent({ sectionId, weeklyCheckIns, setWeeklyCheckIns }: SectionContentProps) {
  if (sectionId === 'info') {
    return (
      <div className="space-y-4 text-white">
        <InfoItem label="Residents" value="Nick, Alex, Landon (& Kepler 🐕)" />
        <InfoItem label="Move-in Date" value="October 9, 2024" />
        <InfoItem label="Agreement Date" value="October 12, 2024" />
        <InfoItem label="Review Schedule" value="Monthly check-ins, first Sunday of each month" />
        <InfoItem label="Last Updated" value={new Date().toLocaleDateString()} />
        <InfoItem label="Next Review" value="November 3, 2024" />
      </div>
    );
  }

  if (sectionId === 'checkin') {
    return (
      <div className="space-y-6">
        <p className="text-white/70">Weekly check-ins to stay aligned and address issues early</p>
        {weeklyCheckIns.map((week) => (
          <WeeklyCheckInCard key={week.weekNumber} week={week} />
        ))}
      </div>
    );
  }

  if (sectionId === 'house') {
    return (
      <div className="space-y-6 text-white">
        <RoomSection title="Nick & Alex's Bedroom" content="Private space - knock before entering" />
        <RoomSection title="Landon's Bedroom" content="Private space - knock before entering" />
        
        <div>
          <h3 className="text-white mb-3">Common Areas</h3>
          <div className="space-y-3 pl-4">
            <InfoItem label="Kitchen" value="Clean as you cook. Label your shelf space." />
            <InfoItem label="Living Room" value="Shared space - communicate about guests and TV use" />
            <InfoItem label="Bathroom" value="Keep it clean after use. Shower caddy for personal items" />
            <InfoItem label="Laundry" value="Don't leave clothes sitting. Shared detergent cost" />
          </div>
        </div>

        <InfoItem label="Quiet Hours" value="10 PM - 8 AM on weekdays" />
        <InfoItem label="Guests Policy" value="Ask in group chat. Overnight guests need advance notice" />
        <InfoItem label="Smoking/Vaping" value="Outside only, away from windows" />
      </div>
    );
  }

  if (sectionId === 'kepler') {
    return (
      <div className="space-y-6 text-white">
        <div>
          <h3 className="text-white mb-3">Daily Routine</h3>
          <div className="space-y-2 pl-4">
            <InfoItem label="Morning Walk" value="7:00 AM - Rotating schedule" />
            <InfoItem label="Feeding" value="8:00 AM & 6:00 PM - Kitchen counter" />
            <InfoItem label="Evening Walk" value="7:00 PM - Rotating schedule" />
            <InfoItem label="Bedtime" value="Landon's room" />
          </div>
        </div>

        <div>
          <h3 className="text-white mb-3">Access Areas</h3>
          <div className="space-y-2">
            <Badge className="bg-green-500/20 text-green-500 border-0">✅ Allowed: Landon's room, living room, kitchen</Badge>
            <Badge className="bg-red-500/20 text-red-500 border-0">❌ Off-limits: Nick & Alex's bedroom</Badge>
          </div>
        </div>

        <div>
          <h3 className="text-white mb-3">While Landon is in Texas (Oct 14-21)</h3>
          <div className="space-y-2 pl-4">
            <InfoItem label="Emergency Vet" value="VCA: (415) 555-0123" />
            <InfoItem label="Medications" value="None currently" />
            <InfoItem label="Quirks" value="Scared of loud noises, loves belly rubs" />
          </div>
        </div>

        <InfoItem label="Supplies Location" value="Food: under sink | Leash: by door | Poop bags: with leash" />
      </div>
    );
  }

  if (sectionId === 'chores') {
    return (
      <div className="space-y-4 text-white">
        <InfoItem label="Weekly Rotation" value="Kitchen, bathroom, trash/recycling" />
        <InfoItem label="Standards" value="Clean as you go. Deep clean on Sundays" />
        <InfoItem label="Landon's Tasks" value="Kepler care, keep room/bathroom clean, shared cleaning rotation" />
      </div>
    );
  }

  if (sectionId === 'communication') {
    return (
      <div className="space-y-6 text-white">
        <InfoItem label="Small Issues" value="Mention in group chat or in person" />
        <InfoItem label="Big Issues" value="Call a house meeting with 24hr notice" />
        <InfoItem label="House Meetings" value="First Sunday of each month" />
        <div>
          <h3 className="text-white mb-3">If We Fight</h3>
          <div className="space-y-2 pl-4">
            <InfoItem label="Cool-off" value="Take space if needed, minimum 1 hour" />
            <InfoItem label="Resolution" value="Talk it through within 24 hours" />
            <InfoItem label="Escalation" value="Neutral third party if needed" />
          </div>
        </div>
      </div>
    );
  }

  if (sectionId === 'timeline') {
    return (
      <div className="space-y-4 text-white">
        <InfoItem label="Target Move-out" value="3-6 months or when employed + financially stable" />
        <InfoItem label="Month 1" value="Get settled, establish routines, active job search" />
        <InfoItem label="Month 2" value="Job secured or 50+ applications sent" />
        <InfoItem label="Month 3" value="First paycheck, start saving for own place" />
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-yellow-500">Early exit triggers: Serious conflict, job elsewhere, mutual agreement needed</p>
        </div>
      </div>
    );
  }

  if (sectionId === 'financial') {
    return (
      <div className="space-y-4 text-white">
        <InfoItem label="Monthly Contribution" value="$0 until employed (unemployment ends soon)" />
        <InfoItem label="When Employed" value="TBD based on income - fair market rate contribution" />
        <InfoItem label="Shared Expenses" value="Splitting: TP, cleaning supplies, household items" />
        <InfoItem label="Utilities" value="Included in rent (no separate charge)" />
        <InfoItem label="Other Contributions" value="Help with cooking, Kepler care, extra cleaning" />
      </div>
    );
  }

  if (sectionId === 'substance') {
    return (
      <div className="space-y-6 text-white">
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <p className="text-red-400 mb-2">Sensitive Topic - Honest Communication Required</p>
          <p className="text-white/70 text-sm">This section is for harm reduction and safety, not judgment</p>
        </div>
        
        <InfoItem label="Boundaries" value="Private space only. Not around others if visibly affected" />
        <InfoItem label="Storage" value="In your room, out of sight" />
        <InfoItem label="Harm Reduction" value="Naloxone kit location: bathroom cabinet. Everyone trained." />
        <InfoItem label="Emergency" value="Call 911 immediately for overdose. No questions asked." />
        <InfoItem label="Support" value="Therapy schedule respected. Landon manages own recovery." />
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
          <p className="text-orange-400">Deal breaker: Using around Kepler, storing unsafely, or refusing help in crisis</p>
        </div>
      </div>
    );
  }

  if (sectionId === 'crisis') {
    return (
      <div className="space-y-6 text-white">
        <div>
          <h3 className="text-white mb-3">Mental Health Crisis</h3>
          <div className="space-y-2 pl-4">
            <InfoItem label="Crisis Line" value="988 - Suicide & Crisis Lifeline" />
            <InfoItem label="Therapist" value="[Landon's therapist contact]" />
            <InfoItem label="What Helps" value="Space to process, check-in without judgment" />
            <InfoItem label="Roommate Role" value="Supportive but NOT primary support. Call professionals." />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <h4 className="text-red-400 mb-2">Overdose Emergency</h4>
          <div className="space-y-1 text-sm">
            <p>• Signs: Unresponsive, shallow breathing, blue lips</p>
            <p>• Naloxone location: Bathroom cabinet</p>
            <p>• Call 911 immediately</p>
            <p>• Stay with person until help arrives</p>
          </div>
        </div>

        <div>
          <h3 className="text-white mb-3">Support Network (NOT Roommates)</h3>
          <div className="space-y-2 pl-4">
            <InfoItem label="Therapist" value="[Name & Emergency Contact]" />
            <InfoItem label="Best Friend" value="[Name & Phone]" />
            <InfoItem label="Crisis Resources" value="988, SFGH Crisis, Express Yourself Group" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white/50 text-center py-8">
      Content for this section coming soon...
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white/60 text-sm">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function RoomSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <h4 className="text-white mb-2">{title}</h4>
      <p className="text-white/70 text-sm">{content}</p>
    </div>
  );
}

function WeeklyCheckInCard({ week }: { week: WeekCheckIn }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="text-white">Week {week.weekNumber}</span>
        <ChevronDown
          className={`text-white/50 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block">What went well:</label>
                <Textarea
                  placeholder="Positive things, what's working"
                  className="bg-white/5 border-white/10 text-white"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">What needs adjustment:</label>
                <Textarea
                  placeholder="Small issues before they become big ones"
                  className="bg-white/5 border-white/10 text-white"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Coming week:</label>
                <Textarea
                  placeholder="Your schedule, their schedule, conflicts to avoid"
                  className="bg-white/5 border-white/10 text-white"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Action items:</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox className="border-white/30" />
                    <input
                      type="text"
                      placeholder="Add action item..."
                      className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

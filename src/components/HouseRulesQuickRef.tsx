import { motion } from 'framer-motion';
import { Home, Dog, Users, DollarSign, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';

const quickRules = [
  {
    id: 'residents',
    icon: Users,
    title: 'Residents',
    color: '#ff2d95',
    items: [
      { label: 'Roommates', value: 'Nick, Alex, Landon' },
      { label: 'Dog', value: 'Kepler 🐕' },
      { label: 'Move-in', value: 'Oct 9, 2024' },
      { label: 'Next Check-in', value: 'Nov 3, 2024 (First Sunday)' },
    ],
  },
  {
    id: 'house',
    icon: Home,
    title: 'House Rules',
    color: '#ff6bb5',
    items: [
      { label: 'Quiet Hours', value: '10 PM - 8 AM weekdays' },
      { label: 'Guests', value: 'Ask in group chat first' },
      { label: 'Overnight Guests', value: 'Advance notice required' },
      { label: 'Smoking', value: 'Outside only, away from windows' },
      { label: 'Kitchen', value: 'Clean as you cook, label shelves' },
      { label: 'Bathroom', value: 'Clean after use, use caddy for items' },
    ],
  },
  {
    id: 'kepler',
    icon: Dog,
    title: "Kepler's Daily Care",
    color: '#ffa0d0',
    items: [
      { label: 'Morning Walk', value: '7:00 AM - Rotating schedule' },
      { label: 'Feeding', value: '8:00 AM & 6:00 PM' },
      { label: 'Evening Walk', value: '7:00 PM - Rotating schedule' },
      { label: 'Bedtime', value: "Landon's room" },
      { label: 'Food Storage', value: 'Under kitchen sink' },
      { label: 'Emergency Vet', value: 'VCA (415) 555-0123' },
    ],
  },
  {
    id: 'spaces',
    icon: CheckCircle,
    title: "Kepler's Spaces",
    color: '#ff8cc5',
    items: [
      { label: '✅ Allowed', value: "Landon's room, living room, kitchen", badge: 'success' },
      { label: '❌ Off-limits', value: "Nick & Alex's bedroom", badge: 'danger' },
    ],
  },
  {
    id: 'chores',
    icon: Users,
    title: 'Chores',
    color: '#ff5ea8',
    items: [
      { label: 'Rotation', value: 'Kitchen, bathroom, trash - weekly' },
      { label: 'Standards', value: 'Clean as you go, deep clean Sundays' },
      { label: "Landon's Tasks", value: 'Kepler care + shared rotation' },
    ],
  },
  {
    id: 'communication',
    icon: MessageCircle,
    title: 'Communication',
    color: '#ff2d95',
    items: [
      { label: 'Small Issues', value: 'Group chat or mention in person' },
      { label: 'Big Issues', value: 'House meeting (24hr notice)' },
      { label: 'Monthly Meeting', value: 'First Sunday of each month' },
      { label: 'Conflict Resolution', value: 'Talk within 24hrs, take space if needed' },
    ],
  },
  {
    id: 'financial',
    icon: DollarSign,
    title: 'Finances',
    color: '#ff6bb5',
    items: [
      { label: 'Current Rent', value: '$0 until employed' },
      { label: 'When Employed', value: 'Fair market rate TBD' },
      { label: 'Shared Expenses', value: 'TP, cleaning supplies, household items' },
      { label: 'Utilities', value: 'Included in rent' },
    ],
  },
  {
    id: 'timeline',
    icon: Calendar,
    title: 'Timeline',
    color: '#ffa0d0',
    items: [
      { label: 'Target Move-out', value: '3-6 months or when stable' },
      { label: 'Month 1 Goal', value: 'Settle in, active job search' },
      { label: 'Month 2 Goal', value: 'Job secured or 50+ applications' },
      { label: 'Month 3 Goal', value: 'First paycheck, start saving' },
    ],
  },
];

export function HouseRulesQuickRef() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-sm">📋 House Rules Quick Reference</h3>
        <span className="text-white/50 text-xs">See Agreement tab for full details</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickRules.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="rounded-2xl p-5 group cursor-pointer"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)',
                boxShadow: `0 4px 16px ${section.color}20`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="p-2.5 rounded-xl transition-transform group-hover:scale-110"
                  style={{
                    background: `${section.color}30`,
                    boxShadow: `0 0 15px ${section.color}40`,
                  }}
                >
                  <Icon style={{ color: section.color }} size={20} />
                </div>
                <h3 className="text-white text-sm">{section.title}</h3>
              </div>

              <div className="space-y-2.5">
                {section.items.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="text-white/60 mb-0.5">{item.label}</div>
                    {item.badge ? (
                      <Badge
                        className={`text-xs px-2 py-0.5 border-0 ${
                          item.badge === 'success'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {item.value}
                      </Badge>
                    ) : (
                      <div className="text-white">{item.value}</div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

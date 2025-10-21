import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Clock, Footprints, Award, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import type { Walk } from '../DogWalkingApp';

interface WalkStatsProps {
  walks: Walk[];
}

const roommates = [
  { id: 'alex', name: 'Alex', color: '#ff2d95', avatar: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?w=150&h=150&fit=crop' },
  { id: 'jordan', name: 'Jordan', color: '#ff6bb5', avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=150&h=150&fit=crop' },
  { id: 'sam', name: 'Sam', color: '#ffa0d0', avatar: 'https://images.unsplash.com/photo-1676989880361-091e12efc056?w=150&h=150&fit=crop' },
];

export function WalkStats({ walks }: WalkStatsProps) {
  // Calculate stats
  const statsByWalker = roommates.map((roommate) => {
    const walkerWalks = walks.filter((w) => w.walkerId === roommate.id);
    const totalWalks = walkerWalks.length;
    const totalMinutes = walkerWalks.reduce((sum, w) => sum + w.duration, 0);
    const totalDistance = walkerWalks.reduce((sum, w) => sum + (w.distance || 0), 0);
    const avgDuration = totalWalks > 0 ? Math.round(totalMinutes / totalWalks) : 0;

    return {
      ...roommate,
      totalWalks,
      totalMinutes,
      totalDistance,
      avgDuration,
    };
  });

  const topWalker = statsByWalker.reduce((prev, current) =>
    prev.totalWalks > current.totalWalks ? prev : current
  );

  const longestWalk = walks.reduce((prev, current) =>
    prev.duration > current.duration ? prev : current
  , walks[0]);

  const totalDistance = walks.reduce((sum, w) => sum + (w.distance || 0), 0);
  const totalWalks = walks.length;
  const totalMinutes = walks.reduce((sum, w) => sum + w.duration, 0);

  // Data for charts
  const walksPerPerson = statsByWalker.map((stat) => ({
    name: stat.name,
    walks: stat.totalWalks,
    color: stat.color,
  }));

  const pieData = statsByWalker.map((stat) => ({
    name: stat.name,
    value: stat.totalWalks,
    color: stat.color,
  }));

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={Footprints}
          label="Total Walks"
          value={totalWalks.toString()}
          color="#ff2d95"
        />
        <StatCard
          icon={Clock}
          label="Total Time"
          value={`${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`}
          color="#ff6bb5"
        />
        <StatCard
          icon={TrendingUp}
          label="Total Distance"
          value={`${totalDistance.toFixed(1)} mi`}
          color="#ffa0d0"
        />
      </div>

      {/* Leaderboard */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl p-6"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="text-[var(--neon-pink)]" size={24} />
          <h2 className="text-white">Leaderboard</h2>
        </div>

        <div className="space-y-3">
          {statsByWalker
            .sort((a, b) => b.totalWalks - a.totalWalks)
            .map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="relative p-4 rounded-2xl overflow-hidden"
                style={{
                  background: `${stat.color}15`,
                  border: `1px solid ${stat.color}30`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                    </div>
                    <Avatar className="w-12 h-12 border-2" style={{ borderColor: stat.color }}>
                      <AvatarImage src={stat.avatar} />
                      <AvatarFallback>{stat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white">{stat.name}</p>
                      <p className="text-white/60 text-sm">
                        {stat.totalWalks} walks • {stat.avgDuration} min avg
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-white text-2xl">{stat.totalWalks}</p>
                    <p className="text-white/60 text-sm">walks</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
          }}
        >
          <h3 className="text-white mb-4">Walks per Person</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={walksPerPerson}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" />
              <Tooltip
                contentStyle={{
                  background: 'rgba(20, 20, 30, 0.9)',
                  border: '1px solid rgba(255, 45, 149, 0.3)',
                  borderRadius: '12px',
                  color: '#ffffff',
                }}
              />
              <Bar dataKey="walks" radius={[8, 8, 0, 0]}>
                {walksPerPerson.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-6"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
          }}
        >
          <h3 className="text-white mb-4">Walk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'rgba(20, 20, 30, 0.9)',
                  border: '1px solid rgba(255, 45, 149, 0.3)',
                  borderRadius: '12px',
                  color: '#ffffff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl p-6"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Award className="text-[var(--neon-pink)]" size={24} />
          <h2 className="text-white">Achievements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AchievementCard
            icon="🏆"
            title="Top Walker"
            description={topWalker.name}
            color={topWalker.color}
          />
          <AchievementCard
            icon="⏱️"
            title="Longest Walk"
            description={`${longestWalk.duration} minutes`}
            color="#ff6bb5"
          />
          <AchievementCard
            icon="🎯"
            title="Most Consistent"
            description={statsByWalker.find(s => s.avgDuration > 0)?.name || 'N/A'}
            color="#ffa0d0"
          />
        </div>
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="rounded-2xl p-6"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
      }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div
          className="p-3 rounded-xl"
          style={{
            background: `${color}30`,
            boxShadow: `0 0 20px ${color}40`,
          }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        <div>
          <p className="text-white/60 text-sm">{label}</p>
          <p className="text-white text-3xl">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface AchievementCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

function AchievementCard({ icon, title, description, color }: AchievementCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="p-4 rounded-2xl text-center"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
      }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-white mb-1">{title}</p>
      <p className="text-white/60 text-sm">{description}</p>
    </motion.div>
  );
}

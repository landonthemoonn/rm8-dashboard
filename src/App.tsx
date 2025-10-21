import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { ProfileCards } from './components/ProfileCards';
import { ChoresTracker } from './components/ChoresTracker';
import { DogWalkSchedule } from './components/DogWalkSchedule';
import { DogWalkingApp } from './components/DogWalkingApp';
import { ExpensesWidget } from './components/ExpensesWidget';
import { NotesWidget } from './components/NotesWidget';
import { FloatingActionButtons } from './components/FloatingActionButtons';
import { NotificationBanners } from './components/NotificationBanners';
import { PhotoGallery } from './components/PhotoGallery';
import { SharedCalendar } from './components/SharedCalendar';
import { RoommateAgreement } from './components/RoommateAgreement';
import { HouseRulesQuickRef } from './components/HouseRulesQuickRef';
import { RoommateSchedules } from './components/RoommateSchedules';
import { CentralAIAssistant } from './components/CentralAIAssistant';
import { WeeklyCheckIn } from './components/WeeklyCheckIn';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [choreDialogOpen, setChoreDialogOpen] = useState(false);
  const [walkDialogOpen, setWalkDialogOpen] = useState(false);
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [calendarSheetOpen, setCalendarSheetOpen] = useState(false);
  const [weeklyCheckInOpen, setWeeklyCheckInOpen] = useState(false);
  const [aiAssistantVisible, setAiAssistantVisible] = useState(true);
  const [schedulesSheetOpen, setSchedulesSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, #0a0a0f 0%, #1a0a1f 50%, #0f0a1a 100%)'
              : 'linear-gradient(135deg, #f5f5f7 0%, #fce7f3 50%, #f5f5f7 100%)',
          }}
        />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 45, 149, 0.4), transparent)',
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 181, 0.3), transparent)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 right-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 160, 208, 0.25), transparent)',
          }}
        />
      </div>

      {/* Navigation */}
      <Navigation 
        darkMode={darkMode} 
        onToggleDarkMode={toggleDarkMode}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCalendarClick={() => setCalendarSheetOpen(true)}
        onWeeklyCheckIn={() => setWeeklyCheckInOpen(true)}
        onAIAssistant={() => setAiAssistantVisible(!aiAssistantVisible)}
        onSchedulesClick={() => setSchedulesSheetOpen(true)}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-32">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Home Tab */}
          {activeTab === 'home' && (
            <>
              {/* Notification Banners */}
              <NotificationBanners />

              {/* Central AI Assistant */}
              {aiAssistantVisible && (
                <div className="mb-8">
                  <CentralAIAssistant />
                </div>
              )}

              {/* Profile Cards */}
              <div className="mb-8">
                <ProfileCards onStartWalk={() => setActiveTab('dogwalks')} />
              </div>

              {/* House Rules Quick Reference */}
              <HouseRulesQuickRef />

              {/* Roommate Schedules */}
              <RoommateSchedules />

              {/* Dashboard Widgets Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Chores Tracker */}
                <div className="min-h-[500px]">
                  <ChoresTracker
                    isDialogOpen={choreDialogOpen}
                    onDialogClose={() => setChoreDialogOpen(false)}
                  />
                </div>

                {/* Dog Walk Schedule */}
                <div className="min-h-[500px]">
                  <DogWalkSchedule
                    isDialogOpen={walkDialogOpen}
                    onDialogClose={() => setWalkDialogOpen(false)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Expenses Widget */}
                <div className="min-h-[500px]">
                  <ExpensesWidget
                    isDialogOpen={expenseDialogOpen}
                    onDialogClose={() => setExpenseDialogOpen(false)}
                  />
                </div>

                {/* Notes Widget */}
                <div className="min-h-[500px]">
                  <NotesWidget />
                </div>
              </div>

              {/* Photo Gallery - Full Width */}
              <div className="mb-6">
                <PhotoGallery />
              </div>
            </>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ChoresTracker
                  isDialogOpen={choreDialogOpen}
                  onDialogClose={() => setChoreDialogOpen(false)}
                />
              </motion.div>
            </div>
          )}

          {/* Finances Tab */}
          {activeTab === 'finances' && (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ExpensesWidget
                  isDialogOpen={expenseDialogOpen}
                  onDialogClose={() => setExpenseDialogOpen(false)}
                />
              </motion.div>
            </div>
          )}

          {/* Dog Walks Tab */}
          {activeTab === 'dogwalks' && (
            <div className="max-w-6xl mx-auto">
              <DogWalkingApp />
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-6xl mx-auto">
              <RoommateAgreement />
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        onAddWalk={() => setWalkDialogOpen(true)}
        onAddExpense={() => setExpenseDialogOpen(true)}
        onAddChore={() => setChoreDialogOpen(true)}
      />

      {/* Quick Calendar Sheet */}
      <Sheet open={calendarSheetOpen} onOpenChange={setCalendarSheetOpen}>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-2xl overflow-y-auto"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="text-white">Quick Calendar</SheetTitle>
            <SheetDescription className="text-white/70">
              View and manage shared house events
            </SheetDescription>
          </SheetHeader>
          <SharedCalendar />
        </SheetContent>
      </Sheet>

      {/* Weekly Check-In Dialog */}
      <WeeklyCheckIn isOpen={weeklyCheckInOpen} onClose={() => setWeeklyCheckInOpen(false)} />

      {/* Schedules Sheet */}
      <Sheet open={schedulesSheetOpen} onOpenChange={setSchedulesSheetOpen}>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-3xl overflow-y-auto"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="text-white">Roommate Schedules</SheetTitle>
            <SheetDescription className="text-white/70">
              View everyone's weekly commitments and availability
            </SheetDescription>
          </SheetHeader>
          <RoommateSchedules />
        </SheetContent>
      </Sheet>
    </div>
  );
}

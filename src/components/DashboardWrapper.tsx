import { useState, useEffect } from 'react';
import { OnboardingFlow } from './OnboardingFlow';
import { UserSelector } from './UserSelector';

interface HouseholdConfig {
  houseName: string;
  roommates: string[];
  dogName?: string;
  calendarEmail?: string;
  theme: string;
  onboardingCompleted: boolean;
}

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [config, setConfig] = useState<HouseholdConfig | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Load configuration from localStorage
    const savedConfig = localStorage.getItem('household_config');

    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        setShowOnboarding(!parsedConfig.onboardingCompleted);
      } catch (e) {
        console.error('Error loading config:', e);
        setShowOnboarding(true);
      }
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = (data: any) => {
    const newConfig: HouseholdConfig = {
      ...data,
      onboardingCompleted: true
    };

    // Save to localStorage
    localStorage.setItem('household_config', JSON.stringify(newConfig));

    // Save roommates to user context
    localStorage.setItem('all_users', JSON.stringify(
      data.roommates.map((name: string, index: number) => ({
        name,
        color: ['#FF2D95', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'][index % 5]
      }))
    ));

    // Save dog name if provided
    if (data.dogName) {
      localStorage.setItem('dog_name', data.dogName);
    }

    // Save calendar email if provided
    if (data.calendarEmail) {
      localStorage.setItem('calendar_email', data.calendarEmail);
    }

    setConfig(newConfig);
    setShowOnboarding(false);
  };

  // Show loading state while checking config
  if (config === null && !showOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if not completed
  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // Show main dashboard with user selector
  return (
    <>
      <UserSelector />
      {children}
    </>
  );
}

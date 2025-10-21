import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  name: string;
  avatar?: string;
  color?: string;
}

// Default roommates - will be populated during onboarding
export const DEFAULT_USERS: User[] = [];

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  allUsers: User[];
  addUser: (user: User) => void;
  removeUser: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(DEFAULT_USERS);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');
    const savedUsers = localStorage.getItem('all_users');

    if (savedUser) {
      try {
        setCurrentUserState(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error loading current user:', e);
      }
    }

    if (savedUsers) {
      try {
        setAllUsers(JSON.parse(savedUsers));
      } catch (e) {
        console.error('Error loading users:', e);
      }
    }
  }, []);

  // Save to localStorage when changed
  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  };

  const addUser = (user: User) => {
    const newUsers = [...allUsers, user];
    setAllUsers(newUsers);
    localStorage.setItem('all_users', JSON.stringify(newUsers));
  };

  const removeUser = (name: string) => {
    const newUsers = allUsers.filter(u => u.name !== name);
    setAllUsers(newUsers);
    localStorage.setItem('all_users', JSON.stringify(newUsers));

    if (currentUser?.name === name) {
      setCurrentUser(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        addUser,
        removeUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

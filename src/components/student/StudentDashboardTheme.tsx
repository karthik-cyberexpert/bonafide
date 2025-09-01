"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export type StudentTheme = 'default' | 'ocean-breeze' | 'sunset-glow' | 'forest-retreat'; // Exported for use in other components

interface StudentDashboardThemeContextType {
  theme: StudentTheme;
  setTheme: (theme: StudentTheme) => void;
}

const StudentDashboardThemeContext = createContext<StudentDashboardThemeContextType | undefined>(undefined);

export const StudentDashboardThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<StudentTheme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('student-dashboard-theme') as StudentTheme) || 'default';
    }
    return 'default';
  });
  // No longer applying themeClass here. It will be applied in StudentLayout.

  useEffect(() => {
    localStorage.setItem('student-dashboard-theme', theme);
  }, [theme]);

  return (
    <StudentDashboardThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </StudentDashboardThemeContext.Provider>
  );
};

export const useStudentDashboardTheme = () => {
  const context = useContext(StudentDashboardThemeContext);
  if (context === undefined) {
    throw new Error('useStudentDashboardTheme must be used within a StudentDashboardThemeProvider');
  }
  return context;
};
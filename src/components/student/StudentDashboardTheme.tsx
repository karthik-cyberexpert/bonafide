"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type StudentTheme = 'default' | 'ocean-breeze' | 'sunset-glow' | 'forest-retreat';

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
  const { theme: systemTheme } = useTheme(); // Get system theme (light/dark)

  useEffect(() => {
    localStorage.setItem('student-dashboard-theme', theme);
  }, [theme]);

  const themeClass = cn(
    'student-dashboard-theme',
    {
      'theme-ocean-breeze': theme === 'ocean-breeze',
      'theme-sunset-glow': theme === 'sunset-glow',
      'theme-forest-retreat': theme === 'forest-retreat',
    }
  );

  return (
    <StudentDashboardThemeContext.Provider value={{ theme, setTheme }}>
      <div className={themeClass}>
        {children}
      </div>
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
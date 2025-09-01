"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useStudentDashboardTheme } from './StudentDashboardTheme';
import { cn } from '@/lib/utils'; // Import cn for conditional class names

const StudentThemeSelector = () => {
  const { theme, setTheme } = useStudentDashboardTheme();

  return (
    <div className={cn(
      "flex items-center space-x-2",
      "transition-transform duration-200 ease-in-out hover:scale-[1.02]" // Added hover effect
    )}>
      <Label htmlFor="student-theme-selector" className="text-sm font-medium">Dashboard Theme:</Label>
      <Select value={theme} onValueChange={(value) => setTheme(value as any)}>
        <SelectTrigger id="student-theme-selector" className="w-[180px]">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="ocean-breeze">Ocean Breeze</SelectItem>
          <SelectItem value="sunset-glow">Sunset Glow</SelectItem>
          <SelectItem value="forest-retreat">Forest Retreat</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StudentThemeSelector;
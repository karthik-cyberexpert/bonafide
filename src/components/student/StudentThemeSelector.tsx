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

const StudentThemeSelector = () => {
  const { theme, setTheme } = useStudentDashboardTheme();

  return (
    <div className="flex items-center space-x-2">
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
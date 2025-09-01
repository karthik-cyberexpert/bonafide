"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useStudentDashboardTheme } from "../student/StudentDashboardTheme" // Import student theme hook

interface ThemeToggleProps {
  onHeaderBg?: boolean;
}

export function ThemeToggle({ onHeaderBg }: ThemeToggleProps) {
  const { setTheme } = useTheme()
  const { theme: studentTheme } = useStudentDashboardTheme(); // Get student theme
  const { theme: systemTheme } = useTheme(); // Get system theme

  // Determine dynamic text color for the button
  const getButtonTextColorClass = () => {
    if (systemTheme === 'dark') {
      switch (studentTheme) {
        case 'ocean-breeze': return 'text-[hsl(var(--dark-theme-ocean-breeze-header-text-color))]';
        case 'sunset-glow': return 'text-[hsl(var(--dark-theme-sunset-glow-header-text-color))]';
        case 'forest-retreat': return 'text-[hsl(var(--dark-theme-forest-retreat-header-text-color))]';
        default: return 'text-white'; // Default dark mode header buttons
      }
    } else {
      switch (studentTheme) {
        case 'ocean-breeze': return 'text-[hsl(var(--theme-ocean-breeze-header-text-color))]';
        case 'sunset-glow': return 'text-[hsl(var(--theme-sunset-glow-header-text-color))]';
        case 'forest-retreat': return 'text-[hsl(var(--theme-forest-retreat-header-text-color))]';
        default: return 'text-foreground'; // Default light mode header buttons
      }
    }
  };

  const buttonTextColorClass = getButtonTextColorClass();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            onHeaderBg && "bg-transparent border-current hover:bg-white/20",
            buttonTextColorClass // Apply dynamic text color
          )}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "admin-sidebar": {
          DEFAULT: "hsl(var(--admin-sidebar-background))",
          foreground: "hsl(var(--admin-sidebar-foreground))",
          "muted-foreground": "hsl(var(--admin-sidebar-muted-foreground))",
          active: "hsl(var(--admin-sidebar-active-background))",
          "active-foreground": "hsl(var(--admin-sidebar-active-foreground))",
          border: "hsl(var(--admin-sidebar-border))",
        },
        "admin-layout-gradient": { // New gradient colors
          start: "hsl(var(--admin-layout-gradient-start))",
          end: "hsl(var(--admin-layout-gradient-end))",
        },
        header: { // New header color definition
          DEFAULT: "hsl(var(--header-background))",
        },
        "student-sidebar": {
          start: "hsl(var(--student-sidebar-background-start))",
          end: "hsl(var(--student-sidebar-background-end))",
          foreground: "hsl(var(--student-sidebar-foreground))",
          "muted-foreground": "hsl(var(--student-sidebar-muted-foreground))",
          active: "hsl(var(--student-sidebar-active-background))",
          "active-foreground": "hsl(var(--student-sidebar-active-foreground))",
          border: "hsl(var(--student-sidebar-border))",
        },
        "student-header": {
          DEFAULT: "hsl(var(--student-header-background))",
        },
        "principal-sidebar": {
          DEFAULT: "hsl(var(--principal-sidebar-background))",
          foreground: "hsl(var(--principal-sidebar-foreground))",
          "muted-foreground": "hsl(var(--principal-sidebar-muted-foreground))",
          active: "hsl(var(--principal-sidebar-active-background))",
          "active-foreground": "hsl(var(--principal-sidebar-active-foreground))",
          border: "hsl(var(--principal-sidebar-border))",
        },
        "principal-header": {
          DEFAULT: "hsl(var(--principal-header-background))",
        },
        "principal-main-bg": {
          DEFAULT: "hsl(var(--principal-main-bg-background))",
        },
        "principal-layout-gradient": { // Principal layout gradient colors
          start: "hsl(var(--principal-layout-gradient-start))",
          end: "hsl(var(--principal-layout-gradient-end))",
        },
        "hod-sidebar": { // HOD sidebar colors
          DEFAULT: "hsl(var(--hod-sidebar-background))",
          foreground: "hsl(var(--hod-sidebar-foreground))",
          "muted-foreground": "hsl(var(--hod-sidebar-muted-foreground))",
          active: "hsl(var(--hod-sidebar-active-background))",
          "active-foreground": "hsl(var(--hod-sidebar-active-foreground))",
          border: "hsl(var(--hod-sidebar-border))",
        },
        "hod-layout-gradient": { // HOD layout gradient colors
          start: "hsl(var(--hod-layout-gradient-start))",
          end: "hsl(var(--hod-layout-gradient-end))",
        },
        "hod-header": { // HOD header color
          DEFAULT: "hsl(var(--hod-header-background))",
        },
        "tutor-sidebar": { // Tutor sidebar colors
          DEFAULT: "hsl(var(--tutor-sidebar-background))",
          foreground: "hsl(var(--tutor-sidebar-foreground))",
          "muted-foreground": "hsl(var(--tutor-sidebar-muted-foreground))",
          active: "hsl(var(--tutor-sidebar-active-background))",
          "active-foreground": "hsl(var(--tutor-sidebar-active-foreground))",
          border: "hsl(var(--tutor-sidebar-border))",
        },
        "tutor-layout-gradient": { // Tutor layout gradient colors
          start: "hsl(var(--tutor-layout-gradient-start))",
          end: "hsl(var(--tutor-layout-gradient-end))",
        },
        "tutor-header": { // Tutor header color
          DEFAULT: "hsl(var(--tutor-header-background))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
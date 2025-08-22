import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yrbfdzrgcwlqatjgvnok.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYmZdenJnY3dscWF0amd2bm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MzA5ODEsImV4cCI6MjA3MTQwNjk4MX0.h-AGF4ug8Ci673Cbn6M0uWPH5_uIAqMLalUQK1eUCs8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
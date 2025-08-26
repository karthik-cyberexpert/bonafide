"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { Profile } from '@/lib/types'; // Assuming Profile type is defined here

interface SessionContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Supabase getSession error:', error); // Added logging
        showError(error.message);
        setLoading(false);
        return;
      }
      setSession(session);
      setUser(session?.user || null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          navigate('/login', { replace: true }); // Redirect to login on sign out
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Supabase fetchProfile error:', error); // Added logging
      showError('Failed to fetch profile: ' + error.message);
      setProfile(null);
      navigate('/login', { replace: true }); // Redirect to login if profile fetch fails
    } else if (data) {
      setProfile(data as Profile);
      // Redirect based on role
      switch (data.role) {
        case 'student':
          navigate('/student/dashboard', { replace: true });
          break;
        case 'tutor':
          navigate('/tutor/dashboard', { replace: true });
          break;
        case 'hod':
          navigate('/hod/dashboard', { replace: true });
          break;
        case 'admin':
          navigate('/admin/dashboard', { replace: true });
          break;
        case 'principal':
          navigate('/principal/dashboard', { replace: true });
          break;
        default:
          navigate('/', { replace: true }); // Default to home if role is unknown
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError('Logout failed: ' + error.message);
    } else {
      showSuccess('Logged out successfully!');
      setSession(null);
      setUser(null);
      setProfile(null);
      navigate('/login', { replace: true });
    }
  };

  return (
    <SessionContext.Provider value={{ session, user, profile, loading, signOut }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { Profile } from '@/lib/types';

interface SessionContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean; // This will now only reflect the initial session check
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading for session check
  const navigate = useNavigate();
  const profileFetchPromiseRef = useRef<Promise<void> | null>(null); // To prevent multiple profile fetches

  // Function to fetch profile and handle redirection
  const fetchUserProfileAndRedirect = useCallback(async (userId: string) => {
    // Prevent multiple simultaneous fetches for the same user
    if (profileFetchPromiseRef.current) {
      await profileFetchPromiseRef.current;
      return;
    }

    profileFetchPromiseRef.current = (async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Supabase fetchProfile error:', error);
        showError('Failed to fetch profile: ' + error.message);
        setProfile(null);
        navigate('/login', { replace: true });
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
            navigate('/', { replace: true });
        }
      }
      profileFetchPromiseRef.current = null; // Clear the promise ref after completion
    })();

    await profileFetchPromiseRef.current; // Wait for the fetch to complete
  }, [navigate]);

  // Effect for initial session load and auth state changes
  useEffect(() => {
    const handleSession = async (currentSession: Session | null) => {
      setSession(currentSession);
      setUser(currentSession?.user || null);
      setLoading(false); // Initial session check is complete

      if (currentSession?.user) {
        // Only fetch profile if it's a new user or the profile hasn't been loaded yet
        if (!profile || profile.id !== currentSession.user.id) {
          fetchUserProfileAndRedirect(currentSession.user.id);
        } else {
          // If profile is already loaded and matches, ensure we are on the correct page
          // This handles cases where a user might manually navigate to '/' or '/login'
          // while already authenticated and having a profile.
          switch (profile.role) {
            case 'student':
              if (window.location.pathname === '/' || window.location.pathname === '/login') navigate('/student/dashboard', { replace: true });
              break;
            case 'tutor':
              if (window.location.pathname === '/' || window.location.pathname === '/login') navigate('/tutor/dashboard', { replace: true });
              break;
            case 'hod':
              if (window.location.pathname === '/' || window.location.pathname === '/login') navigate('/hod/dashboard', { replace: true });
              break;
            case 'admin':
              if (window.location.pathname === '/' || window.location.pathname === '/login') navigate('/admin/dashboard', { replace: true });
              break;
            case 'principal':
              if (window.location.pathname === '/' || window.location.pathname === '/login') navigate('/principal/dashboard', { replace: true });
              break;
            default:
              if (window.location.pathname === '/' || window.location.pathname === '/login') navigate('/', { replace: true });
          }
        }
      } else {
        setProfile(null);
        // Only navigate to login if not already on login page
        if (window.location.pathname !== '/login') {
          navigate('/login', { replace: true });
        }
      }
    };

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (error) {
        console.error('Supabase getSession error:', error);
        showError(error.message);
        setLoading(false);
        return;
      }
      handleSession(initialSession);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        handleSession(currentSession);
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchUserProfileAndRedirect, navigate, profile]); // Added profile to dependency array

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
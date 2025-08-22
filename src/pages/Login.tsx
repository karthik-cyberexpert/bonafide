"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from '@/components/auth/SessionContextProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { session, loading, profile } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session && profile) {
      // Already logged in and profile fetched, redirect based on role
      switch (profile.role) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'tutor':
          navigate('/tutor/dashboard');
          break;
        case 'hod':
          navigate('/hod/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'principal':
          navigate('/principal/dashboard');
          break;
        default:
          navigate('/');
      }
    } else if (!loading && session && !profile) {
      // Logged in but profile not yet fetched or created (should be handled by handle_new_user trigger)
      // This might indicate a delay or an issue with profile creation.
      // For now, we can redirect to a generic dashboard or wait for profile.
      // In a real app, you might show a loading spinner or an error.
      navigate('/');
    }
  }, [session, loading, profile, navigate]);

  if (loading || (session && profile)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Please wait while we load your session.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome to College Portal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={[]} // Only email/password for now
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary-foreground))',
                  },
                },
              },
            }}
            theme="light" // Use light theme, can be dynamic with ThemeProvider
            redirectTo={window.location.origin + '/'} // Redirect to root after login, SessionContextProvider will handle further role-based redirect
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
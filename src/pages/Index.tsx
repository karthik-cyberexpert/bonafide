import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/components/auth/SessionContextProvider";
import { useEffect } from "react";

const Index = () => {
  const { session, loading, profile } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session && profile) {
      // If session and profile are loaded, SessionContextProvider should have already redirected.
      // This component will be unmounted.
    } else if (!loading && session && !profile) {
      // If session exists but profile is not yet loaded, wait for SessionContextProvider to handle it.
      // This might happen for new users before the profile trigger runs or if there's a delay.
      // For now, we'll just show a loading state.
    }
  }, [session, loading, profile, navigate]);

  if (loading || (session && !profile)) {
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

  if (session && profile) {
    // If already logged in and profile is available, render nothing as a redirect is expected.
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            College Portal
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <p className="text-center text-muted-foreground">
            Please login to access your portal.
          </p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
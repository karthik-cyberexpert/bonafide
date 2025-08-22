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
      // Redirect based on role
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
          // If role is unknown or not handled, stay on index or redirect to a generic page
          break;
      }
    } else if (!loading && !session) {
      // If not logged in, stay on this page or redirect to login
      // For now, stay on this page to show options
    }
  }, [session, loading, profile, navigate]);

  if (loading) {
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
            College Portal
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <p className="text-center text-muted-foreground">
            Please select your dashboard or login
          </p>
          {!session ? (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link to="/student/dashboard">Student Dashboard</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/tutor/dashboard">Tutor Dashboard</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/hod/dashboard">HOD Dashboard</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/principal/dashboard">Principal Dashboard</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
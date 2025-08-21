import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
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
            Please select your dashboard
          </p>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
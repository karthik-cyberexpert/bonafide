import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, CheckCircle, Clock } from "lucide-react";

const projects = [
  { name: "Website Redesign", progress: 75, status: "In Progress" },
  { name: "Mobile App Launch", progress: 40, status: "In Progress" },
  { name: "API Integration", progress: 100, status: "Completed" },
  { name: "Marketing Campaign", progress: 20, status: "On Hold" },
];

const ProjectDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Project Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">+15 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">345h</div>
            <p className="text-xs text-muted-foreground">42h this week</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => (
              <div key={project.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{project.name}</span>
                  <span className="text-sm text-muted-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>You have 2 unfinished tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="task1" />
              <label htmlFor="task1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Design homepage mockups
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="task2" />
              <label htmlFor="task2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Develop login functionality
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="task3" checked />
              <label htmlFor="task3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-through text-muted-foreground">
                Setup project repository
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDashboard;